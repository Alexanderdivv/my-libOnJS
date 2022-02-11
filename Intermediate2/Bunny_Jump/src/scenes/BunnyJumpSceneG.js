import Phaser from "phaser";
import Carrot from "../game/Carrot.js";

var platforms;
var player;
var cursors;
var carrots;
var carrotsCollected;

export default class BunnyJumpScene extends Phaser.Scene {
  constructor() {
    super("bunny-jump-scene");
  }

  // init() {
  //     this.carrotsCollected = 0
  // }

  preload() {
    this.load.image("background", "images/bg_layer1.png");
    this.load.image("platform", "images/ground_grass.png");

    //challenge
    this.load.image("carrot", "images/carrot.png");
    this.load.image("bunny_jump", "images/bunny1_jump.png");
    this.load.image("bunny_stand", "images/bunny1_stand.png");
    this.load.audio("jumpSound", "sfx/phaseJump1.ogg");
  }

  create() {
    this.carrotsCollected = 0;
    this.add.image(240, 320, "background").setScrollFactor(1, 0);
    // ini di komen utk megnhilangkan platform besar
    // this.add.image(240, 320, 'platform')

    //membuat grup this.platforms
    this.platforms = this.physics.add.staticGroup();

    //membuat 5 platform dari group
    for (let i = 0; i < 5; i++) {
      //x bernilai acak dari 80-400
      const x = Phaser.Math.Between(80, 400);
      //y berjarak 150 antar platform
      const y = 150 * i;

      //membuat platform
      const platform = this.platforms.create(x, y, "platform");
      //mengecilkan ukuran
      platform.scale = 0.5;
      //
      platform.refreshBody();

      const body = platform.body;
      body.updateFromGameObject();
    }

    this.player = this.physics.add
      .sprite(240, 320, "bunny_stand")
      .setScale(0.5);

    this.physics.add.collider(this.player, this.platforms);

    //mematikan collision player pada bagian atas, kiri, kanan
    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    //kamera mengikuti player
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setDeadzone(this.scale.width * 1.5);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.carrots = this.physics.add.group({
      classType: Carrot,
    });
    this.physics.add.collider(this.platforms, this.carrots);
    this.physics.add.overlap(
      this.player,
      this.carrots,
      this.handleCollectCarrot,
      undefined,
      this
    );

    const style = { color: "#000", fontSize: 24 };
    this.carrotsCollectedText = this.add
      .text(240, 10, `Carrots: 0`, style)
      .setScrollFactor(0)
      .setOrigin(0.5, 0);
  }

  update() {
    //variable lokal untuk memastikan player menyentuh bawah
    const touchingDown = this.player.body.touching.down;

    //kondisi jika player menyentuh bawah
    if (touchingDown) {
      this.player.setVelocityY(-300);
      this.player.setTexture("bunny_jump");
      this.sound.play("jumpSound");
    }

    if (this.cursors.left.isDown && !touchingDown) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown && !touchingDown) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    //mencari percepatan player
    const vy = this.player.body.velocity.y;
    //jika percepatan lebih dari 0 dan animasi player buka stand
    if (vy > 0 && this.player.texture.key !== "bunny_stand") {
      //buat animasi stand
      this.player.setTexture("bunny_stand");
    }
    //panggil this.platforms, iterasi dengan parameter child
    this.platforms.children.iterate((child) => {
      const platform = child;

      const scrollY = this.cameras.main.scrollY;
      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100);
        platform.body.updateFromGameObject();

        this.addCarrotAbove(platform);
      }
    });

    this.horizontalWrap(this.player);

    const bottomPlatform = this.findBottomMostPlatform();
    if (this.player.y > bottomPlatform.y + 200) {
      // console.log('game over')
      this.scene.start("game-over-scene");
    }
  }

  horizontalWrap(sprite) {
    const halfWidth = sprite.displayWidth * 0.5;
    const gameWidth = this.scale.width;
    if (sprite.x < -halfWidth) {
      sprite.x = gameWidth + halfWidth;
    } else if (sprite.x > gameWidth + halfWidth) {
      sprite.x = -halfWidth;
    }
  }

  addCarrotAbove(sprite) {
    const y = sprite.y - sprite.displayHeight;

    /** @type {Phaser.Physics.Arcade.Sprite} */
    const carrot = this.carrots.get(sprite.x, y, "carrot");

    carrot.setActive(true);
    carrot.setVisible(true);

    this.add.existing(carrot);

    carrot.body.setSize(carrot.width, carrot.height);

    this.physics.world.enable(carrot);

    return carrot;
  }

  handleCollectCarrot(player, carrot) {
    this.carrots.killAndHide(carrot);
    this.physics.world.disableBody(carrot.body);

    this.carrotsCollected++;
    const value = `Carrots: ${this.carrotsCollected}`;
    this.carrotsCollectedText.text = value;
  }

  findBottomMostPlatform() {
    const platforms = this.platforms.getChildren();
    let bottomPlatform = platforms[0];

    for (let i = 1; i < platforms.length; i++) {
      const platform = platforms[i];

      if (platform.y < bottomPlatform.y) {
        continue;
      }
      bottomPlatform = platform;
    }

    return bottomPlatform;
  }
}
