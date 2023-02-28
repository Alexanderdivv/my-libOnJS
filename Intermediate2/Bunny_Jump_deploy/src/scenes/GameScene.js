import Phaser from "phaser";
import Up from "../game/Carrot";
export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");
  }
  init() {
    this.pad1 = undefined;
    this.pad2 = undefined;
    this.ninja = undefined;
    this.cursors = undefined;
    this.up = undefined;
    this.bottomPad = undefined;
    this.bottomPad1 = undefined;
    this.score = 0;
    this.scoreText = undefined;
    this.touchUp = false;
  }
  preload() {
    this.load.image("background", "image/gunung.png");
    this.load.image("pad1", "image/pad1.png");
    this.load.image("pad2", "image/pad2.png");
    this.load.spritesheet("player", "image/ninja.png", {
      frameWidth: 64.5,
      frameHeight: 106,
    });
    this.load.spritesheet("ninjafall", "image/ninjafall.png", {
      frameWidth: 64.5,
      frameHeight: 100,
    });
    this.load.image("up", "image/up.png");
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(400, 300, "background").setScale(2).setScrollFactor(1, 0);
    this.pad1 = this.physics.add.staticGroup();
    this.pad2 = this.physics.add.staticGroup();
    for (let i = 0; i < 6; i++) {
      let random = Phaser.Math.Between(1, 3);
      const x = Phaser.Math.Between(80, 400);
      const y = 170 * i; //platform akan berjarak 150px
      let platformChild = undefined;
      if (random == 2) {
        platformChild = this.pad2.create(x, y, "pad2");
      } else {
        platformChild = this.pad1.create(x, y, "pad1");
      }

      platformChild.setScale(0.5); //mengecilkan platform
      platformChild.refreshBody(); //refresh platform
      const body = platformChild.body;
      body.updateFromGameObject();
    }
    // for (let i = 0; i < 5; i++) {
    //   const x = Phaser.Math.Between(80, 400);
    //   const y = 150 * i;

    //   const pad1Child = this.pad1.create(x, y, "pad1");
    //   pad1Child.setScale(0.3);
    //   pad1Child.refreshBody();
    //   const body = pad1Child.body;
    //   body.updateFromGameObject();
    // }
    // for (let x = 0; x < 5; x++) {
    //   const x = Phaser.Math.Between(80, 400);
    //   const y = 150 * x;

    //   const pad2Child = this.pad2.create(x, y, "pad2");
    //   pad2Child.setScale(0.3);
    //   pad2Child.refreshBody();
    //   const body = pad2Child.body;
    //   body.updateFromGameObject();
    //   for (let i = 0; i < 5; i++) {
    //     let random = Phaser.Math.Between(1, 2);
    //     const x = Phaser.Math.Between(80, 400);
    //     const y = 170 * i; //platform akan berjarak 150px
    //     let pad1Child = undefined;
    //     let pad2Child = undefined;
    //     if (random == 1) {
    //       pad1Child = this.pad1.create(x, y, "pad1");
    //     } else {
    //       pad2Child = this.pad2.create(x, y, "pad2");
    //     }
    //   }
    // }
    this.player = this.physics.add.sprite(240, 320, "player").setScale(1);
    this.physics.add.collider(this.player, this.pad1);

    this.physics.add.collider(this.player, this.pad2);
    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(this.scale.width * 1.5);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 9 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "dead",
      frames: this.anims.generateFrameNumbers("ninjafall", {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.up = this.physics.add.group({
      classType: Up,
    });
    this.physics.add.collider(this.pad1, this.up);
    this.scoreText = this.add.text(20, 20, `Score : ${this.score} `, {
      fontSize: "32px",
      color: "red",
    });
    this.scoreText.setScrollFactor(0);
    this.physics.add.overlap(this.player, this.up, this.TouchingUp, null, this);
  }

  update() {
    const touchingDown = this.player.body.touching.down;

    if (touchingDown) {
      this.player.setVelocityY(-400);
      // this.player.setTexture("ninja");salah, dia animasi
      this.player.anims.play("jump", true);
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    // if (this.physics.overlap(this.player, this.up)) {
    //   this.player.setVelocityY(-600);

    // }
    if (
      this.physics.overlap(this.player, this.pad2) &&
      this.player.body.touching.down
    ) {
      this.player.setTint(0xff0000);
      // Add text game over

      // play dead animation until the end

      this.player.anims.play("dead", true);
      // delay 1 second
      this.time.delayedCall(1000, () => {
        this.player.anims.stop();
        this.add.text(this.player.x - 110, this.player.y - 100, "Game Over", {
          // fontSize: "42px",
          font: "bold 42px Arial",
          color: "red",
          // make font bold
        });
        this.physics.pause();
      });
      // stop the game
    }

    this.pad1.children.iterate((child) => {
      const pad1Child = child;
      // const scrollY = this.cameras.main.scrollY;
      const scrollY = this.cameras.main.worldView.y;
      // @ts-ignore
      if (pad1Child.y >= scrollY + 900) {
        // @ts-ignore
        pad1Child.y = scrollY - Phaser.Math.Between(75, 90);
        // @ts-ignore
        pad1Child.body.updateFromGameObject();
        // random up
        // @ts-ignore
        if (Phaser.Math.Between(0, 1) === 1) {
          this.addUpAbove(pad1Child);
        }
      }
    });
    this.pad2.children.iterate((child) => {
      const pad2Child = child;
      // const scrollY = this.cameras.main.scrollY;
      const scrollY = this.cameras.main.worldView.y;

      // @ts-ignore
      if (pad2Child.y >= scrollY + 900) {
        // @ts-ignore
        pad2Child.y = scrollY - Phaser.Math.Between(75, 90);
        // @ts-ignore
        pad2Child.body.updateFromGameObject();
      }
    });
    // const bottomPad1 = this.findBottomMostPad();
    // // @ts-ignore
    // if (this.player.y > bottomPad1.y + 200) {
    //   this.scene.start(`game-over-scene`);
    // }
  }
  GameOver(player, pad2) {
    this.physics.pause();
    this.add.text(300, 300, "Game Over!!!", {
      fontSize: "48px",
      color: "blue",
    });
  }
  findBottomMostPad() {
    // panggil childred dari platforms
    const pad1 = this.pad1.getChildren();
    // ambil item pertama dari array platforms lokal
    let bottomPad1 = pad1[0];

    // melakukan iterasi pada semua child dari platforms, untuk mencari buttom most platform
    for (let i = 1; i < pad1.length; i++) {
      const pad1a = pad1[i];
      // @ts-ignore
      if (pad1.y < bottomPad1.y) {
        continue;
      }
      bottomPad1 = pad1a;
    }
    return bottomPad1;
  }
  addUpAbove(sprite) {
    const y = sprite.y - sprite.displayHeight; //membuat item up di atas platform
    const up = this.up.get(sprite.x, y, `up`);

    up.setActive(true); //aktifkan carrot
    up.setVisible(true); //tampilkan carrot

    // menambahkan fisik dari carrot
    this.add.existing(up);
    up.body.setSize(up.width, up.height);
    this.physics.world.enable(up);
    return up;
  }
  TouchingUp(player, up) {
    this.player.setVelocityY(-800);
    this.up.killAndHide(up);
    this.physics.world.disableBody(up.body);
    this.score += 50;
    this.scoreText.setText("Score : " + this.score);
  }
}
