import Phaser from "phaser";
var platforms;
var player;
var cursors;
var stars;
var score = 0;
var scoreText;
var bombs;
var gameOver = false;
export default class CollectingStartScene extends Phaser.Scene {
  constructor() {
    super(`collecting-starts-scene`);
  }

  preload() {
    this.load.image(`ground`, "images/platform.png");
    this.load.image(`sky`, `images/sky.png`);
    this.load.image(`star`, `images/star.png`);
    this.load.image(`bomb`, `images/bomb.png`);
    this.load.spritesheet(`dude`, `images/dude.png`, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    // membuat keyboardkursor

    this.add.image(400, 300, `sky`);
    // this.add.image(400, 300, `star`);
    platforms = this.physics.add.staticGroup();
    platforms.create(600, 400, `ground`);
    platforms.create(80, 100, `ground`);
    platforms.create(50, 300, `ground`);
    platforms.create(750, 220, `ground`);
    platforms.create(400, 568, `ground`).setScale(2).refreshBody();

    player = this.physics.add.sprite(100, 450, `dude`);
    player.setCollideWorldBounds(true);
    player.setBounce(0.2);
    this.physics.add.collider(player, platforms);

    // membuat bintang
    stars = this.physics.add.group({
      key: `star`, // game object name (from preload)
      repeat: 11, // mengulangi 11 kali
      // posisi bintang pertama, dan jarak dengan bintang selanjutnya
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    // Meeting 3 membuat collode antara player dan platform

    // membuat starts collide dengan platform
    this.physics.add.collider(stars, platforms);

    // animasi dude berjalan ke kiri
    this.anims.create({
      key: `left`, //nama animasi'
      frames: this.anims.generateFrameNumbers(`dude`, {
        start: 0,
        end: 3,
      }), //frame yang digunakan
      frameRate: 10,
      repeat: -1,
    });
    // animasi menghadap ke depan
    this.anims.create({
      key: `turn`,
      frames: [{ key: `dude`, frame: 4 }], //satu frame saja
      frameRate: 20,
    });

    // animasi berjalan ke kanan
    this.anims.create({
      key: `right`,
      frames: this.anims.generateFrameNumbers(`dude`, { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1, //mengulangu animasi (loop)
    });

    // membuat score
    scoreText = this.add.text(16, 16, `score: 0`, {
      fontSize: `32px`,
      color: `yellow`,
    });

    // membuat bomb
    // algoritma no 1
    bombs = this.physics.add.group();
    // algoritma no 5
    this.physics.add.collider(bombs, platforms);
    // algoritma no 6 saja, buat method hitBomb
    this.physics.add.collider(player, bombs, this.hitBomb, null, this);

    cursors = this.input.keyboard.createCursorKeys();
  }

  // method collectStar dengan parameter player dan star
  collectStar(player, star) {
    // menghilangkan fisik star/bintang
    star.disableBody(true, true);
    //   method untuk menghitung nilai score
    score += 10; //1 bintang bernilai 10
    // menampilkan teks dengan nilai score
    scoreText.setText("score: " + score);

    // membuat bomb, algoritma no 2, posisi x diambil acak
    var x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    // algoritma no 2
    var bomb = bombs.create(x, 0, `bomb`);
    bomb.setBounce(1); //algoritma no 3, memantul
    // algoritma no 3, ketika menyentuh tepi game
    bomb.setCollideWorldBounds(true);
    // algoritma no 4, mengatur kecepatan
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    // membuat bintang muncul lagi ketika semua terkumpul
    if (stars.countActive(true) === 0) {
      stars.children.iterate(function (child) {
        child.enableBody(true, child.x, child.y, true, true);
      });
    }
  }

  update() {
    //   jika keyboard left arrow ditekan
    if (cursors.left.isDown) {
      player.setVelocity(-160, 250); //kecepatan player kesamping (berjalan)
      player.anims.play(`left`, true); //animasi berjalan ke kiri
    } else if (cursors.right.isDown) {
      player.setVelocity(160, 250);
      player.anims.play(`right`, true); // memanggil animasi 'turn'
    } else {
      player.setVelocityX(0); // agar player jatuh cepat diawal
      player.anims.play(`turn`); //animasi menghadap ke depan
    }

    if (cursors.up.isDown) {
      //atas
      // kecepatan ke atas (lompat)
      player.setVelocityY(-250);
    }

    // membuat bintang menjadi objek yang bisa dijatuhkan
    stars.children.iterate(function (child) {
      // set gravity
      // memberikan efek memantul dengan nilai antara 0.4 dan 0.8
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // membuat player dengan stars overlap/bertabrakan
    this.physics.add.overlap(
      player, // membuat overlap antara player
      stars, // dan star
      this.collectStar, //memanggil method collectStart
      null, //proses callback yang tidak dibutuhkan
      this // memastikan overlap pada scene ini
    );

    // kondisi menang
    if (score >= 100) {
      this.physics.pause();
      this.add.text(300, 300, "You Win", {
        fontSize: "48px",
        color: "yellow",
      });
    }
  }

  hitBomb(player, bomb) {
    this.physics.pause(); //algoritma no 6a, untuk menghentikan game
    // untuk kebal dari bomb, bisa mengganti pause dengan resume
    player.setTint(0xff0000); //algoritma no 6b
    player.anims.play(`turn`); //algoritma no 6c
    gameOver = true; //algoritma no 6d
    this.add.text(300, 300, "Game Over", {
      fontSize: "48px",
      color: "yellow",
    });
  }
}
