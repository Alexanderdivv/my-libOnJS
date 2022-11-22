import Phaser, { RIGHT, Tilemaps } from "phaser";
import Skill from "../ui/Skill";
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
    this.key = undefined;
    this.skill = undefined;
    this.lastFired = 10;
  }
  preload() {
    this.load.spritesheet("player", "images/spritebg.png", {
      frameHeight: 67.3,
      frameWidth: 35,
    });
    this.load.image("background", "images/Combined.png");
    this.load.image("skill", "images/skill.png");
    this.load.image("platform", "images/platform3.png");
    this.load.image("punch", "images/punch2.png");
    this.load.image("left_btn", "images/left_btn.png");
    this.load.image("right_btn", "images/right_btn.png");
    this.load.spritesheet("lifelabel", "images/lifebar.png", {
      frameHeight: 96.5,
      frameWidth: 431,
    });
    this.load.image("bush", "images/forest.png");
    // test animation
    this.load.spritesheet("attack2", "images/attack.png", {
      frameHeight: 69,
      frameWidth: 53,
    });
  }
  create() {
    // background
    this.add.image(400, 200, "background").setScale(0.6);
    // platrform
    this.platform = this.physics.add.staticGroup();
    this.platform
      .create(400, 415, "platform")
      .setScale(0.6)
      .refreshBody()
      .setVisible(false);

    // player and enemy
    this.player = this.createPlayer();
    this.enemy = this.createPlayer();
    this.enemy.setFlipX(true);
    this.enemy.setPosition(630, 300);
    this.enemy.setTint(0xff0000).setAlpha(0.8);

    // tambahin mist
    this.createButton();
    this.cursor = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, this.platform);
    this.physics.add.collider(this.enemy, this.platform);
    this.physics.add.overlap(
      this.player,
      this.enemy,
      this.hitEnemy(),
      null,
      this
    );
    this.skill = this.physics.add.group({
      classType: Skill,
      maxSize: 10,
      runChildUpdate: true,
    });
    this.physics.add.overlap(
      this.skill,
      this.enemy,
      this.hitEnemy(),
      null,
      this
    );
    this.playerLabel = this.createLabel();
    // make playerlabel stay on top
    // gravity is set to 0
    this.playerLabel.body.setAllowGravity(false);
    this.key = this.input.keyboard.addKeys("W, A, S, D");
    // enemy label
    this.enemyLabel = this.createLabel();
    this.enemyLabel.body.setAllowGravity(false);
    this.enemyLabel.setPosition(630, 50);
  }

  update(time) {
    this.movePlayer(this.player, time);
    this.moveEnemy(this.enemy, time);
  }

  createButton() {
    this.input.addPointer(5);

    let punch = this.add
      .image(660, 500, "punch")
      .setInteractive()
      .setDepth(0.5)
      .setAlpha(0.83)
      .setScale(0.3);

    let nav_left = this.add
      .image(50, 500, "left_btn")
      .setInteractive()
      .setDepth(0.5)
      .setAlpha(0.95);

    let nav_right = this.add
      .image(nav_left.x + nav_left.displayWidth + 10, 500, "right_btn")
      .setInteractive()
      .setDepth(0.5)
      .setAlpha(0.95);
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

    if (this.punch && time > this.lastFired) {
      const skill = this.skill.get(0, 0, "skill");
      if (skill) {
        skill.fire(this.player.x, this.player.y);
        this.lastFired = time + 500;
      }
    }
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
      // jump animation
    }
    if (this.cursor.down.isDown) {
      this.player.setVelocityY(330);
    }

    if (this.punch && time > this.lastFired) {
      // play animation attack, and play slowmo
      this.player.anims.play("attack", true);
      this.time.delayedCall(1000, () => {
        this.player.anims.play("turn", true);
      });
    }

    if (this.punch && time > this.lastFired) {
      const skill = this.skill.get(0, 0, "skill");
      if (skill) {
        skill.fire(this.player.x, this.player.y);
        this.lastFired = time + 500;
      }
    }
  }

  createPlayer() {
    const player = this.physics.add.sprite(100, 285, "player");
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
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // attack animation
    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("attack2", {
        start: 0,
        end: 5,
      }),
      // make animation slow in each frame
      frameRate: 1,
      // repeat animation
      repeat: 0,
    });

    return player;
  }

  hitEnemy(skill, enemy) {
    this.enemyLife--;
  }

  decreaseLife(lifeLabel, time) {
    if (this.hitEnemy(true)) this.playerLabel.anims.play("life", true);
  }

  spawnSkill() {
    const config = {
      speed: 100,
      rotation: 0,
    };
    //@ts-ignore
    const skill = this.spawnSkill.get(0, 0, "skill", config);
    const positionX = Phaser.Math.Between(50, 350);
    if (skill) {
      skill.spawn(positionX);
    }
  }

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
}
