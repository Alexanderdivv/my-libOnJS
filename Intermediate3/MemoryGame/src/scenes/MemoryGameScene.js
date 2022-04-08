import Phaser from "phaser";
export default class MemoryGameScene extends Phaser.Scene {
  constructor() {
    super("memory-game-scene");
  }

  init() {
    this.halfWidth = this.scale.width / 2;
    this.halfHeight = this.scale.height / 2;
    this.boxGroup = undefined;
    this.player = undefined;
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.image("bg", "images/bg.jpg");
    this.load.spritesheet("tilesheet", "images/sokoban_tilesheet.png", {
      frameWidth: 64,
    });
    this.load.image("chicken", "images/chicken.png");
    this.load.image("duck", "images/duck.png");
    this.load.image("bear", "images/bear.png");
    this.load.image("parrot", "images/parrot.png");
    this.load.image("penguin", "images/penguin.png");
    this.load.image("play", "images/play.png");
  }

  create() {
    //   menambahkan background
    this.add.image(this.halfWidth, this.halfHeight, "bg").setScale(3);
    // static objek
    this.boxGroup = this.physics.add.staticGroup();
    this.createBox();
    this.player = this.createPlayer();
  }

  update() {
    this.movePlayer(this.player);
  }

  createBox() {
    const width = this.scale.width;
    let xPer = 0.25;
    let y = 150;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        this.boxGroup.get(width * xPer, y, "tilesheet", 9);
        xPer += 0.25;
      }

      xPer = 0.25;
      y += 150;
    }
  }
  createPlayer() {
    const player = this.physics.add
      .sprite(this.halfWidth, this.halfHeight + 30, "tilesheet")
      .setSize(40, 16)
      .setOffset(12, 38);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: "standby",
      frames: [
        {
          key: "tilesheet",
          frame: 52,
        },
      ],
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("tilesheet", {
        start: 52,
        end: 54,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("tilesheet", {
        start: 55,
        end: 57,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("tilesheet", {
        start: 81,
        end: 83,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("tilesheet", {
        start: 78,
        end: 80,
      }),
      frameRate: 10,
      repeat: -1,
    });

    return player;
  }

  movePlayer(player) {
    const speed = 200;
    if (this.cursors.left.isDown) {
      this.player.setVelocity(-speed, 0);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocity(speed, 0);
      this.player.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocity(0, -speed);
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocity(0, speed);
      this.player.anims.play("down", true);
    } else {
      this.player.setVelocity(0, 0);
      this.player.anims.play("standby", true);
    }
  }
}
