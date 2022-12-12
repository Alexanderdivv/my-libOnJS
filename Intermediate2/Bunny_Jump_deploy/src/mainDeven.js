import Phaser from "phaser";

import KnightOfWarScene from "./scenes/KnightOfWarScene";

const config = {
  type: Phaser.AUTO,
  width: 865,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [KnightOfWarScene],
};

export default new Phaser.Game(config);
