import Phaser, { RIGHT, Tilemaps } from "phaser";
export default class FighterGameScene extends Phaser.Scene {
  constructor() {
    super("fighter-scene");
  }
  init() {
    this.platform = undefined;
    this.player = undefined;
    this.nav_left = false;
    this.nav_right = false;
    this.crouch = false;
    this.jump = false;
    this.punch = false;
    this.playerLife = 10;
    this.enemyLife = 10;
    this.enemy = undefined;
    this.player = undefined;
    this.playerLabel = undefined;
    this.enemyLabel = undefined;
    this.speed = 100;
    this.cursor = undefined;
    this.slash = undefined;
    this.playerAttack = false;
    this.enemyattack = false;
    this.keyboard = undefined;
    this.skill = undefined;
  }
  preload() {
    this.load.spritesheet("player", "images/idle.png", {
      frameHeight: 62,
      frameWidth: 49.5,
    });
    this.load.image("background", "images/city3.png");
    this.load.image("slash", "images/slashwhite.png");
    this.load.image("platform", "images/platform.png");
    this.load.image("punch", "images/punch2.png");
    this.load.image("left_btn", "images/left_btn.png");
    this.load.image("right_btn", "images/right_btn.png");
    this.load.spritesheet("lifelabel", "images/lifebar.png", {
      frameHeight: 96.5,
      frameWidth: 431,
    });
    this.load.spritesheet("run", "images/Run.png", {
      frameHeight: 62,
      frameWidth: 49.5,
    });
    this.load.spritesheet("attack", "images/Attack1.png", {
      frameHeight: 62,
      frameWidth: 100,
    });
    this.load.spritesheet("jump", "images/Jump.png", {
      frameHeight: 62,
      frameWidth: 49.5,
    });
    this.load.spritesheet("take_hit", "images/hit.png", {
      frameHeight: 62,
      frameWidth: 49.5,
    });
  }
  create() {
    this.add.image(400, 300, "background").setScale(0.6);
    this.platform = this.physics.add.staticGroup();
    this.platform
      .create(300, 550, "platform")
      .setScale(2)
      .refreshBody()
      .setVisible(true);
    this.createButton();
    this.cursor = this.input.keyboard.createCursorKeys();
    this.player = this.createPlayer();
    this.player.setScale(3);
    this.physics.add.collider(this.player, this.platform);
    this.playerLabel = this.createLabel();
    // make playerlabel stay on top
    // gravity is set to 0
    this.playerLabel.body.setAllowGravity(false);
    this.slash = this.physics.add
      .sprite(this.player.x, this.player.y, "slash")
      .setActive(false)
      .setVisible(false)
      .setGravityY(-500)
      .setOffset(0, -10)
      .setDepth(1);
    this.enemy = this.createPlayer();
    this.physics.add.collider(this.enemy, this.platform);
    this.enemy.setFlipX(true);
    this.enemy.setPosition(400, 385);
    this.physics.add.overlap(
      this.slash,
      this.player,
      this.spriteHit,
      null,
      this
    );
    this.physics.add.overlap(
      this.slash,
      this.enemy,
      this.spriteHit,
      null,
      this
    );
    this.enemy.setScale(3);
    this.key = this.input.keyboard.addKeys("W, A, S, D, E");
    // enemy label
    this.enemyLabel = this.createLabel();
    this.enemyLabel.body.setAllowGravity(false);
    this.enemyLabel.setPosition(630, 50);
  }
  update(time) {
    this.movePlayer(this.player, time);
    // if (this.punch === true && !this.playerAttack) {
    //   this.player.anims.play("player-attack", true);
    //   this.time.delayedCall(500, () => {
    //     this.createSlash(this.player.x + 60, this.player.y, 4, 600);
    //   });
    //   this.playerAttack = true;
    // }
    this.moveEnemy(this.enemy, time);
  }

  createPlayer() {
    const player = this.physics.add.sprite(100, 385, "player");
    player.setCollideWorldBounds(true);
    this.anims.create({
      key: "turn",
      frames: [
        {
          key: "player",
          frame: 0,
        },
      ],
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("run", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: 0,
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
      key: "player-attack",
      frames: this.anims.generateFrameNumbers("attack", {
        start: 1,
        end: 3,
      }),
      frameRate: 1,
      repeat: 0,
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("jump", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: 7,
    });
    this.anims.create({
      key: "hit",
      frames: this.anims.generateFrameNumbers("take_hit", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: 0,
    });
    return player;
  }
  createButton() {
    this.input.addPointer(5);

    let punch = this.add
      .image(660, 500, "punch")
      .setInteractive()
      .setDepth(0.5)
      .setAlpha(0.4)
      .setScale(0.3);

    let nav_left = this.add
      .image(50, 500, "left_btn")
      .setInteractive()
      .setDepth(0.5)
      .setAlpha(0.25);

    let nav_right = this.add
      .image(nav_left.x + nav_left.displayWidth + 10, 500, "right_btn")
      .setInteractive()
      .setDepth(0.5)
      .setAlpha(0.25);
    nav_left.on(
      "pointerdown",
      () => {
        this.nav_left = true;
      },
      this
    );
    nav_left.on(
      "pointerout",
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
      "pointerout",
      () => {
        this.nav_right = false;
      },
      this
    );
    punch.on(
      "pointerdown",
      () => {
        this.punch = true;
      },
      this
    );
    punch.on(
      "pointerup",
      () => {
        this.punch = false;
      },
      this
    );
  }
  moveEnemy(player, time) {
    // @ts-ignore
    if (this.key.A.isDown) {
      player.setVelocityX(-this.speed);
      player.anims.play("left", true);
      player.setFlipX(true);
      // @ts-ignore
    } else if (this.key.D.isDown) {
      player.setVelocityX(this.speed);
      player.anims.play("right", true);
      player.setFlipX(false);
    } else {
      player.setVelocityX(0);
      player.anims.play("turn");
    }
    // @ts-ignore
    if (this.key.W.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
    // @ts-ignore
    if (this.key.S.isDown) {
      player.setVelocityY(330);
    }
    //@ts-ignore
    if (this.key.E.isDown) {
      console.log("atak");
      player.anims.play("player-attack", true);
    } else {
      player.anims.play("turn");
    }
    // if (this.punch && time > this.lastFired) {
    //   const skill = this.skill.get(0, 0, "skill");
    //   if (skill) {
    //     skill.fire(this.player.x, this.player.y);
    //     this.lastFired = time + 500;
    //   }
    // }
  }
  movePlayer(player, time) {
    if (this.nav_left || this.cursor.left.isDown) {
      this.player.setVelocityX(this.speed * -1);
      this.player.anims.play("left", true);
      this.player.setFlipX(true);
    } else if (this.nav_right || this.cursor.right.isDown) {
      this.player.setVelocityX(this.speed);
      this.player.anims.play("right", true);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }
    if (this.cursor.up.isDown && player.body.touching.down) {
      this.player.setVelocityY(-330);
      this.player.anims.play("up", true);
    }
    if (this.cursor.down.isDown) {
      this.player.setVelocityY(330);
    }

    // if (this.punch) {
    //   this.player.anims.play("player-attack");
    // }

    if (this.punch && time > this.lastFired) {
      const skill = this.skill.get(0, 0, "skill");
      if (skill) {
        skill.fire(this.player.x, this.player.y);
        this.lastFired = time + 500;
      }
    }
  }
  // spawnSkill() {
  //   const config = {
  //     speed: 100,
  //     rotation: 0,
  //   };
  //   //@ts-ignore
  //   const skill = this.spawnSkill.get(0, 0, "skill", config);
  //   const positionX = Phaser.Math.Between(50, 350);
  //   if (skill) {
  //     skill.spawn(positionX);
  //   }
  // }

  // decreaseLife(lifeLabel, time) {
  //   if (this.spriteHit(true)) this.playerLabel.anims.play("life", true);
  // }
  createLabel() {
    // const playerLabel = this.add.image(100, 50, 'lifelabel').setScale(0.5)
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
  createSlash(x, y, frame, velocity, flip = false) {
    this.slash
      .setPosition(x, y)
      .setActive(true)
      .setVisible(true)
      .setFrame(frame)
      .setFlipX(flip)
      .setVelocityX(velocity);
  }
  spriteHit(slash, sprite) {
    slash.x = 0;
    slash.y = 0;
    slash.setActive(false);
    slash.setVisible(true);
    if (sprite.texture.key == "player") {
      sprite.anims.play("take-hit", true);
    } else {
      sprite.anims.play("take-hit", true);
    }
    this.time.delayedCall(500, () => {
      this.playerAttack = false;
    });
  }
}
