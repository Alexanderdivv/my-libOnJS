import Phaser from "phaser";
export default class GangsterHunter extends Phaser.Scene {
  constructor() {
    super("gangster-hunter-scene");
  }
  init() {
    this.platforms = undefined;
    this.player = undefined;
    this.cursor = undefined;
    this.enemy = undefined;
  }
  preload() {
    // this.load.image("background", "images/823383.jpg");
    // this.load.image("startButton", "images/start.png");
    this.load.image("scene2", "images/scene2.png");
    this.load.image("ground", "images/platform.png");
    this.load.spritesheet("id1", "images/id1.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet("running1", "images/run1.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet("id4", "images/id4.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet("attack", "images/at1.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
  }
  create() {
    // this.add.image(400, 300, "background").setScale(0.278);
    // this.add.image(390, 350, "startButton").setScale(0.55);
    const middleX = this.cameras.main.width / 2;
    this.add.image(middleX, 250, "scene2").setScale(0.5);
    this.platforms = this.physics.add.staticGroup();
    // this.platforms.create(350, 365, "ground").refreshBody().setVisible(true);
    // scale platform to fit the width of the game
    this.platforms.create(400, 340, "ground").setScale(2).refreshBody();
    this.player = this.physics.add
      .sprite(100, 200, "id1")
      .setScale(1)
      .setOffset(-20, 0);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);
    this.cursor = this.input.keyboard.createCursorKeys();
    //animation to the left
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("running1", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    //animation idle
    this.anims.create({
      key: "turn",
      frames: [{ key: "id1", frame: 0 }],
      frameRate: 20,
    });
    //animation to the right
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("running1", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    this.enemy = this.physics.add.sprite(150, 200, "id4").setScale(1);
    this.enemy.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy, this.platforms);
    this.enemy.setFlipX(true);

    this.anims.create({
      key: "PlayerAttack",
      frames: this.anims.generateFrameNumbers("attack", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1.5);
    this.cameras.main.setBounds(0, 0, 770, 500);

    this.enemy1 = this.physics.add.sprite(600, 200, "id4").setScale(1);
    this.enemy1.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy1, this.platforms);
    this.enemy1.setFlipX(true);

    this.enemy2 = this.physics.add.sprite(259, 200, "id4").setScale(1);
    this.enemy2.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy2, this.platforms);
    this.enemy2.setFlipX(true);

    this.enemy3 = this.physics.add.sprite(361, 200, "id4").setScale(1);
    this.enemy3.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy3, this.platforms);
    this.enemy3.setFlipX(true);

    this.enemy4 = this.physics.add.sprite(521, 200, "id4").setScale(1);
    this.enemy4.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy4, this.platforms);
    this.enemy4.setFlipX(true);
  }
  update() {
    if (this.cursor.down.isDown) {
      this.player.anims.play("PlayerAttack", true);
      this.player.setVelocityX(0);
    } else {
      if (this.cursor.left.isDown) {
        this.player.setVelocityX(-200);
        this.player.anims.play("left", true);
        this.player.setFlipX(true);
      } else if (this.cursor.right.isDown) {
        this.player.setVelocityX(200);
        this.player.anims.play("right", true);
        this.player.setFlipX(false);
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play("turn");
      }
      if (this.cursor.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-120);
        this.player.anims.play("turn");
      }
    }
  }
}
