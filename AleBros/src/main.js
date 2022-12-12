import Phaser from "phaser";

import AleBrosScene from "./scenes/AleBrosScene";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 300,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },

  scale: {
    // fit the game in the window
    // mode: Phaser.Scale.FIT,
    mode: Phaser.Scale.RESIZE,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    autoCenter: Phaser.Scale.NO_CENTER,
  },
  scene: [AleBrosScene],
};

export default new Phaser.Game(config);
