import Phaser from "phaser";

import BunnyJumpScene from "./scenes/BunnyJumpScene";

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [BunnyJumpScene],
};

export default new Phaser.Game(config);
