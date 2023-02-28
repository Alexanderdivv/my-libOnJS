import Phaser from "phaser";
export class GangsterHunter extends Phaser.Scene {
  constructor() {
    super("gangster-hunter-scene");
  }
  init() {
    this.platforms = undefined;
    this.player = undefined;
    this.cursor = undefined;
    this.enemy = undefined;
    this.enemyMoveArea = 200;
    this.enemyAttacks = false;
    this.playerAttacks = false;
    this.lifeLabel = undefined;
    this.life = 4;
  }
  preload() {
    // this.load.image("background", "images/823383.jpg");
    // this.load.image("startButton", "images/start.png");
    this.load.image("scene2", "images/scene2.png");
    this.load.image("ground", "images/platform.png");
    this.load.spritesheet("id1", "images/id1.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet("running1", "images/run1.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet("id4", "images/id4.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet("attack", "images/at1.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet("walke", "images/Walk.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet("attace", "images/Attack.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
  }
  create() {
    // this.add.image(400, 300, "background").setScale(0.278);
    // this.add.image(390, 350, "startButton").setScale(0.55);
    const middleX = this.cameras.main.width / 2;
    this.add.image(middleX, 250, "scene2").setScale(0.5);
    this.platforms = this.physics.add.staticGroup();
    // this.platforms.create(350, 365, "ground").refreshBody().setVisible(true);
    // scale platform to fit the width of the game
    this.platforms
      .create(400, 340, "ground")
      .setScale(2)
      .refreshBody()
      .setVisible(false);
    this.player = this.physics.add
      .sprite(100, 200, "id1")
      .setScale(1)
      .setOffset(-20, 0);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);
    this.cursor = this.input.keyboard.createCursorKeys();
    //animation to the left
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("running1", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    //animation idle
    this.anims.create({
      key: "turn",
      frames: [{ key: "id1", frame: 0 }],
      frameRate: 20,
    });
    //animation to the right
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("running1", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    this.enemy = this.physics.add.sprite(150, 200, "id4").setScale(1);
    this.enemy.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy, this.platforms);
    this.enemy.setFlipX(true);

    this.anims.create({
      key: "PlayerAttack",
      frames: this.anims.generateFrameNumbers("attack", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    // enemy walking animation
    this.anims.create({
      key: "EnemyWalk",
      frames: this.anims.generateFrameNumbers("walke", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    // enemy attack
    this.anims.create({
      key: "EnemyAttack",
      frames: this.anims.generateFrameNumbers("attace", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1.5);
    this.cameras.main.setBounds(0, 0, 770, 500);

    this.enemy1 = this.physics.add.sprite(600, 200, "id4").setScale(1);
    this.enemy1.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy1, this.platforms);
    this.enemy1.setFlipX(true);

    this.enemy2 = this.physics.add.sprite(259, 200, "id4").setScale(1);
    this.enemy2.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy2, this.platforms);
    this.enemy2.setFlipX(true);

    this.enemy3 = this.physics.add.sprite(361, 200, "id4").setScale(1);
    this.enemy3.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy3, this.platforms);
    this.enemy3.setFlipX(true);

    this.enemy4 = this.physics.add.sprite(521, 200, "id4").setScale(1);
    this.enemy4.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemy4, this.platforms);
    this.enemy4.setFlipX(true);

    // create lifeLabel player
    this.lifeLabel = this.add.text(10, 200, "Life : 4", {
      fontSize: "12px",
      color: "white",
    });
  }
  update() {
    if (this.cursor.down.isDown) {
      this.player.anims.play("PlayerAttack", true);
      this.player.setVelocityX(0);
    } else {
      if (this.cursor.left.isDown) {
        this.player.setVelocityX(-200);
        this.player.anims.play("left", true);
        this.player.setFlipX(true);
      } else if (this.cursor.right.isDown) {
        this.player.setVelocityX(200);
        this.player.anims.play("right", true);
        this.player.setFlipX(false);
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play("turn");
      }
    }
    // lifelabel follow player
    this.lifeLabel.x = this.player.x - 10;
    this.lifeLabel.y = this.player.y - 30;

    // player attack enemy
    // if (this.player.anims.currentAnim.key === 'PlayerAttack' && this.enemyAttacks){

    // }
    // player hit enemy

    if (this.cursor.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-120);
      this.player.anims.play("turn");
    }
    // enemy following player
    this.enemyMoving(this.enemy, 20);
    this.enemyMoving(this.enemy1, 40);
    this.enemyMoving(this.enemy2, 60);
    this.enemyMoving(this.enemy3, 80);
    this.enemyMoving(this.enemy4, 100);

    this.enemyAttack(this.enemy);
    this.enemyAttack(this.enemy1);
    this.enemyAttack(this.enemy2);
    this.enemyAttack(this.enemy3);
    this.enemyAttack(this.enemy4);

    // if player hit enemy
    if (
      this.physics.overlap(this.player, this.enemy) &&
      this.player.anims.currentAnim.key === "PlayerAttack"
    ) {
      this.time.delayedCall(500, () => {
        this.enemy.setVisible(false);
        this.enemy.setActive(false);
      });
    }
    if (
      this.physics.overlap(this.player, this.enemy1) &&
      this.player.anims.currentAnim.key === "PlayerAttack"
    ) {
      this.time.delayedCall(500, () => {
        this.enemy1.setVisible(false);
        this.enemy1.setActive(false);
      });
    }

    if (
      this.physics.overlap(this.player, this.enemy2) &&
      this.player.anims.currentAnim.key === "PlayerAttack"
    ) {
      this.time.delayedCall(500, () => {
        this.enemy2.setVisible(false);
        this.enemy2.setActive(false);
      });
    }

    if (
      this.physics.overlap(this.player, this.enemy3) &&
      this.player.anims.currentAnim.key === "PlayerAttack"
    ) {
      this.time.delayedCall(500, () => {
        this.enemy3.setVisible(false);
        this.enemy3.setActive(false);
      });
    }

    if (
      this.physics.overlap(this.player, this.enemy4) &&
      this.player.anims.currentAnim.key === "PlayerAttack"
    ) {
      this.time.delayedCall(500, () => {
        this.enemy4.setVisible(false);
        this.enemy4.setActive(false);
      });
    }

    // if life = 0, show text game over
    if (this.life === 0) {
      this.add.text(this.player.x - 100, this.player.y - 50, "Game Over", {
        fontSize: "30px",
        color: "white",
        backgroundColor: "black",
      });
      this.scene.pause();
    }
  }

  // enemy move following player
  enemyMoving(enemy, speed) {
    if (enemy.x > this.player.x) {
      enemy.setVelocityX(-speed);
      enemy.anims.play("EnemyWalk", true);
      enemy.setFlipX(true);
      this.enemyAttacks = false;
    } else if (enemy.x < this.player.x - 15) {
      enemy.setVelocityX(speed);
      enemy.anims.play("EnemyWalk", true);
      enemy.setFlipX(false);
      this.enemyAttacks = false;
    } else {
      enemy.setVelocityX(0);
      // delay
      this.time.delayedCall(500, () => {
        enemy.anims.play("EnemyAttack", true);
      });
      this.enemyAttacks = true;
    }
  }

  enemyAttack(enemy) {
    if (
      this.enemyAttacks &&
      enemy.anims.currentFrame.index === 5 &&
      enemy.anims.currentAnim.key === "EnemyAttack"
    ) {
      // remove enemy
      this.life--;
      const value = `Life: ${this.life}`;
      this.lifeLabel.text = value;
      enemy.anims.play("EnemyAttack", false);
    }
  }
  playerAttack(enemy) {
    if (
      this.player.anims.currentAnim.key === "PlayerAttack" &&
      this.enemyAttacks
    ) {
      if (this.player.anims.currentFrame.index === 5) {
        enemy.setVisible(false);
        enemy.setActive(false);
        console.log("test");
      }
    }
  }
}
