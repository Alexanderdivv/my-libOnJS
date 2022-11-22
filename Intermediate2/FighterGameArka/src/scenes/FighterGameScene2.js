import Phaser from "phaser";
export default class FighterGameScene2 extends Phaser.Scene {
  constructor() {
    super("FighterGameScene2");
  }

  init() {
    this.cursors = undefined;
    this.keyboard = undefined;
    this.key = undefined;
    this.playerLife = 1;
    this.enemyLife = 1;
  }

  preload() {
    this.load.image("background", "images/city3.png");
    this.load.image("platform", "images/platform.png");
    this.load.spritesheet("player", "images/idle.png", {
      frameWidth: 62,
      frameHeight: 62,
    });
    this.load.spritesheet("run", "images/Run.png", {
      frameHeight: 62,
      frameWidth: 49.5,
    });
    this.load.spritesheet("jump", "images/Jump.png", {
      frameHeight: 62,
      frameWidth: 45,
    });
    this.load.spritesheet("attack", "images/Attack1.png", {
      frameHeight: 62,
      frameWidth: 100,
    });
    this.load.image("slash", "images/slashwhite.png");
    this.load.spritesheet("lifelabel", "images/lifebar.png", {
      frameHeight: 96.5,
      frameWidth: 431,
    });
  }
  create() {
    this.add.image(400, 300, "background").setScale(0.6);
    this.platform = this.physics.add.staticGroup();
    // make platform wider than the default
    this.platform
      .create(400, 550, "platform")
      .setScale(2)
      .refreshBody()
      .setVisible(false);
    this.player = this.createPlayer();

    // create button
    this.cursors = this.input.keyboard.createCursorKeys();
    // create button for zero button
    this.keyboard = this.input.keyboard.addKeys({
      zero: Phaser.Input.Keyboard.KeyCodes.ZERO,
    });

    // create enemy
    this.enemy = this.createPlayer();
    this.enemy.setTint(0xff0000);
    this.enemy.setPosition(540, 450);
    this.enemy.setFlipX(true);
    // create button for enemy controls
    this.key = this.input.keyboard.addKeys("W, A, S, D, E");

    // create slash
    this.slash = this.physics.add
      .sprite(0, 0 + 20, "slash")
      .setScale(0.6)
      .setCollideWorldBounds(true)
      .setActive(false)
      .setVisible(false);

    this.slash.body.setAllowGravity(false);

    // make playerLabel
    this.playerLabel = this.createLabel();
    this.playerLabel.body.setAllowGravity(false);
    this.enemyLabel = this.createLabel();
    this.enemyLabel.body.setAllowGravity(false);
    this.enemyLabel.setPosition(700, 50);

    // overlap between slash and enemy
    this.physics.add.overlap(
      this.slash,
      this.enemy,
      this.handleSlashOverlap,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.slash,
      this.player,
      this.handleSlashOverlap,
      undefined,
      this
    );
  }

  createLabel() {
    const playerLabel = this.physics.add
      .sprite(100, 50, "lifelabel")
      .setScale(0.5);

    this.anims.create({
      key: "life",
      frames: [{ key: "lifelabel", frame: 0 }],
    });
    this.anims.create({
      key: "life1",
      frames: [{ key: "lifelabel", frame: 1 }],
    });
    this.anims.create({
      key: "life2",
      frames: [{ key: "lifelabel", frame: 2 }],
    });
    this.anims.create({
      key: "life3",
      frames: [{ key: "lifelabel", frame: 3 }],
    });
    this.anims.create({
      key: "life4",
      frames: [{ key: "lifelabel", frame: 4 }],
    });
    this.anims.create({
      key: "life5",
      frames: [{ key: "lifelabel", frame: 5 }],
    });
    // keep sprite on screen

    playerLabel.anims.play("life", true);
    return playerLabel;
  }

  createPlayer() {
    const player = this.physics.add.sprite(200, 450, "player");

    this.anims.create({
      key: "turn",
      frames: [{ key: "player", frame: 0 }],
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNames("run", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("run", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("jump", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "attacks",
      frames: this.anims.generateFrameNumbers("attack", {
        start: 0,
        end: 3,
      }),
      frameRate: 15,
      repeat: 0,
    });

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.setScale(1.5);
    this.physics.add.collider(player, this.platform);
    return player;
  }

  createSlash(x, y, velocity, flipX, color) {
    this.slash
      .setPosition(x, y)
      .setActive(true)
      .setVisible(true)
      .setVelocityX(velocity)
      .setFlipX(flipX)
      .setScale(0.6)
      .setTint(color);
    // slash only move in x axis
    this.slash.body.setAllowGravity(false);
    // slash will dissapear when touch the edge
    this.slash.body.onWorldBounds = true;
    this.slash.body.world.on("worldbounds", (body) => {
      if (body.gameObject === this.slash) {
        this.slash.setActive(false).setVisible(false);
      }
    });
  }

  update() {
    this.movePlayer();
    this.moveEnemy();
  }

  movePlayer() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
      this.player.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
      this.player.setFlipX(false);
      // @ts-ignore
    } else if (this.keyboard.zero.isDown) {
      this.player.anims.play("attacks", true);
      // wait for animation to finish
      this.time.delayedCall(500, () => {
        this.createSlash(
          this.player.x + 150,
          this.player.y,
          300,
          this.player.flipX,
          0xffffff
        );
      });
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-330);
      this.player.anims.play("up", true);
    }
    if (this.cursors.down.isDown) {
      this.player.setVelocityY(330);
    }
  }

  moveEnemy() {
    // @ts-ignore
    if (this.key.A.isDown) {
      this.enemy.setVelocityX(-160);
      this.enemy.anims.play("left", true);
      this.enemy.setFlipX(true);
      // @ts-ignore
    } else if (this.key.D.isDown) {
      this.enemy.setVelocityX(160);
      this.enemy.anims.play("right", true);
      this.enemy.setFlipX(false);
    } else if (this.cursors.space.isDown) {
      this.enemy.anims.play("attacks", true);
      this.time.delayedCall(500, () => {
        this.createSlash(
          this.enemy.x - 150,
          this.enemy.y,
          -300,
          this.enemy.flipX,
          0xff0000
        );
      });
    } else {
      this.enemy.setVelocityX(0);
      this.enemy.anims.play("turn");
    }
    // @ts-ignore
    if (this.key.W.isDown) {
      this.enemy.setVelocityY(-330);
      this.enemy.anims.play("up", true);
    }
    // @ts-ignore
    if (this.key.S.isDown) {
      this.enemy.setVelocityY(330);
    }
  }

  handleSlashOverlap(slash, character) {
    // remove slash
    slash.setActive(false).setVisible(false).setPosition(0, 0);
    character.setTint(0x00ff00);

    if (character === this.player) {
      this.playerLabel.anims.play("life" + this.playerLife, true);
      if (this.playerLife === 6) {
        this.scene.start("GameOver");
      }
      this.playerLife++;
      this.time.delayedCall(500, () => {
        character.clearTint();
      });
    } else {
      this.enemyLabel.anims.play("life" + this.enemyLife, true);
      if (this.enemyLife === 6) {
        this.scene.start("GameOver");
      }
      this.enemyLife++;
      this.time.delayedCall(500, () => {
        character.setTint(0xff0000);
      });
    }
  }
}
