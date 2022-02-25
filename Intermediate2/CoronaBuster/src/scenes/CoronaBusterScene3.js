import Phaser from "phaser";
import FallingObject from "../ui/FallingObject.js";
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
    this.load.audio(`turn`, "sfx/turn.mp3");

    this.load.image("enemy", "images/enemy.png");
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
    this.movePlayer(this.player);
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
  movePlayer(player) {
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
}
