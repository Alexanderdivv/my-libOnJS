import Phaser from "phaser";

import HelloWorldScene from "./scenes/HelloWorldScene";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
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
  scene: [HelloWorldScene],
};

export default new Phaser.Game(config);
