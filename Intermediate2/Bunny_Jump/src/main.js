import Phaser from "phaser";

// Meeting 4
// import BunnyJumpScene from "./scenes/BunnyJumpScene";

// Meeting 5
// import BunnyJumpScene from "./scenes/BunnyJumpScene2";

// Meeting 6
import BunnyJumpScene from "./scenes/BunnyJumpScene3";

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
