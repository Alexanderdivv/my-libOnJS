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
    this.enemyLife = 0;
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

    // // create slash
    // this.slash = this.physics.add
    //   .sprite(0, 0 + 20, "ground")
    //   .setScale(0.2)
    //   .setCollideWorldBounds(true)
    //   .setActive(false)
    //   .setVisible(true);
    // this.slash.body.setAllowGravity(false);

    // // this.physics.add.overlap(
    // //   this.slash,
    // //   this.enemy,
    // //   this.handleHit,
    // //   undefined,
    // //   this
    // // );

    // this.physics.add.overlap(
    //   this.slash,
    //   this.player,
    //   this.handleHit,
    //   null,
    //   this
    // );
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

    // get the right border
    const rightBorder = this.physics.world.bounds.width;
    // get the left border
    // skeleton walking to the player and attacking if close enough
    if (this.enemy.x > this.player.x + 50) {
      this.enemy.setVelocityX(-100);
      this.enemy.flipX = true;
      this.enemy.anims.play("skeletonwalk", true);
    } else if (this.enemy.x < this.player.x - 50) {
      this.enemy.setVelocityX(100);
      this.enemy.flipX = false;
      this.enemy.anims.play("skeletonwalk", true);
    } else if (this.enemy.y > this.player.y + 50) {
      this.enemy.anims.play("skeletonwalk", true);
    } else {
      this.enemy.setVelocityX(0);
      this.enemy.anims.play("skeletonattack", true);
      this.enemyAttack = true;
      // call handleHit function
      this.handleHit();

      // this.time.delayedCall(1500, () => {
      //   this.createSlash(
      //     // border of the frame
      //     rightBorder - 200,
      //     this.enemy.y,
      //     -600
      //     // this.enemy.flipX,
      //     // 0xffffff
      //   );
      // });
    }
    this.enemyAttack = false;
  }

  // createSlash(x, y, velocity) {
  //   this.slash
  //     .setPosition(x, y)
  //     .setActive(true)
  //     .setVisible(true)
  //     .setVelocityX(velocity)
  //     .setScale(0.5);
  //   // .setFlipX(flipX)
  //   // .setTint(color);
  //   // slash only move in x axis
  //   this.slash.body.setAllowGravity(false);
  //   // slash will dissapear when touch the edge
  //   // this.slash.body.onWorldBounds = true;
  //   this.slash.body.world.on("worldbounds", (body) => {
  //     if (body.gameObject === this.slash) {
  //       this.slash.setActive(false).setVisible(false);
  //     }
  //   });
  // }

  // handleHit(slash, character) {
  //   // remove slash
  //   slash.setActive(true).setVisible(true).setPosition(0, 0);
  //   character.setTint(0x00ff00);
  //   console.log("test");

  //   if (character === this.player) {
  //     this.playerLabel.anims.play("life" + this.playerLife, true);

  //     this.playerLife++;
  //     this.time.delayedCall(500, () => {
  //       character.clearTint();
  //     });
  //   }
  // }

  handleHit(player, enemy) {
    // if enemyattack animation is playing, player will lose health
    if (enemy.anims.currentAnim.key === "skeletonattack" && this.enemyAttack) {
      this.playerLabel.anims.play("life" + this.playerLife, true);
      this.playerLife++;
      this.time.delayedCall(500, () => {
        player.clearTint();
      });
    }
  }
}
