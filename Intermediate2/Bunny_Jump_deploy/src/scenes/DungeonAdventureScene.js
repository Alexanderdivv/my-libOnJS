import Phaser from "phaser";
export default class DungeonAdventureScene extends Phaser.Scene {
  constructor() {
    super("dungeon_adventure_scene");
  }
  init() {
    this.player = undefined;
    this.platforms = undefined;
    this.cursor = undefined;
    this.enemy = undefined;
    this.enemy_attack = undefined;
    this.playerLife = 3;
    this.enemyLife = 1;
  }
  preload() {
    this.load.image("sky_bg", "image_lf/NewBg.png");
    this.load.image("bottom_tile", "image_lf/BottomTile2.png");
    this.load.image("bottomtile_grass", "image_lf/BottomTile_Grass.png");
    this.load.spritesheet(
      "player_idle",
      "image_lf/Character/Idle/Idle-Sheet.png",
      { frameWidth: 80, frameHeight: 72 }
    );
    this.load.spritesheet(
      "player_jump",
      "image_lf/Character/Jumlp-All/Jump-All-Sheet.png",
      { frameWidth: 64, frameHeight: 64 }
    );
    this.load.spritesheet(
      "player_run",
      "image_lf/Character/Run/Run-Sheet.png",
      { frameWidth: 80, frameHeight: 80 }
    );
    this.load.spritesheet(
      "player_attack",
      "image_lf/Character/Attack-01/Attack-01-Sheet.png",
      { frameWidth: 96, frameHeight: 80 }
    );
    this.load.spritesheet("enemy", "image_mc/Mushroom/Attack3.png", {
      frameWidth: 150,
      frameHeight: 110,
    });
    this.load.image("life", "image_lf/life.png");
  }

  create() {
    this.add.image(360, 240, "sky_bg");
    this.add.image(360, 240, "bottomtile_grass");
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(360, 455.5, "bottom_tile");

    //Life
    this.life1 = this.add.image(20, 20, "life").setScale(1.5);
    this.life2 = this.add.image(40, 20, "life").setScale(1.5);
    this.life3 = this.add.image(60, 20, "life").setScale(1.5);

    //Player
    this.player = this.physics.add.sprite(180, 100, "player_idle");
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    //Cursor Input
    this.cursor = this.input.keyboard.createCursorKeys();

    //Player Animation
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player_idle", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("player_run", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("player_jump", {
        start: 0,
        end: 14,
      }),
      frameRate: 25,
      repeat: -1,
    });

    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("player_attack", {
        start: 1,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    //Camera Follow
    //this.cameras.main.startFollow(this.player)
    //this.cameras.main.setZoom(1)

    //Enemy
    this.enemy = this.physics.add
      .sprite(480, 100, "enemy")
      .setScale(0.8)
      .refreshBody();
    this.enemy.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy, this.platforms);

    //Enemy Animation
    this.anims.create({
      key: "enemy_attack",
      frames: this.anims.generateFrameNumbers("enemy", { start: 3, end: 10 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "enemy_idle",
      frames: this.anims.generateFrameNumbers("enemy", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    if (this.cursor.space.isDown) {
      this.player.anims.play("attack", true); //long press
    } else {
      if (this.cursor.left.isDown) {
        this.player.setVelocityX(-200);
        this.player.setFlipX(true);
        this.player.anims.play("run", true);
      } else if (this.cursor.right.isDown) {
        this.player.setVelocityX(200);
        this.player.setFlipX(false);
        this.player.anims.play("run", true);
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play("idle");
      }

      if (this.cursor.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-200);
        this.player.anims.play("idle");
      }
    }

    //Enemy Chasing and Attack
    if (this.enemy.x > this.player.x + 20) {
      this.enemy.setVelocityX(-100);
      this.enemy.flipX = true;
      this.enemy.anims.play("enemy_idle", true);
      this.enemy_attack = false;
    } else if (this.enemy.x < this.player.x - 20) {
      this.enemy.setVelocityX(100);
      this.enemy.flipX = false;
      this.enemy.anims.play("enemy_idle", true);
      this.enemy_attack = false;
    } else if (this.enemy.y > this.player.y + 20) {
      this.enemy.anims.play("enemy_idle", true);
      this.enemy_attack = false;
    } else {
      this.enemy.setVelocityX(0);
      // play skletonattack anims only once and not repeat
      this.enemy_attack = true;
      this.enemy.anims.play("enemy_attack", true);
    }
    //this.player.setFlipX(true);

    if (
      this.physics.overlap(this.player, this.enemy) &&
      this.player.anims.currentAnim.key === "attack"
    ) {
      this.time.delayedCall(200, () => {
        this.enemy.setVisible(false);
        this.enemy.setActive(false);
      });
    }

    // enemy attack
    // kondisi disini berguna untuk membuat life player akan berkurang setelah animasi attack enemy selesai dilakukan.
    // masalah kita waktu itu ada di frame arthur. jadi walaupun di pembuatan animasi dia start: 3, end: 10, tapi ternyata waktu pengecekan itu tetap dianggap start:0, end:8
    if (
      this.enemy_attack &&
      this.enemy.anims.currentAnim.key == "enemy_attack" &&
      this.enemy.anims.currentFrame.index === 8
    ) {
      this.player.setTint(0xff2b2b);
      this.time.delayedCall(200, () => {
        this.playerLife--;
        if (this.playerLife == 2) {
          this.life3.setVisible(false);
        }
        if (this.playerLife == 1) {
          this.life2.setVisible(false);
        }
        if (this.playerLife == 0) {
          this.life1.setVisible(false);
        }
        this.player.clearTint();
      });
      this.enemy.anims.play("enemy_attack", false);
    }
  }
}
