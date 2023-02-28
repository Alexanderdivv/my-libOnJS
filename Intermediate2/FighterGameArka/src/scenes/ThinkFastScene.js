import Phaser from "phaser";
export default class ThinkFastScene extends Phaser.Scene {
  constructor() {
    super("think-fast-scene");
  }
  init() {
    this.cat = undefined;
    this.startGame = false;
    this.runButton = undefined;
    this.dog = undefined;
    this.gameHalfWidth = this.scale.width * 0.5;
    this.gameHalfHeight = this.scale.height * 0.5;
    this.question = [];
    this.bone = undefined;
  }

  preload() {
    this.load.image("gameover", "images/gameover.png");
    this.load.image("replay", "images/replay.png");
    this.load.image("start-btn", "images/start_button.png");
    this.load.image("tile", "images/tile.png");
    this.load.image("numbers", "numbers.png");
    this.load.image("homeanimation", "images/homeanimation.webp");
    this.load.image("background", "images/bg_layer1.png");
    this.load.image("cat", "images/Idle (1).png");
    this.load.image("dog", "images/dog.png");
    this.load.image("bone", "images/bone.png");
    this.load.image("fish", "images/fish.png");
  }

  create() {
    this.add.image(240, 320, "background");
    const homeanimation = this.add
      .image(240, 150, "homeanimation")
      .setScale(0.3);
    const tile = this.physics.add.staticImage(240, 320, "tile");
    // homeanimation.heightnya jangan dipake Cliff, karena panjangnya itu 1000px (terlalu jauh buat frame game kita yg cuma 640)
    this.dog = this.physics.add
      .sprite(this.gameHalfWidth - 150, this.gameHalfHeight - 200, "dog")
      .setScale(0.2)
      .setBounce(0.2)
      .setOffset(-20, -10);
    this.physics.add.collider(this.dog, tile);
    this.cat = this.physics.add
      .sprite(this.gameHalfWidth + 150, this.gameHalfHeight - 200, "cat")
      .setBounce(0.2)
      .setOffset(20, -10)
      .setFlipX(true)
      .setScale(0.2);
    this.physics.add.collider(this.cat, tile);
    //   membuat efek terbang pada bone
    this.bone = this.physics.add
      .sprite(240, 60, "bone")
      .setActive(false)
      .setVisible(false)
      .setGravityY(-500)
      .setDepth(1)
      .setCollideWorldBounds(true);
    this.createAnimation();
    let start_button = this.add
      .image(this.gameHalfWidth, this.gameHalfHeight + 181, "start-btn")
      .setInteractive();

    start_button.on(
      "pointerdown",
      () => {
        // @ts-ignore
        this.gameStart();
        start_button.destroy();
      },
      this
    );
  }
  getOperator() {
    const operator = [`+`, `x`, `-`, `:`, `^`, `v`];
    return operator[Phaser.Math.Between(0, 3)];
  }

  generateQuestion() {
    let numberA = Phaser.Math.Between(0, 50);
    let numberB = Phaser.Math.Between(0, 50);
    let operator = this.getOperator();
    if (operator === "+") {
      this.question[0] = `${numberA} + ${numberB}`;
      this.question[1] = numberA + numberB;
    }
    if (operator === "x") {
      this.question[0] = `${numberA} x ${numberB}`;
      this.question[1] = numberA * numberB;
    }
    if (operator === "v") {
      do {
        numberA = Phaser.Math.Between(0, 100);
      } while (!Number.isInteger(Math.sqrt(numberA)));
      this.question[0] = `v${numberA}`;
      this.question[1] = Math.sqrt(numberA);
    }
    if (operator === `-`) {
      if (numberB > numberA) {
        this.question[0] = `${numberB} - ${numberA}`;
        this.question[1] = numberB - numberA;
      } else {
        this.question[0] = `${numberA} - ${numberB}`;
        this.question[1] = numberA - numberB;
      }
    }
    if (operator === `:`) {
      do {
        numberA = Phaser.Math.Between(0, 50);
        numberB = Phaser.Math.Between(0, 50);
      } while (!Number.isInteger(numberA / numberB));
      this.question[0] = `${numberA} : ${numberB}`;
      this.question[1] = numberA / numberB;
    }
    if (operator === `^`) {
      numberB = Phaser.Math.Between(2, 3);
      numberA = Phaser.Math.Between(1, 10);
      this.question[0] = `${numberA}^ ${numberB}`;
      this.question[1] = numberA ** numberB;
    }
  }
  createAnimation() {
    this.anims.create({
      key: "dog-standby",
      frames: this.anims.generateFrameNumbers("dog", {
        start: 15,
        end: 19,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "dog-attack",
      frames: this.anims.generateFrameNumbers("dog", {
        start: 10,
        end: 14,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "dog-hit",
      frames: this.anims.generateFrameNumbers("dog", {
        start: 5,
        end: 9,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "dog-die",
      frames: this.anims.generateFrameNumbers("dog", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "cat-standby",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 15,
        end: 19,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "cat-attack",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 10,
        end: 14,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "cat-hit",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 5,
        end: 9,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "cat-die",
      frames: this.anims.generateFrameNumbers("cat", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
    });
  }
}
