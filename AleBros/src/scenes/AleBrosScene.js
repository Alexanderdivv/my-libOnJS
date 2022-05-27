import Phaser from "phaser";
export default class AleBrosScene extends Phaser.Scene {
  constructor() {
    super("ale-bros-scene");
  }

  init() {
    this.platform = undefined;
    this.player = undefined;
    this.cursors = undefined;
  }

  preload() {
    this.load.image("background", "images/sky.png");
    this.load.image("platform", "images/platform.png");
    this.load.spritesheet("dude", "images/player_tilesheet.png", {
      frameWidth: 80,
      frameHeight: 110,
    });
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(400, 300, "background").setScale(2);
    this.platform = this.physics.add.staticGroup();
    this.platform.create(600, 550, "platform").setScale(2).refreshBody();
    this.player = this.createAnimation();

    this.physics.add.collider(this.player, this.platform);
  }

  update() {
    // if player walks to the left
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.flipX = true;
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.flipX = false;
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }
  }

  createAnimation() {
    const player = this.physics.add.sprite(600, 450, "dude");
    player.setCollideWorldBounds(true);
    player.setBounce(0.2);
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 9, end: 10 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 0 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 9, end: 10 }),
      frameRate: 10,
      repeat: -1,
    });
    player.anims.play("turn");

    return player;
  }
}
