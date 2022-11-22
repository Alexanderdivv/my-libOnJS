import Phaser from "phaser";
export default class CollectingStarScene extends Phaser.Scene {
  constructor() {
    super("collecting-star-scene");
  }
  init() {
    this.platfroms = undefined;
    this.player = undefined;
    this.stars = undefined;
    this.cursor = undefined;
    this.score = 0;
  }
  preload() {
    this.load.image("ground", "images/platform.png");
    this.load.image("star", "images/star.png");
    this.load.image("sky", "images/sky.png");
    this.load.image("bomb", "images/bomb.png");
    this.load.spritesheet("dude", "images/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }
  create() {
    this.add.image(400, 300, "sky");
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
    this.player = this.physics.add.sprite(100, 450, "dude");
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);
    this.stars = this.physics.add.group({
      key: "star",
      repeat: 10,
      setXY: { x: 50, y: 0, stepX: 70 },
    });
    this.physics.add.collider(this.stars, this.platforms);
    this.stars.children.iterate(function (child) {
      //@ts-ignore
      child.setBounceY(0.5);
    });
    this.cursor = this.input.keyboard.createCursorKeys();
    //animation to the left
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    //animetion idle
    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    //animation to the right
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );
  }
  update() {
    if (this.cursor.left.isDown) {
      this.player.setVelocityX(-200);
      this.player.anims.play("left", true);
    } else if (this.cursor.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }
  }
  collectStar(player, star) {
    star.destroy();
    this.score += 10;
  }
}
