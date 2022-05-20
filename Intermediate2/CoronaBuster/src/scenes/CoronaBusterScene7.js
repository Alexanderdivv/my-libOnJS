import Phaser from "phaser";
import FallingObject from "../ui/FallingObject.js";
import Laser from "../ui/Laser.js";
import ScoreLabel from "../ui/ScoreLabel.js";
import LifeLabel from "../ui/LifeLabel.js";

export default class CoronaBusterScene extends Phaser.Scene {
  constructor() {
    super(`corona-buster-scene`);
  }
  init() {
    this.clouds = undefined;
    this.nav_left = false;
    this.nav_right = false;
    this.shoot = false;
    this.player = undefined;
    this.speed = 100;
    this.cursor = undefined;

    this.enemies = undefined;
    this.enemySpeed = 60;

    // inisialisasi properti
    this.lasers = undefined;
    this.lastFired = 0;

    this.scoreLabel = undefined;

    this.lifeLabel = undefined;

    this.handsanitizer = undefined;

    this.backsound = undefined;
  }

  preload() {
    this.load.image(`background`, `images/bg_layer1.png`);
    this.load.image(`cloud`, `images/cloud.png`);
    this.load.image("left-btn", "images/left-btn.png");
    this.load.image("right-btn", "images/right-btn.png");
    this.load.image("shoot-btn", "images/shoot-btn.png");
    this.load.spritesheet(`player`, `images/ship.png`, {
      frameWidth: 66,
      frameHeight: 66,
    });
    this.load.audio(`turn`, "sfx/who.mp3");

    this.load.image("enemy", "images/enemy.png");

    this.load.spritesheet(`laser`, `images/laser-bolts.png`, {
      frameWidth: 16,
      frameHeight: 32,
      startFrame: 16, // mengambil frame ke 16 dari spritesheet (laser-bolts.png) untuk menjadi laser
      endFrame: 32, // mengambil frame ke 32, karena frame terakhir adalah 32
    });

    this.load.image(`handsanitizer`, `images/handsanitizer.png`);

    // sfx and backsound
    this.load.audio(`laserSound`, "sfx/sfx_laser.ogg");
    this.load.audio(`destroySound`, "sfx/destroy.mp3");
    this.load.audio(`handsanitizerSound`, `sfx/handsanitizer.mp3`);
    this.load.audio(`backsound`, `sfx/Backsound/SkyFire.ogg`);
    this.load.audio(`gameOverSound`, `sfx/gameover.wav`);
  }

  create() {
    const gameWidth = this.scale.width * 0.5;

    const gameHeight = this.scale.height * 0.5;
    this.add.image(gameWidth, gameHeight, `background`);
    this.clouds = this.physics.add.group({
      key: `cloud`,
      // ulangi tampilkan awan
      repeat: 20,
    });
    Phaser.Actions.RandomRectangle(
      this.clouds.getChildren(),
      this.physics.world.bounds
    );
    this.createButton();
    this.player = this.createPlayer();
    // menambahkan menambahkan kursor
    this.cursor = this.input.keyboard.createCursorKeys();

    // tambahkan enemy
    this.enemies = this.physics.add.group({
      classType: FallingObject,
      // banyaknya enemy dalam satu kali grup
      maxSize: 20,
      runChildUpdate: true,
    });

    this.time.addEvent({
      delay: Phaser.Math.Between(1000, 3000),
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    });

    this.lasers = this.physics.add.group({
      classType: Laser,
      maxSize: 10,
      runChildUpdate: true,
    });

    // membuat enemy bertabrakan dengan laser
    this.physics.add.overlap(
      this.lasers,
      this.enemies,
      this.hitEnemy,
      null,
      this
    );

    this.scoreLabel = this.createScoreLabel(16, 16, 0);
    this.lifeLabel = this.createLifeLabel(16, 43, 3);

    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.decreaseLife,
      null,
      this
    );

    // Menambahkan handsanitizer
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

    // player overlap handsanitizer
    this.physics.add.overlap(
      this.player,
      this.handsanitizer,
      this.increaseLife,
      null,
      this
    );

    this.backsound = this.sound.add(`backsound`, { volume: 0.02 });
    var soundConfig = {
      loop: true,
    };
    this.backsound.play(soundConfig);
  }

  update(time) {
    //   membuat awan bergerak
    this.clouds.children.iterate((child) => {
      // arah gerak awan ke bawah
      child.setVelocityY(50);

      if (child.y > this.scale.height) {
        child.x = Phaser.Math.Between(10, 400);
        child.y = child.displayHeight * -1;
      }
    });
    this.movePlayer(this.player, time);
  }

  createButton() {
    this.input.addPointer(3);
    let shoot = this.add
      .image(320, 550, `shoot-btn`)
      .setInteractive()
      .setDepth(0.5)
      .setAlpha(0.8);
    let nav_left = this.add
      .image(50, 550, `left-btn`)
      .setInteractive()
      .setDepth(0.5)
      .setAlpha(0.8);
    let nav_right = this.add
      .image(nav_left.x + nav_left.displayWidth + 20, 550, `right-btn`)
      .setInteractive()
      .setDepth(0.5)
      .setAlpha(0.8);

    nav_left.on(
      "pointerdown",
      () => {
        this.nav_left = true;
      },
      this
    );
    nav_left.on(
      "pointerup",
      () => {
        this.nav_left = false;
        console.log("pointerup left");
      },
      this
    );
    nav_right.on(
      "pointerdown",
      () => {
        this.nav_right = true;
      },
      this
    );
    nav_right.on(
      "pointerup",
      () => {
        this.nav_right = false;
        console.log("pointerup right");
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
      "pointerup",
      () => {
        this.shoot = false;
        console.log("pointerup shoot");
      },
      this
    );
  }

  createPlayer() {
    const player = this.physics.add.sprite(200, 450, `player`);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: `turn`,
      frames: [{ key: `player`, frame: 0 }],
    });

    this.anims.create({
      key: `left`,
      frames: this.anims.generateFrameNumbers(`player`, { start: 1, end: 2 }),
      frameRate: 10,
    });

    this.anims.create({
      key: `right`,
      frames: this.anims.generateFrameNumbers(`player`, { start: 1, end: 2 }),
      frameRate: 10,
    });

    return player;
  }

  // membuat ship dapat bergerak
  movePlayer(player, time) {
    if (this.nav_left || this.cursor.left.isDown) {
      this.player.setVelocityX(this.speed * -1);
      this.player.anims.play(`left`, true);
      this.player.setFlipX(false);
      this.sound.play("turn");
    } else if (this.nav_right || this.cursor.right.isDown) {
      this.player.setVelocityX(this.speed);
      this.player.anims.play(`right`, true);
      this.player.setFlipX(true);
      this.sound.play("turn");
    } else if (this.cursor.up.isDown) {
      this.player.setVelocityY(this.speed * -1);
      this.player.anims.play(`turn`, true);
    } else if (this.cursor.down.isDown) {
      this.player.setVelocityY(this.speed);
      this.player.anims.play(`turn`, true);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      this.player.anims.play(`turn`);
    }

    if ((this.shoot || this.cursor.space.isDown) && time > this.lastFired) {
      const laser = this.lasers.get(0, 0, `laser`);
      if (laser) {
        laser.fire(this.player.x, this.player.y);
        this.lastFired = time + 500;
        this.sound.play(`laserSound`);
      }
    }
  }

  spawnEnemy() {
    const config = {
      speed: this.enemySpeed,
      rotation: 0.06,
    };

    const enemy = this.enemies.get(0, 0, `enemy`, config);
    const enemyWidth = enemy.displayWidth;
    const positionX = Phaser.Math.Between(
      enemyWidth,
      this.scale.width - enemyWidth
    );

    if (enemy) {
      enemy.spawn(positionX);
    }
  }

  hitEnemy(laser, enemy) {
    laser.erase(); // menghapus laser
    enemy.die(); // menghapus enemy

    this.sound.play(`destroySound`);
    this.scoreLabel.add(10);
    if (this.scoreLabel.getScore() % 100 == 0) {
      this.enemySpeed += 30;
    }
  }

  createScoreLabel(x, y, score) {
    const style = { fonstSize: `32px`, fill: `#000` };
    const label = new ScoreLabel(this, x, y, score, style).setDepth(1);
    // setDepth(1) untuk mengatur posisi label (z index)

    this.add.existing(label);

    return label;
  }

  createLifeLabel(x, y, life) {
    const style = { fonstSize: `32px`, fill: `#000` };
    const label = new LifeLabel(this, x, y, life, style).setDepth(1);

    this.add.existing(label);

    return label;
  }

  decreaseLife(player, enemy) {
    enemy.die();
    this.lifeLabel.substract(1);

    if (this.lifeLabel.getLife() == 2) {
      player.setTint(0xff0000);
    } else if (this.lifeLabel.getLife() == 1) {
      player.setTint(0xff0000).setAlpha(0.2);
    } else if (this.lifeLabel.getLife() == 0) {
      this.scene.start(`game-over-scene`, {
        score: this.scoreLabel.getScore(),
      });
      this.sound.stopAll();
      this.sound.play(`gameOverSound`);
    }
  }

  increaseLife(player, handsanitizer) {
    handsanitizer.die();
    this.lifeLabel.add(1);

    this.sound.play(`handsanitizerSound`);
    if (this.lifeLabel.getLife() >= 3) {
      player.clearTint().setAlpha(2);
    }
    // else {
    //   player.clearTint().setAlpha(2);
    //   player.setTint(0xff0000);
    // }
  }

  spawnHandsanitizer() {
    const config = {
      speed: 60,
      rotation: 0,
    };
    const handsanitizer = this.handsanitizer.get(0, 0, `handsanitizer`, config);
    const handsanitizerWidth = handsanitizer.displayWidth;
    const positionX = Phaser.Math.Between(
      handsanitizerWidth,
      this.scale.width - handsanitizerWidth
    );

    if (handsanitizer) {
      handsanitizer.spawn(positionX);
    }
  }
}
