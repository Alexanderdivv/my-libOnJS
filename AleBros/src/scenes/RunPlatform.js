import Phaser from "phaser";
export default class BunnyJumpScene extends Phaser.Scene {
  constructor() {
    super("run-platform-scene");
  }
  init() {
    this.platforms = undefined;
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
    this.add.image(400, 300, "background").setScale(1).setScrollFactor(1, 0);
    this.platforms = this.physics.add.staticGroup();
    for (let i = 0; i < 5; i++) {
      const x = Phaser.Math.Between(80, 400);
      const y = 150 * i;

      const platformChild = this.platforms.create(x, y, "platform");
      platformChild.setScale(0.5);
      platformChild.refreshBody();
      const body = platformChild.body;
      body.updateFromGameObject();
    }
    this.player = this.physics.add.sprite(240, 320, "dude").setScale(0.5);
    this.physics.add.collider(this.player, this.platforms);
    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(this.scale.width * 1.5);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const touchingDown = this.player.body.touching.down;

    if (touchingDown) {
      this.player.setVelocityY(-300);
      this.player.setTexture("dude");
    }
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    this.platforms.children.iterate((child) => {
      const platformChild = child;
      const scrollY = this.cameras.main.scrollY;
      // @ts-ignore
      if (platformChild.y >= scrollY + 700) {
        // @ts-ignore
        platformChild.y = scrollY - Phaser.Math.Between(75, 90);
        // @ts-ignore
        platformChild.body.updateFromGameObject();
      }
    });
  }
}
