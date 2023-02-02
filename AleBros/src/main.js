import Phaser from "phaser";

// import AleBrosScene from "./scenes/AleBrosScene";
import AleBrosScene from "./scenes/RunPlatform";

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 300,
  // backgroundColor: "#fcba03",

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },

  scale: {
    // fit the game in the window
    mode: Phaser.Scale.FIT,
    // mode: Phaser.Scale.RESIZE,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    autoCenter: Phaser.Scale.NO_CENTER,
  },
  scene: [AleBrosScene],
};

export default new Phaser.Game(config);
