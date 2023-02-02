import Phaser from "phaser";

export default class MysteriousFighterScene extends Phaser.Scene {
  constructor() {
    super("MysteriousFighterScene");
  }
  init() {
    this.gameHalfWidth = this.scale.width * 0.5;
    this.gameHalfHeight = this.scale.height * 0.5;
    this.player = undefined;
    this.enemy = undefined;
    this.score = undefined;
    this.startGame = false;
    this.playerHealth = 100;
    this.enemyHealth = 100;
    this.Attack1 = false;
    this.Attack2 = false;
    this.Jump = false;
    this.RightButton = false;
    this.leftButton = false;
    this.Run = false;
    this.cursor = undefined;
    this.doubleJump = 2;
    this.lastJump = 0;
  }
  preload() {
    this.load.spritesheet("mage", "images/Fire vizard/Idle.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("Enemy", "images/Lightning Mage/Idle.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("player1", "images/Fire vizard/Attack_1.png", {
      frameHeight: 128,
      frameWidth: 128,
    });
    this.load.spritesheet("Enemy1", "images/Lightning Mage/Idle.png", {
      frameHeight: 128,
      frameWidth: 128,
    });
    this.load.spritesheet("player2", "images/Fire vizard/Attack_2.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("player3", "images/Fire vizard/Run.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("player4", "images/Fire vizard/Jump.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.image("RightButton", "images/Right.png");
    this.load.image("LeftButton", "images/Left.png");
    this.load.image("Attack1Button", "images/Attack1.png");
    this.load.image("Attack2Button", "images/Attack2.png");
    this.load.image("JumpButton", "images/Jump.png");
    this.load.image("fight_bg", "images/fight-bg.png");
    this.load.image("tile", "images/TILE.jpg");
    this.load.image("blackbg");
  }
  create() {
    const fight_bg = this.add.image(240, 160, "fight_bg");
    const tile = this.physics.add.staticImage(
      240,
      fight_bg.height - 40,
      "tile"
    );
    this.enemy = this.physics.add
      .sprite(this.gameHalfWidth + 150, this.gameHalfHeight - 100, "Enemy")
      .setFlipX(true);
    this.physics.add.collider(this.enemy, tile);
    this.player = this.physics.add.sprite(
      this.gameHalfWidth - 150,
      this.gameHalfHeight - 100,
      "mage"
    );
    this.healthBar = this.add.text(10, 10, "Health", {
      fontSize: "24px",
      color: "black",
      backgroundColor: "white",
    });

    this.physics.add.collider(this.player, tile);
    this.AnimationCreate();
    this.gameStart();
    this.createButton();
    this.cursor = this.input.keyboard.createCursorKeys();
  }
  createButton() {
    let Attack1 = this.add
      .image(350, 400, "Attack1Button")
      .setScale(3)
      .setInteractive();
    let Attack2 = this.add
      .image(350, 475, "Attack2Button")
      .setScale(3)
      .setInteractive();
    let Jump = this.add
      .image(50 + 50, 400, "JumpButton")
      .setScale(3)
      .setInteractive();
    let Right = this.add
      .image(100 + 50, 450, "RightButton")
      .setScale(3)
      .setInteractive();
    let Left = this.add
      .image(0 + 50, 450, "LeftButton")
      .setScale(3)
      .setInteractive();
    Jump.on(
      "pointerdown",
      () => {
        this.Jump = true;
      },
      this
    );
    Jump.on(
      "pointerup",
      () => {
        this.Jump = false;
      },
      this
    );
    Right.on(
      "pointerdown",
      () => {
        this.RightButton = true;
      },
      this
    );
    Right.on(
      "pointerup",
      () => {
        this.RightButton = false;
      },
      this
    );
    Left.on(
      "pointerdown",
      () => {
        this.leftButton = true;
      },
      this
    );
    Left.on(
      "pointerup",
      () => {
        this.leftButton = false;
      },
      this
    );
  }
  update(time) {
    // player hanya bisa lompat satu kali sebeum menyenuh lantai
    if (this.Jump && this.player.body.onFloor()) {
      this.player.anims.play("player-jump", true);
      this.player.setVelocityY(-300);
    } else if (this.RightButton) {
      this.player.setVelocityX(70);
      this.player.anims.play("player-run", true);
      this.player.setFlipX(false);
      console.log("TES");
    } else if (this.leftButton) {
      this.player.setVelocityX(-70);
      this.player.anims.play("player-run", true);
      this.player.setFlipX(true);
    } else {
      this.player.setVelocityX(0);
      if (this.player.body.onFloor()) {
        this.player.anims.play("player-idle", true);
      }
    }
  }
  AnimationCreate() {
    this.anims.create({
      key: "player-idle",
      frames: this.anims.generateFrameNumbers("mage", {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "enemy-idle",
      frames: this.anims.generateFrameNumbers("Enemy", {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "player-attack1",
      frames: this.anims.generateFrameNumbers("player1", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "player-run",
      frames: this.anims.generateFrameNumbers("player3", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "player-jump",
      frames: this.anims.generateFrameNumbers("player4", {
        start: 1,
        end: 8,
      }),
      frameRate: 10,
      repeat: 0,
    });
  }
  gameStart() {
    (this.startGame = true),
      this.player.anims.play("player-idle", true),
      this.enemy.anims.play("enemy-idle", true),
      this.AnimationCreate();
  }
  playerAttack() {}
}
//sy lupa mic saya mati sir
