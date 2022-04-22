import Phaser from "phaser";

const level = [
  [1, 0, 3],
  [2, 4, 1],
  [3, 4, 2],
];

export default class MemoryGameScene extends Phaser.Scene {
  constructor() {
    super("memory-game-scene");
  }

  init() {
    this.halfWidth = this.scale.width / 2;
    this.halfHeight = this.scale.height / 2;
    this.boxGroup = undefined;
    this.player = undefined;
    this.cursors = this.input.keyboard.createCursorKeys();

    this.activeBox = undefined;
    this.itemsGroup = undefined;
  }

  preload() {
    this.load.image("bg", "images/bg.jpg");
    this.load.spritesheet("tilesheet", "images/sokoban_tilesheet.png", {
      frameWidth: 64,
    });
    this.load.image("chicken", "images/chicken.png");
    this.load.image("duck", "images/duck.png");
    this.load.image("bear", "images/bear.png");
    this.load.image("parrot", "images/parrot.png");
    this.load.image("penguin", "images/penguin.png");
    this.load.image("play", "images/play.png");
  }

  create() {
    //   menambahkan background
    this.add.image(this.halfWidth, 150, "bg").setScale(3);
    // static objek
    this.boxGroup = this.physics.add.staticGroup();
    this.player = this.createPlayer();
    this.createBox();

    // menambahkan collider player dengan boxGroup
    this.physics.add.collider(
      this.player,
      this.boxGroup,
      this.handlePlayerBoxCollide,
      undefined,
      this
    );
    this.itemsGroup = this.add.group();
  }

  update() {
    this.movePlayer(this.player);

    // untuk membuat player tidak berada dibelakang box.
    // tapi kode ini tidak berfungsi karena player tidak berada dibelakang box
    // jadinya tetap dipake, penyelasannya di halaman 145
    this.children.each((c) => {
      /** @type {Phaser.Physics.Arcade.Sprite} */
      // @ts-ignore
      const child = c;
      child.setDepth(child.y);
    });

    this.updateActiveBox();
  }

  createBox() {
    const width = this.scale.width;
    let xPer = 0.25;
    let y = 150;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        this.boxGroup
          .get(width * xPer, y, "tilesheet", 9)
          .setSize(64, 32)
          .setOffset(0, 32)
          .setData("itemType", level[row][col]);
        xPer += 0.25;
      }

      xPer = 0.25;
      y += 150;
    }
  }

  createPlayer() {
    const player = this.physics.add
      .sprite(this.halfWidth, this.halfHeight + 30, "tilesheet")
      .setSize(40, 16)
      .setOffset(12, 38);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: "standby",
      frames: [
        {
          key: "tilesheet",
          frame: 52,
        },
      ],
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("tilesheet", {
        start: 52,
        end: 54,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("tilesheet", {
        start: 55,
        end: 57,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("tilesheet", {
        start: 81,
        end: 83,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("tilesheet", {
        start: 78,
        end: 80,
      }),
      frameRate: 10,
      repeat: -1,
    });

    return player;
  }

  movePlayer(player) {
    const speed = 200;
    if (this.cursors.left.isDown) {
      this.player.setVelocity(-speed, 0);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocity(speed, 0);
      this.player.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocity(0, -speed);
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocity(0, speed);
      this.player.anims.play("down", true);
    } else {
      this.player.setVelocity(0, 0);
      this.player.anims.play("standby", true);
    }

    const spaceJustPressed = Phaser.Input.Keyboard.JustUp(this.cursors.space);

    if (spaceJustPressed && this.activeBox) {
      this.openBox(this.activeBox);
      this.activeBox.setFrame(9);
      this.activeBox = undefined;
    }
  }

  handlePlayerBoxCollide(player, box) {
    if (this.activeBox) {
      return;
    }

    this.activeBox = box;
    this.activeBox.setFrame(7);

    const opened = box.getData("opened");
    if (opened) {
      return;
    }
  }

  updateActiveBox() {
    if (!this.activeBox) {
      return;
    }

    const distance = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.activeBox.x,
      this.activeBox.y
    );

    if (distance < 64) {
      return;
    }
    // mengembalikan ke warna semula
    this.activeBox.setFrame(9);
    this.activeBox = undefined;
  }

  openBox(box) {
    if (!box) {
      return;
    }

    const itemType = box.getData("itemType");
    let item;

    switch (itemType) {
      case 0:
        item = this.itemsGroup.get(box.x, box.y);
        item.setTexture("bear");
        break;

      case 1:
        item = this.itemsGroup.get(box.x, box.y);
        item.setTexture("chicken");
        break;

      case 2:
        item = this.itemsGroup.get(box.x, box.y);
        item.setTexture("duck");
        break;

      case 3:
        item = this.itemsGroup.get(box.x, box.y);
        item.setTexture("parrot");
        break;

      case 4:
        item = this.itemsGroup.get(box.x, box.y);
        item.setTexture("penguin");
        break;
    }
    if (!item) {
      return;
    }

    box.setData(`opened`, true);
  }
}
