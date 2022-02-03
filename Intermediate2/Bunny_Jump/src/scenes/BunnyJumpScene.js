import Phaser from "phaser";
var platforms;
var player;
export default class BunnyJumpScene extends Phaser.Scene {
  constructor() {
    super("bunny-jump-scene");
  }
  preload() {
    this.load.image("background", "images/bg_layer1.png");
    this.load.image("platform", "images/ground_grass.png");
    this.load.image("carrot", "images/carrot.png");
    this.load.image("bunny_jump", "images/bunny1_jump.png");
    this.load.image("bunny_stand", "images/bunny1_stand.png");
  }
  create() {
    this.add.image(240, 320, "background");
    // this.add.image(240, 320, "platform");
    this.platforms = this.physics.add.staticGroup();

    // menggandakan platform
    for (let i = 0; i < 5; i++) {
      // x bernilai random dari 80-400
      const x = Phaser.Math.Between(80, 400);
      const y = 150 * i; //platform akan berjarak 150px

      // membuat platform
      const platformChild = this.platforms.create(x, y, "platform");
      platformChild.setScale(0.5); //mengecilkan platform
      platformChild.refreshBody(); //refresh platform
      const body = platformChild.body;
      body.updateFromGameObject();
    }

    // membuat player
    this.player = this.physics.add
      .sprite(240, 320, "bunny_stand")
      .setScale(0.5);

    //   membuat collision/tabrakan antara player dengan platform
    this.physics.add.collider(this.player, this.platforms);

    // membuat player/bunny agar hanya collide pada paltform yang dipijak
    // mematikan collision player pada bagian atas, kiri dan kanan
    this.player.body.checkCollision.up = false;
    this.player.body.checkCollision.left = false;
    this.player.body.checkCollision.right = false;

    // membuat kamera dapat mengikuti player/bunny keatas
    this.cameras.main.startFollow(this.player);
  }
  update() {
    //   variabel lokal untuk memastikan player menyentuh bawah
    const touchingDown = this.player.body.touching.down;

    // kondisi jika player menyentuh bawah
    if (touchingDown) {
      // maka player akan meloncat dengan percepatan -300
      this.player.setVelocityY(-300); //-300 karena keatas dan pertubahan animasi menjadi melompat
      this.player.setTexture("bunny_jump"); //mengubah texture menjadi melompat
    }
    // mencari percepatan player
    const vy = this.player.body.velocity.y;
    // jika percepatan lebih dari 0 dan animasi player bukan stand/berdiri
    if (vy > 0 && this.player.texture.key !== "bunny_stand") {
      // maka player akan berdiri
      this.player.setTexture("bunny_stand");
    }
  }
}
