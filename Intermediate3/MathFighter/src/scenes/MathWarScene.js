import Phaser from "phaser";
export default class MathWarScene extends Phaser.Scene {
  constructor() {
    super("math-war-scene");
  }
  init() {
    this.gameHalfWidth = this.scale.width * 0.5;
    this.gameHalfHeight = this.scale.height * 0.5;
    this.player = undefined;
    this.slash = undefined;
    this.enemy = undefined;
    this.startGame = false;
    this.questionText = undefined;
    this.resultText = undefined;
    this.correctAnswer = undefined;
    this.playerAttack = false;
    this.enemyAttack = false;

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

    this.numberArray = [];

    this.number = 0;

    this.question = [];
  }
  preload() {
    this.load.image("background", "images/bg_layer1.png");
    this.load.image("tile", "images/tile.png");
    this.load.image("fight-bg", "images/fight-bg.png");

    this.load.spritesheet("warrior1", "images/warrior1.png", {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet("warrior2", "images/warrior2.png", {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet("numbers", "images/numbers.png", {
      frameWidth: 131,
      frameHeight: 71.25,
    });
    this.load.spritesheet("slash", "images/slash.png", {
      frameWidth: 42,
      frameHeight: 88,
    });

    this.load.image("start_btn", "images/start_button.png");
  }
  create() {
    this.add.image(240, 320, "background");
    const fight_bg = this.add.image(240, 160, "fight-bg");
    const tile = this.physics.add.staticImage(
      240,
      fight_bg.height - 40,
      "tile"
    );

    this.player = this.physics.add
      .sprite(this.gameHalfWidth - 150, this.gameHalfHeight - 200, "warrior1")
      .setBounce(0.2)
      .setOffset(-20, -10);
    this.physics.add.collider(this.player, tile);
    this.enemy = this.physics.add
      .sprite(
        this.gameHalfWidth + 150,

        this.gameHalfHeight - 200,
        "warrior2"
      )
      .setBounce(0.2)
      .setOffset(20, -10)
      .setFlipX(true);
    this.physics.add.collider(this.enemy, tile);

    this.slash = this.physics.add
      .sprite(240, 60, "slash")
      .setActive(false)
      .setVisible(false)
      .setGravity(-500)
      .setGravityX(-10)
      .setOffset(0, -10)
      .setDepth(1)
      .setCollideWorldBounds(true);

    this.createAnimation();

    let start_button = this.add
      .image(this.gameHalfWidth, this.gameHalfHeight + 181, "start_btn")
      .setInteractive();

    start_button.on(
      "pointerdown",
      () => {
        this.gameStart();
        start_button.destroy();
      },
      this
    );
    // overlap buat dibawah
    this.physics.add.overlap(
      this.slash,
      this.player,
      this.spriteHit,
      null,
      this
    );

    // buat overlap untuk slash dan enemy
  }
  update() {
    // kodenya salah tempat sebelumnya
    if (this.correctAnswer === true && !this.playerAttack) {
      this.player.anims.play("player-attack", true);
      this.time.delayedCall(500, () => {
        this.createSlash(this.player.x + 60, this.player.y, 4, 600);
      });
      this.playerAttack = true;
    }
    if (this.correctAnswer === undefined) {
      // typo
      // this.player.anims.play("player-standby=", true);
      this.player.anims.play("player-standby", true);

      this.enemy.anims.play("enemy-standby", true);
    }
    if (this.correctAnswer === false && !this.enemyAttack) {
      this.enemy.anims.play("enemy-attack", true);
      this.time.delayedCall(500, () => {
        this.createSlash(this.enemy.x - 60, this.enemy.y, 2, -600, true);
      });
      this.enemyAttack = true;
    }
  }
  createAnimation() {
    //ANIMASI PLAYER
    this.anims.create({
      key: "player-standby",
      frames: this.anims.generateFrameNumbers("warrior1", {
        start: 15,
        end: 19,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "player-attack",
      frames: this.anims.generateFrameNumbers("warrior1", {
        start: 10,
        end: 14,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "player-hit",
      frames: this.anims.generateFrameNumbers("warrior1", { start: 5, end: 9 }),
      frameRate: 10,
    });
    this.anims.create({
      key: "player-die",
      frames: this.anims.generateFrameNumbers("warrior1", { start: 0, end: 4 }),
      frameRate: 10,
    });

    ///animasi ENEMY

    this.anims.create({
      key: "enemy-standby",
      frames: this.anims.generateFrameNumbers("warrior2", {
        start: 15,
        end: 19,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "enemy-attack",
      frames: this.anims.generateFrameNumbers("warrior2", {
        start: 10,
        end: 14,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "enemy-hit",
      frames: this.anims.generateFrameNumbers("warrior2", { start: 5, end: 9 }),
      frameRate: 10,
    });
    this.anims.create({
      key: "enemy-die",
      frames: this.anims.generateFrameNumbers("warrior2", { start: 0, end: 4 }),
      frameRate: 10,
    });
  }
  gameStart() {
    this.startGame = true;
    this.player.anims.play("player-standby", true);
    this.enemy.anims.play("enemy-standby", true);
    this.resultText = this.add.text(this.gameHalfWidth, 200, "0", {
      fontSize: "32px",
      color: "#000",
    });

    this.questionText = this.add.text(this.gameHalfWidth, 100, "0", {
      fontSize: "32px",
      color: "#000",
    });
    this.createButtons();

    this.input.on("gameobjectdown", this.addNumber, this);
  }
  createButtons() {
    const StarPosY = this.scale.height - 246;
    const widthDiff = 131;
    const heightDiff = 71.25;
    this.generateQuestion();

    this.button2 = this.add
      .image(this.gameHalfWidth, StarPosY, "numbers", 1)
      .setInteractive()
      .setData("value", 2);

    this.button5 = this.add
      .image(this.gameHalfWidth, this.button2.y + heightDiff, "numbers", 4)
      .setInteractive()
      .setData("value", 5);

    this.button8 = this.add
      .image(this.gameHalfWidth, this.button5.y + heightDiff, "numbers", 7)
      .setInteractive()
      .setData("value", 8);

    this.button0 = this.add
      .image(this.gameHalfWidth, this.button8.y + heightDiff, "numbers", 10)
      .setInteractive()
      .setData("value", 0);

    this.button1 = this.add
      .image(this.button2.x - widthDiff, StarPosY, "numbers", 0)
      .setInteractive()
      .setData("value", 1);

    this.button4 = this.add
      .image(
        this.button5.x - widthDiff,
        this.button1.y + heightDiff,
        "numbers",
        3
      )
      .setInteractive()
      .setData("value", 4);

    this.button7 = this.add
      .image(
        this.button8.x - widthDiff,
        this.button4.y + heightDiff,
        "numbers",
        6
      )
      .setInteractive()
      .setData("value", 7);

    this.buttonDel = this.add
      .image(
        this.button0.x - widthDiff,
        this.button7.y + heightDiff,
        "numbers",
        9
      )
      .setInteractive()
      .setData("value", "del");

    this.button3 = this.add
      .image(this.button2.x + widthDiff, StarPosY, "numbers", 2)
      .setInteractive()
      .setData("value", 3);

    this.button6 = this.add
      .image(
        this.button5.x + widthDiff,
        this.button3.y + heightDiff,
        "numbers",
        5
      )
      .setInteractive()
      .setData("value", 6);

    this.button9 = this.add
      .image(
        this.button8.x + widthDiff,
        this.button6.y + heightDiff,
        "numbers",
        8
      )
      .setInteractive()
      .setData("value", 9);

    this.buttonOk = this.add
      .image(
        this.button0.x + widthDiff,
        this.button9.y + heightDiff,
        "numbers",
        11
      )
      .setInteractive()
      .setData("value", "ok");
  }

  addNumber(pointer, object, event) {
    let value = object.getData("value");
    if (isNaN(value)) {
      if (value == "del") {
        this.numberArray.pop();
        if (this.numberArray.length < 1) {
          this.numberArray[0] = 0;
        }
      }

      if (value == "ok") {
        this.checkAnswer();
        this.numberArray = [];
        this.numberArray[0] = 0;
      }
    } else {
      if (this.numberArray.length == 1 && this.numberArray[0] == 0) {
        this.numberArray[0] = value;
      } else {
        if (this.numberArray.length < 10) {
          this.numberArray.push(value);
        }
      }
    }
    this.number = parseInt(this.numberArray.join(""));

    this.resultText.setText(String(this.number));
    const textHalfWidth = this.resultText.width * 0.5;
    this.resultText.setX(this.gameHalfWidth - textHalfWidth);
    event.stopPropagation();
  }
  getOperator() {
    const operator = ["+", "-", "x", ":"];
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
    if (operator === "-") {
      if (numberB > numberA) {
        this.question[0] = `${numberB} - ${numberA}`;
        this.question[1] = numberB - numberA;
      } else {
        this.question[0] = `${numberA} - ${numberB}`;
        this.question[1] = numberA - numberB;
      }
    }
    if (operator === ":") {
      do {
        numberA = Phaser.Math.Between(0, 50);
        numberB = Phaser.Math.Between(0, 50);
      } while (!Number.isInteger(numberA / numberB));
      this.question[0] = `${numberA} : ${numberB}`;
      this.question[1] = numberA / numberB;
    }
    this.questionText.setText(this.question[0]);
    const textHalfWidth = this.questionText.width * 0.5;
    this.questionText.setX(this.gameHalfWidth - textHalfWidth);
  }
  checkAnswer() {
    if (this.number == this.question[1]) {
      this.correctAnswer = true;
    } else {
      this.correctAnswer = false;
    }
  }
  createSlash(x, y, frame, velocity, flip = false) {
    this.slash
      .setPosition(x, y)
      .setActive(true)
      .setFrame(frame)
      .setFlipX(flip)
      .setVisible(true)
      .setVelocityX(velocity);
  }

  spriteHit(slash, sprite) {
    slash.x = 0;
    slash.y = 0;
    slash.setActive(false);
    slash.setVisible(false);
    if (sprite.texture.key == "player") {
      sprite.anims.play("player-hit", true);
    } else {
      sprite.anims.play("enemy-hit", true);
    }
    this.time.delayedCall(500, () => {
      this.playerAttack = false;
      this.enemyAttack = false;
      this.correctAnswer = undefined;
      this.generateQuestion();
    });
  }
}

// masalah errornya ada di penamaan spiritesheetnya.
// seharusnya player/enemy, tapi jadi warrior1/warrior
