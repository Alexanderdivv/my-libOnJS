import Phaser from "phaser";

import FighterGameScene from "./scenes/FighterGameScene";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 590,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [FighterGameScene],
};

export default new Phaser.Game(config);
