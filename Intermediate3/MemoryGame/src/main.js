import Phaser from "phaser";

import MemoryGameScene from "./scenes/MemoryGameScenem8";
const config = {
  type: Phaser.AUTO,
  width: 720,
  height: 680,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [MemoryGameScene],
};

export default new Phaser.Game(config);
