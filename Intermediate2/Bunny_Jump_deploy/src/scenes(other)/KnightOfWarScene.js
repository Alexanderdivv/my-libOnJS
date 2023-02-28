import Phaser from "phaser";

export default class KnightOfWarScene extends Phaser.Scene {
  constructor() {
    super("knight-of-war-scene");
  }

  init() {
    this.player = undefined;
    this.platforms = undefined;
    this.enemy = undefined;
    this.cursor = undefined;
    this.healthbar = undefined;
    this.playerLife = 1;
    this.enemyLife = 1;
    this.platformss = undefined;
    this.enemyAttack = false;
  }

  preload() {
    this.load.image("background", "images/000.png");
    this.load.spritesheet("knight", "images/knight1Idle.png", {
      frameWidth: 72.5,
      frameHeight: 86,
    });
    this.load.image("ground", "images/platform.png");
    this.load.spritesheet("skeleton", "images/Skeleton Idle.png", {
      frameWidth: 24,
      frameHeight: 32,
    });
    this.load.spritesheet("knightwalk", "images/Knight1Walk.png", {
      frameWidth: 72.5,
      frameHeight: 86,
    });
    this.load.spritesheet("knightattack", "images/knightAttack.png", {
      frameWidth: 86,
      frameHeight: 86,
    });
    this.load.spritesheet("skeletonWalk", "images/Skeleton Walk.png", {
      frameWidth: 22,
      frameHeight: 33,
    });
    this.load.spritesheet("skeletonAttack", "images/Skeleton Attack.png", {
      frameWidth: 43,
      frameHeight: 37,
    });
    this.load.spritesheet("healthbar", "images/healthbar.png", {
      frameWidth: 630,
      frameHeight: 179,
    });
  }

  create() {
    //  create background
    this.add.image(240, 320, "background").setScale(0.65);
    this.player = this.physics.add.sprite(100, 450, "knight");
    this.player.setCollideWorldBounds(true);
    this.enemy = this.physics.add.sprite(500, 450, "skeleton");
    this.enemy.setCollideWorldBounds(true);
    this.enemy.setFlipX(true);
    this.enemy.setScale(2);
    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(450, 600, "ground")
      .setScale(2.5)
      .refreshBody()
      .setVisible(false);
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.enemy, this.platforms);
    this.cursor = this.input.keyboard.createCursorKeys();
    //animation to the left
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("knightwalk", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });
    //animation idle
    this.anims.create({
      key: "turn",
      frames: [{ key: "knight", frame: 0 }],
      frameRate: 20,
    });
    //animation to the right
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("knightwalk", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("knightattack", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });
    // animation skeleton walk
    this.anims.create({
      key: "skeletonwalk",
      frames: this.anims.generateFrameNumbers("skeletonWalk", {
        start: 0,
        end: 12,
      }),
      frameRate: 13,
      repeat: -1,
    });
    // animation skeleton attack
    this.anims.create({
      key: "skeletonattack",
      frames: this.anims.generateFrameNumbers("skeletonAttack", {
        start: 0,
        end: 17,
      }),
      frameRate: 10,
      // dont repeat
      repeat: 0,
    });
    // this.add.image(120, 43, "healthbar").setScale(0.3);
    // add healthbar
    this.playerLabel = this.createLabel();
    this.playerLabel.body.setAllowGravity(false);

    this.enemyLabel = this.createLabel();
    this.enemyLabel.body.setAllowGravity(false);
    this.enemyLabel.x = 735;
    this.enemyLabel.y = 43;
    this.enemyLabel.flipX = true;
  }

  createLabel() {
    const playerLabel = this.physics.add
      .sprite(120, 43, "healthbar")
      .setScale(0.3);

    this.anims.create({
      key: "life",
      frames: [{ key: "healthbar", frame: 5 }],
    });
    this.anims.create({
      key: "life1",
      frames: [{ key: "healthbar", frame: 4 }],
    });
    this.anims.create({
      key: "life2",
      frames: [{ key: "healthbar", frame: 3 }],
    });
    this.anims.create({
      key: "life3",
      frames: [{ key: "healthbar", frame: 2 }],
    });
    this.anims.create({
      key: "life4",
      frames: [{ key: "healthbar", frame: 1 }],
    });
    this.anims.create({
      key: "life5",
      frames: [{ key: "healthbar", frame: 0 }],
    });
    // keep sprite on screen

    playerLabel.anims.play("life", true);
    return playerLabel;
  }

  update() {
    if (this.cursor.space.isDown) {
      this.player.anims.play("attack", true);
    } else {
      if (this.cursor.left.isDown) {
        this.player.setVelocityX(-200);
        this.player.flipX = true;
        this.player.anims.play("left", true);
      } else if (this.cursor.right.isDown) {
        this.player.setVelocityX(200);
        this.player.flipX = false;
        this.player.anims.play("right", true);
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play("turn");
      }
      if (this.cursor.up.isDown) {
        this.player.setVelocity(0, -200);
        this.player.anims.play("turn");
      }
    }

    // if player attack skeletin and and hit skeleton
    if (this.player.anims.currentAnim.key === "attack" && this.enemyAttack) {
      if (this.player.anims.currentFrame.index === 4) {
        this.player.anims.play("attack", false);
        this.enemyLife += 2;
        this.enemyLabel.anims.play("life" + this.enemyLife, true);
      }
    }

    // skeleton walking to the player and attacking if close enough
    if (this.enemy.x > this.player.x + 50) {
      this.enemy.setVelocityX(-100);
      this.enemy.flipX = true;
      this.enemy.anims.play("skeletonwalk", true);
      this.enemyAttack = false;
    } else if (this.enemy.x < this.player.x - 50) {
      this.enemy.setVelocityX(100);
      this.enemy.flipX = false;
      this.enemy.anims.play("skeletonwalk", true);
      this.enemyAttack = false;
    } else if (this.enemy.y > this.player.y + 50) {
      this.enemy.anims.play("skeletonwalk", true);
      this.enemyAttack = false;
    } else {
      this.enemy.setVelocityX(0);
      // play skletonattack anims only once and not repeat
      this.enemyAttack = true;
      this.enemy.anims.play("skeletonattack", true);
    }

    if (this.enemyAttack && this.enemy.anims.currentFrame.index === 17) {
      this.playerLife += 1;
      this.playerLabel.anims.play("life" + this.playerLife, true);
      this.enemy.anims.play("skeletonattack", false);
    }

    // if life is 5, game over
    if (this.playerLife === 5) {
      // create text game over
      this.add.text(260, 290, "Game Over", {
        fontSize: "70px",
        backgroundColor: "#000",
        color: "#fff",
        // size of the text
        padding: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
        },
      });
      // stop everything
      this.physics.pause();
      this.player.setTint(0xff0000);
      this.player.anims.play("turn");
      this.scene.pause();
    } else if (this.enemyLife === 5) {
      // create text win
      this.add.text(260, 290, "You Win", {
        fontSize: "70px",
        backgroundColor: "#000",
        color: "#fff",
        // size of the text
        padding: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
        },
      });
      // stop everything
      this.physics.pause();
      this.player.anims.play("turn");
      this.enemy.setTint(0xff0000);
      this.scene.pause();
    }
  }
}
