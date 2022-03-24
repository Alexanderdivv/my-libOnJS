import Phaser from "phaser";

export default class MathFighterScene extends Phaser.Scene {
  constructor() {
    super("math-fighter-scene");
  }

  init() {
    this.gameHalfWidth = this.scale.width * 0.5;
    this.gameHalfHeight = this.scale.height * 0.5;
    this.player = undefined;
    // membuat enemy (1)
    this.enemy = undefined;

    this.slash = undefined;

    this.startGame = false;
    this.questionText = undefined;
    this.resultText = undefined;
    this.button1 = undefined;
    this.button2 = undefined;
    this.button3 = undefined;
    this.button4 = undefined;
    this.button5 = undefined;
    this.button6 = undefined;
    this.button7 = undefined;
    this.button8 = undefined;
    this.button9 = undefined;
    this.button0 = undefined;
    this.buttonDel = undefined;
    this.buttonOk = undefined;
  }

  preload() {
    this.load.image("background", "images/bg_layer1.png");
    this.load.image("fight-bg", "images/fight-bg.png");
    this.load.image("tile", "images/tile.png");
    this.load.image("start-btn", "images/start_button2.png");
    //   load spritesheet
    this.load.spritesheet("player", "images/warrior1.png", {
      frameWidth: 80,
      frameHeight: 80,
    });

    this.load.spritesheet("enemy", "images/warrior2.png", {
      frameHeight: 80,
      frameWidth: 80,
    });

    this.load.spritesheet("numbers", "images/numbers.png", {
      frameWidth: 131,
      frameHeight: 71.25,
    });

    this.load.spritesheet("slash", "images/slash.png", {
      frameWidth: 42,
      frameHeight: 88,
    });
  }

  create() {
    //   create background
    this.add.image(240, 320, "background");
    // create fight-bg
    const fight_bg = this.add.image(240, 150, "fight-bg");
    // create tile
    const tile = this.physics.add.staticImage(
      240,
      fight_bg.height - 40,
      "tile"
    );

    this.player = this.physics.add
      .sprite(this.gameHalfWidth - 150, this.gameHalfHeight - 200, "player")
      .setOffset(-50, -8)
      .setBounce(0.2);

    // collide antara player dengan tile
    this.physics.add.collider(this.player, tile);

    // membuat enemy (2)
    this.enemy = this.physics.add
      .sprite(this.gameHalfWidth + 150, this.gameHalfHeight - 200, "enemy")
      .setOffset(50, -8)
      .setBounce(0.2)
      .setFlipX(true);

    this.physics.add.collider(this.enemy, tile);

    this.slash = this.physics.add
      .sprite(240, 60, "slash")
      .setActive(false)
      .setVisible(false)
      .setGravityY(-500)
      .setOffset(0, -10)
      .setDepth(1)
      .setCollideWorldBounds(true);

    this.createAnimation();

    let start_button = this.add
      .image(this.gameHalfWidth, this.gameHalfHeight + 181, "start-btn")
      .setInteractive()
      .setScale(0.3);

    start_button.on(
      "pointerdown",
      () => {
        this.gameStart();
        start_button.destroy();
      },
      this
    );
  }

  update() {}

  createAnimation() {
    //   Animasi Player
    this.anims.create({
      key: "player-die",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "player-hit",
      frames: this.anims.generateFrameNumbers("player", {
        start: 5,
        end: 9,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "player-attack",
      frames: this.anims.generateFrameNumbers("player", {
        start: 10,
        end: 14,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "player-standby",
      frames: this.anims.generateFrameNumbers("player", {
        start: 15,
        end: 19,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Animasi enemy
    this.anims.create({
      key: "enemy-die",
      frames: this.anims.generateFrameNumbers("enemy", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "enemy-hit",
      frames: this.anims.generateFrameNumbers("enemy", {
        start: 5,
        end: 9,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "enemy-attack",
      frames: this.anims.generateFrameNumbers("enemy", {
        start: 10,
        end: 14,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "enemy-standby",
      frames: this.anims.generateFrameNumbers("enemy", {
        start: 15,
        end: 19,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  gameStart() {
    this.startGame = true;
    this.player.anims.play("player-standby", true);
    this.enemy.anims.play("enemy-standby", true);

    this.resultText = this.add.text(this.gameHalfWidth, 200, "0", {
      fontSize: "32px",
      color: "#000",
      fontFamily: "Arial, sans-serif",
    });
    this.questionText = this.add.text(this.gameHalfWidth, 100, "0", {
      fontSize: "32px",
      color: "#000",
      fontFamily: "ubuntu",
    });

    this.createButtons();
  }

  createButtons() {
    const startPositionY = this.scale.height - 246;
    const widthDifference = 131;
    const heightDifference = 71.25;

    this.button2 = this.add
      .image(this.gameHalfWidth, startPositionY, "numbers", 1)
      .setInteractive()
      .setData("value", 2);
    this.button5 = this.add
      .image(
        this.gameHalfWidth,
        this.button2.y + heightDifference,
        "numbers",
        4
      )
      .setInteractive()
      .setData("value", 5);
    this.button8 = this.add
      .image(
        this.gameHalfWidth,
        this.button5.y + heightDifference,
        "numbers",
        7
      )
      .setInteractive()
      .setData("value", 8);
    this.button0 = this.add
      .image(
        this.gameHalfWidth,
        this.button8.y + heightDifference,
        "numbers",
        10
      )
      .setInteractive()
      .setData("value", 0);

    this.button1 = this.add
      .image(this.button2.x - widthDifference, startPositionY, "numbers", 0)
      .setInteractive()
      .setData("value", 1);
    this.button4 = this.add
      .image(
        this.button5.x - widthDifference,
        this.button1.y + heightDifference,
        "numbers",
        3
      )
      .setInteractive()
      .setData("value", 4);
    this.button7 = this.add
      .image(
        this.button8.x - widthDifference,
        this.button4.y + heightDifference,
        "numbers",
        6
      )
      .setInteractive()
      .setData("value", 7);
    this.buttonDel = this.add
      .image(
        this.button0.x - widthDifference,
        this.button7.y + heightDifference,
        "numbers",
        9
      )
      .setInteractive()
      .setData("value", "del");

    this.button3 = this.add
      .image(this.button2.x + widthDifference, startPositionY, "numbers", 2)
      .setInteractive()
      .setData("value", 3);
    this.button6 = this.add
      .image(
        this.button5.x + widthDifference,
        this.button3.y + heightDifference,
        "numbers",
        5
      )
      .setInteractive()
      .setData("value", 5);
    this.button9 = this.add
      .image(
        this.button8.x + widthDifference,
        this.button6.y + heightDifference,
        "numbers",
        8
      )
      .setInteractive()
      .setData("value", 9);
    this.buttonOk = this.add
      .image(
        this.button0.x + widthDifference,
        this.button9.y + heightDifference,
        "numbers",
        11
      )
      .setInteractive()
      .setData("value", "ok");
  }
}
