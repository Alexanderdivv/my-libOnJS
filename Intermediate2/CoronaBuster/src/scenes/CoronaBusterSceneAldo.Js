// @ts-ignore
import Phaser, { LEFT, Scene } from "phaser";
import FallingObject from "../fail/FailingObject";
import Laser from "../fail/Laser";
export default class CoronaBusterScene extends Phaser.Scene {
  constructor() {
    super("corona-buster-scene");
  }
  init() {
    this.clouds = undefined;
    this.navLeft = false;
    this.navRight = false;
    this.shoot = false;
    this.player = undefined;
    this.speed = 100;
    this.enemies = undefined;
    this.enemySpeed = 50;
    this.laser = undefined;
    this.lastFired = 10;
    this.scoreLabel = undefined;
    this.score = 0;
    this.lifeLabel = undefined;
    this.life = 3;
    this.keyboard = undefined;
    this.handsanitizer = undefined;
    // 1. jangan ada sound, kalau ada dia dianggap property kosong. padahal udah ada dari disediaain phaser
    // this.sound = undefined;
    this.backsound = undefined;
  }
  preload() {
    this.load.image("background", "images/bg_layer1.png");
    this.load.image("cloud", "images/cloud.png");
    this.load.image("left-btn", "images/left-btn.png");
    this.load.image("right-btn", "images/right-btn.png");
    this.load.image("shoot", "images/shoot-btn.png");
    this.load.spritesheet("player", "images/ship.png", {
      frameWidth: 66,
      frameHeight: 66,
    });
    this.load.image("enemy", "images/enemy.png");
    this.load.spritesheet("laser", "images/laser-bolts.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.audio("bgsound", "sfx/bgs.ogg");
    this.load.audio("laser", "sfx/sfx_laser.ogg");
    this.load.audio("destroy", "sfx/destroy.mp3");
    // 2. typo koma
    // this.load.audio("handsanitizersound", "sfx/handsanitizer,mp3");
    this.load.audio("handsanitizersound", "sfx/handsanitizer.mp3");

    this.load.audio("gameover", "sfx/gameover.wav");
    this.load.image("handsanitizer", "images/handsanitizer.png");
  }
  create() {
    const gameWidht = this.scale.width * 0.5;
    const gameHeight = this.scale.height * 0.5;
    this.add.image(gameWidht, gameHeight, "background");
    this.clouds = this.physics.add.group({
      key: "cloud",
      repeat: 10,
    });
    Phaser.Actions.RandomRectangle(
      this.clouds.getChildren(),
      this.physics.world.bounds
    );
    this.createButton();
    this.player = this.createPlayer();
    this.enemies = this.physics.add.group({
      classType: FallingObject,
      maxSize: 10,
      runChildUpdate: true,
    });
    this.time.addEvent({
      delay: Phaser.Math.Between(1000, 5000),
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    });
    this.lasers = this.physics.add.group({
      classType: Laser,
      maxSize: 10,
      runChildUpdate: true,
    });
    this.physics.add.overlap(
      this.lasers,
      this.enemies,
      this.hitEnemy,
      null,
      this
    );
    this.scoreLabel = this.add
      .text(10, 10, "Score", {
        fontSize: "16px",
        color: "black",
        backgroundColor: "white",
      })
      .setDepth(1);
    this.lifeLabel = this.add
      .text(10, 30, "Life", {
        fontSize: "16px",
        color: "black",
        backgroundColor: "white",
      })
      .setDepth(1);
    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.decreaseLife,
      null,
      this
    );
    this.keyboard = this.input.keyboard.addKeys("W,A,S,D");
    this.handsanitizer = this.physics.add.group({
      classType: FallingObject,
      runChildUpdate: true,
    });
    this.time.addEvent({
      delay: 10000,
      callback: this.spawnHandsanitizer,
      callbackScope: this,
      loop: true,
    });
    this.physics.add.overlap(
      this.player,
      this.handsanitizer,
      this.increaseLife,
      null,
      this
    );
    this.backsound = this.sound.add("bgsound");
    var soundConfig = {
      loop: true,
      volume: 0.5,
    };
    this.backsound.play(soundConfig);
  }
  update(time) {
    this.clouds.children.iterate((child) => {
      // @ts-ignore
      child.setVelocityY(20);
      // @ts-ignore
      if (child.y > this.scale.height) {
        //@ts-ignore
        child.x = Phaser.Math.Between(10, 400);
        //@ts-ignore
        child.y = 0;
      }
    });
    this.movePlayer(this.player, time);
    this.scoreLabel.setText("Score : " + this.score);
    this.lifeLabel.setText("Life = " + this.life);
  }
  createButton() {
    this.input.addPointer(3);

    let shoot = this.add
      .image(320, 550, "shoot")
      .setInteractive()
      .setDepth(0.5)
      .setAlpha(0.8);

    let navLeft = this.add
      .image(50, 550, "left-btn")
      .setInteractive()
      .setDepth(0.5)
      .setAlpha(0.8);

    let navRight = this.add
      .image(navLeft.x + navLeft.displayWidth + 20, 550, "right-btn")
      .setInteractive()
      .setDepth(0.5)
      .setAlpha(0.8);

    navLeft.on(
      "pointerdown",
      () => {
        this.navLeft = true;
      },
      this
    );
    navLeft.on(
      "pointerout",
      () => {
        this.navLeft = false;
      },
      this
    );
    navRight.on(
      "pointerdown",
      () => {
        this.navRight = true;
      },
      this
    );
    navRight.on(
      "pointerout",
      () => {
        this.navRight = false;
      },
      this
    );
    shoot.on(
      "pointerdown",
      () => {
        this.shoot = true;
      },
      this
    );
    shoot.on(
      "pointerout",
      () => {
        this.shoot = false;
      },
      this
    );
  }
  // @ts-ignore
  movePlayer(player, time) {
    if (this.navLeft) {
      this.player.setVelocityX(this.speed * -1);
      this.player.anims.play("left", true);
      this.player.setFlipX(false);
    } else if (this.navRight) {
      this.player.setVelocityX(this.speed);
      this.player.anims.play("right", true);
      this.player.setFlipX(true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }
    if (this.shoot && time > this.lastFired) {
      const laser = this.lasers.get(0, 0, "laser");
      if (laser) {
        laser.fire(this.player.x, this.player.y);
        this.lastFired = time + 120;
        this.sound.play("laser");
      }
    }
  }
  createPlayer() {
    const player = this.physics.add.sprite(200, 450, "player");
    player.setCollideWorldBounds(true);
    // @ts-ignore
    this.anims.create({
      key: "turn",
      frames: [
        {
          key: "player",
          frame: 0,
        },
      ],
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", {
        start: 1,
        end: 2,
      }),
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", {
        start: 1,
        end: 2,
      }),
    });
    return player;
  }
  spawnEnemy() {
    const config = {
      speed: 30,
      rotation: 0.1,
    };
    //@ts-ignore
    const enemy = this.enemies.get(0, 0, "enemy", config);
    const positionX = Phaser.Math.Between(50, 350);
    if (enemy) {
      enemy.spawn(positionX);
    }
  }
  hitEnemy(laser, enemy) {
    laser.die();
    enemy.die();
    this.score += 1;
    this.sound.play("destroy");
  }
  decreaseLife(player, enemy) {
    enemy.die();
    this.life--;
    if (this.life == 2) {
      player.setTint(0xff0000);
    } else if (this.life == 1) {
      player.setTint(0xff000).setAlpha(0.2);
    } else if (this.life == 0) {
      this.sound.stopAll();
      this.sound.play("gameover");
      this.scene.start("over-scene", { score: this.score });
    }
  }
  spawnHandsanitizer() {
    const config = {
      speed: 60,
      rotation: 0,
    };
    // @ts-ignore
    const handsanitizer = this.handsanitizer.get(0, 0, "handsanitizer", config);
    const positionX = Phaser.Math.Between(70, 330);
    if (handsanitizer) {
      handsanitizer.spawn(positionX);
    }
  }
  increaseLife(player, handsanitizer) {
    handsanitizer.die();
    this.life++;
    if (this.life >= 3) {
      player.clearTint().setAlpha(2);
    }
    this.sound.play("handsanitizersound");
  }
}
