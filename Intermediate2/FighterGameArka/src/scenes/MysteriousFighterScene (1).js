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
    this.playerHealth = 68;
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

    this.playerAttack = false;
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
    this.load.spritesheet("player2", "images/Fire vizard/Flame_jet.png", {
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
    this.load.spritesheet("enemy2", "images/Lightning Mage/Run.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("enemy3", "images/Lightning Mage/Jump.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("enemy4", "images/Lightning Mage/Hurt.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("enemy5", "images/Lightning Mage/Attack_1.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("enemy6", "images/Lightning Mage/Attack_2.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    // this.load.spritesheet("playerhurt", "images/Fire vizard/Hurt.png");

    this.load.image("RightButton", "images/Right.png");
    this.load.image("LeftButton", "images/Left.png");
    this.load.image("Attack1Button", "images/Attack1.png");
    this.load.image("Attack2Button", "images/Attack2.png");
    this.load.image("JumpButton", "images/Jump.png");
    this.load.image("fight_bg", "images/fight-bg.png");
    this.load.image("tile", "images/TILE.jpg");
    // this.load.image("blackbg");
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
    // this.physics.add.overlap(
    //   this.player,
    //   this.enemy,
    //   this.AttackEnemy,
    //   undefined,
    //   this
    // );
    this.healthBar = this.add.text(10, 10, "" + this.playerHealth, {
      fontSize: "16px",
      color: "black",
      backgroundColor: "green",
    });
    this.EnemyHealthBar = this.add.text(300, 10, "" + this.enemyHealth, {
      fontSize: "16px",
      color: "black",
      backgroundColor: "white",
    });

    this.physics.add.collider(this.player, tile);
    this.AnimationCreate();
    this.gameStart();
    this.createButton();
    this.cursor = this.input.keyboard.createCursorKeys();
    this.physics.add.overlap(
      this.player,
      this.enemy,
      this.Attack,
      undefined,
      this
    );
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
    Attack1.on(
      "pointerdown",
      () => {
        this.Attack1 = true;
      },
      this
    );
    Attack1.on(
      "pointerup",
      () => {
        this.Attack1 = false;
      },
      this
    );

    Attack2.on(
      "pointerdown",
      () => {
        this.Attack2 = true;
      },
      this
    );

    Attack2.on(
      "pointerup",
      () => {
        this.Attack2 = false;
      },
      this
    );
  }
  update(time) {
    // player hanya bisa lompat satu kali sebeum menyenuh lantai
    if (this.Jump && this.player.body.onFloor()) {
      this.player.anims.play("player-jump", true);
      this.player.setVelocityY(-160);
    } else if (this.RightButton) {
      this.player.setVelocityX(70);
      this.player.anims.play("player-run", true);
      this.player.setFlipX(false);
    } else if (this.leftButton) {
      this.player.setVelocityX(-70);
      this.player.anims.play("player-run", true);
      this.player.setFlipX(true);
    } else if (this.Attack1) {
      this.player.anims.play("player-attack1", true);
    } else if (this.Attack2) {
      this.player.anims.play("player-attack2", true);
    } else {
      this.player.setVelocityX(0);
      if (this.player.body.onFloor()) {
        this.player.anims.play("player-idle", true);
      }
    }
    if (this.playerHealth < 70) {
      this.healthBar.setBackgroundColor("yellowgreen");
    } else if (this.playerHealth < 45) {
      this.healthBar.setBackgroundColor("yellow");
    } else if (this.playerHealth < 20) {
      this.healthBar.setBackgroundColor("red");
    } else if (this.playerHealth < 1) {
      this.healthBar.setBackgroundColor("black");
    }

    if (this.enemyHealth < 70) {
      this.EnemyHealthBar.setBackgroundColor("yellowgreen");
    } else if (this.enemyHealth < 45) {
      this.EnemyHealthBar.setBackgroundColor("yellow");
    } else if (this.enemyHealth < 20) {
      this.EnemyHealthBar.setBackgroundColor("red");
    } else if (this.enemyHealth < 1) {
      this.EnemyHealthBar.setBackgroundColor("black");
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
      repeat: -1,
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
    this.anims.create({
      key: "player-attack2",
      frames: this.anims.generateFrameNumbers("player2", {
        start: 0,
        end: 13,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "enemy-hurt",
      frames: this.anims.generateFrameNumbers("enemy4", {
        start: 0,
        end: 2,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: "player-hurt",
      frames: this.anims.generateFrameNumbers("playerhurt", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
    });
  }
  gameStart() {
    (this.startGame = true),
      this.player.anims.play("player-idle", true),
      this.enemy.anims.play("enemy-idle", true),
      this.AnimationCreate();
  }
  Attack() {
    // check if the player attack animation is already playing
    if (
      this.player.anims.currentAnim.key == "player-attack1" &&
      this.player.anims.currentFrame.index === 4 &&
      this.enemy.anims.currentAnim.key == "enemy-idle"
    ) {
      this.playerAttack = true;
      this.player.anims.stop();
    }

    if (this.playerAttack == true) {
      this.enemy.anims.play("enemy-hurt", true);
      this.enemyHealth = -3;
      console.log("player attack1");
    } else {
      this.enemy.anims.play("enemy-idle", true);
    }

    this.playerAttack = false;
  }
  AttackEnemy() {
    if (this.enemy.anims.currentAnim.key == "enemy-attack1") {
      this.enemy.anims.play("player-hurt");
      this.playerHealth = -3;
    }

    if (this.player.anims.currentAnim.key == "enemy-attack2") {
      this.enemy.anims.play("player-hurt");
      this.playerHealth = -12;
    }
  }
}
//sy lupa mic saya mati sir
