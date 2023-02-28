import Phaser from "phaser";
import Carrot from "../game/Carrot";
var carrots;
var carrotsCollected;
var platforms;
var player;
var cursors;
// inisialisai variabel untuk button berupa boolean
var nav_left = false;
var nav_right = false;
export default class BunnyJumpScene extends Phaser.Scene {
  constructor() {
    super("bunny-jump-scene");
  }
  init() {
    this.doubleJump = false;
    this.platforms2 = undefined;
  }
  preload() {
    this.load.image("background", "images/bg_layer1.png");
    this.load.image("platform", "images/ground_grass.png");
    this.load.image("carrot", "images/carrot.png");
    this.load.image("bunny_jump", "images/bunny1_jump.png");
    this.load.image("bunny_stand", "images/bunny1_stand.png");
    this.load.audio("jumpSound", "sfx/phaseJump1.ogg");
    // menambah button
    this.load.image("right-btn", "images/right-btn.png");
    this.load.image("left-btn", "images/left-btn.png");
  }
  create() {
    // membuat background tidak tertinggal di layar
    this.add.image(205, 360, `background`).setScrollFactor(1, 0);
    // atur deadzone dengan nilai lebar layout dikalikan 1.5
    this.cameras.main.setDeadzone(this.scale.width * 1.5);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(205, 360, "background");
    // this.add.image(240, 320, "platform");
    this.platforms = this.physics.add.staticGroup();

    // // make the other platforms, that cause the player double jump
    this.platforms2 = this.physics.add.staticGroup();

    // random the platform to show and make it difference
    for (let i = 0; i < 6; i++) {
      let random = Phaser.Math.Between(1, 2);
      const x = Phaser.Math.Between(80, 400);
      const y = 170 * i; //platform akan berjarak 150px
      let platformChild = undefined;
      if (random == 1) {
        platformChild = this.platforms.create(x, y, "platform");
      } else {
        platformChild = this.platforms2
          .create(x, y, "platform")
          .setTint(0xff1245);
      }

      platformChild.setScale(0.5); //mengecilkan platform
      platformChild.refreshBody(); //refresh platform
      const body = platformChild.body;
      body.updateFromGameObject();
    }

    // // menggandakan platform
    // for (let i = 0; i < 6; i++) {
    //   // x bernilai random dari 80-400
    //   const x = Phaser.Math.Between(80, 400);
    //   const y = 170 * i; //platform akan berjarak 150px

    //   const platformChild = this.platforms.create(x, y, "platform");
    //   platformChild.setScale(0.5); //mengecilkan platform
    //   platformChild.refreshBody(); //refresh platform
    //   const body = platformChild.body;
    //   body.updateFromGameObject();

    // }

    // membuat player
    this.player = this.physics.add
      .sprite(240, 320, "bunny_stand")
      .setScale(0.5);

    //   membuat collision/tabrakan antara player dengan platform
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.platforms2);

    // membuat player/bunny agar hanya collide pada paltform yang dipijak
    // mematikan collision player pada bagian atas, kiri dan kanan
    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    // membuat kamera dapat mengikuti player/bunny keatas
    this.cameras.main.startFollow(this.player);
    // menambahkan objek carrots ke scene
    this.carrots = this.physics.add.group({
      classType: Carrot,
    });
    // platforms berbenturan dengan carrots
    this.physics.add.collider(this.platforms, this.carrots);
    this.physics.add.collider(this.platforms2, this.carrots);

    this.physics.add.overlap(
      this.player,
      this.carrots,
      this.handleCollectCarrot,
      undefined,
      this
    );
    this.carrotsCollected = 0;
    // menambahkan teks score
    const style = { color: `#000`, fontSize: `24px` };
    // mengubah nilai collected carrots
    this.carrotsCollectedText = this.add
      .text(270, 10, `Carrots: 0`, style)
      .setScrollFactor(0)
      .setOrigin(0.5, 0);

    this.createButton();
  }

  update() {
    const touchingDown = this.player.body.touching.down;

    // if player touch the platform 2
    // if player stand on the platform 2
    if (this.physics.overlap(this.player, this.platforms2)) {
      this.player.setVelocityY(-800);
      this.player.setTexture("bunny_jump");
    } else if (touchingDown) {
      this.player.setVelocityY(-400);
      this.player.setTexture("bunny_jump");
    }
    // //   variabel lokal untuk memastikan player menyentuh bawah
    // const touchingDown = this.player.body.touching.down;
    // // check the player is touch the platform 2 or platform 1
    // if (touchingDown) {
    //   this.player.setVelocityY(-800);
    //   this.player.setTexture("bunny_jump");
    // }
    // mengatur pergerakan player/bunny
    if (this.cursors.left.isDown || this.nav_left) {
      this.player.setVelocityX(-200);
    } else if (this.cursors.right.isDown || this.nav_right) {
      this.player.setVelocityX(200);
    } else {
      this.player.setVelocityX(0);
    }

    // mencari percepatan player
    const vy = this.player.body.velocity.y;
    // jika percepatan lebih dari 0 dan animasi player bukan stand/berdiri
    if (vy > 0 && this.player.texture.key !== "bunny_stand") {
      // maka player akan berdiri
      this.player.setTexture("bunny_stand");
    }

    // melakukan iterasi pada semua child di platform

    this.platforms.children.iterate((child) => {
      const platformChild = child;
      const scrollY = this.cameras.main.scrollY;
      // @ts-ignore
      if (platformChild.y >= scrollY + 970) {
        // @ts-ignore
        // platformChild.y = scrollY - Phaser.Math.Between(75, 90);
        platformChild.y = scrollY + Phaser.Math.Between(5, 15);
        // @ts-ignore
        platformChild.body.updateFromGameObject();

        // panggil method carrot
        this.addCarrotAbove(platformChild);
      }
    });
    this.platforms2.children.iterate((child) => {
      const platformChild = child;
      const scrollY = this.cameras.main.scrollY;
      // @ts-ignore
      if (platformChild.y >= scrollY + 970) {
        // @ts-ignore
        // platformChild.y = scrollY - Phaser.Math.Between(75, 90);
        platformChild.y = scrollY + Phaser.Math.Between(5, 15);
        // @ts-ignore
        platformChild.body.updateFromGameObject();

        // panggil method carrot
        this.addCarrotAbove(platformChild);
      }
    });
    this.horizontalWrap(this.player);

    const buttomPlatform = this.findButtomMostPlatform();
    // @ts-ignore
    if (this.player.y > buttomPlatform.y + 200) {
      this.scene.start(`game-over-scene`);
    }
  }

  // buat method dengan parameter sprite
  horizontalWrap(sprite) {
    // bukan yang ini, tapi sama
    // // jika sprite berada di kiri layar
    // if (sprite.x < -50) {
    //   // maka sprite akan berada di kanan layar
    //   sprite.x = this.scale.width + 50;
    // } else if (sprite.x > this.scale.width + 50) {
    //   // jika sprite berada di kanan layar
    //   // maka sprite akan berada di kiri layar
    //   sprite.x = -50;
    // }
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
    const carrot = this.carrots.get(sprite.x, y, `carrot`);

    carrot.setActive(true); //aktifkan carrot
    carrot.setVisible(true); //tampilkan carrot

    // menambahkan fisik dari carrot
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

  findButtomMostPlatform() {
    // panggil childred dari platforms
    const platforms = this.platforms.getChildren();
    // ambil item pertama dari array platforms lokal
    let buttomPlatforms = platforms[0];

    // melakukan iterasi pada semua child dari platforms, untuk mencari buttom most platform
    for (let i = 1; i < platforms.length; i++) {
      const platform = platforms[i];
      // @ts-ignore
      if (platform.y < buttomPlatforms.y) {
        continue;
      }
      buttomPlatforms = platform;
    }
    return buttomPlatforms;
  }

  // method untuk membuat button
  createButton() {
    this.input.addPointer(2);
    let nav_left = this.add
      .image(150, 880, "left-btn")
      .setInteractive()
      .setScrollFactor(0)
      .setDepth(0.5)
      .setAlpha(0.8);
    let nav_right = this.add
      .image(390, 880, "right-btn")
      .setInteractive()
      .setScrollFactor(0)
      .setDepth(0.5)
      .setAlpha(0.8);

    nav_left.on(
      "pointerdown",
      () => {
        this.nav_left = true;
      },
      this
    );
    nav_left.on(
      "pointerup",
      () => {
        this.nav_left = false;
      },
      this
    );
    nav_right.on(
      "pointerdown",
      () => {
        this.nav_right = true;
      },
      this
    );
    nav_right.on(
      "pointerup",
      () => {
        this.nav_right = false;
      },
      this
    );
  }
}

// item yg buat double jump
// platform yg buat mati
