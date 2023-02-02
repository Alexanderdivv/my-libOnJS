import Phaser from "phaser";

// import FighterGameScene from "./scenes/FighterGameScene2";
// import GameOverScene from "./scenes/GameOverScene";
// import StartScene from "./scenes/StartScene";
import MysteriousFighterScene from "./scenes/MysteriousFighterScene";

const config = {
  type: Phaser.AUTO,
  // width: 800,
  // height: 600,
  width: 480,
  height: 640,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  // scene: [StartScene, FighterGameScene, GameOverScene],
  scene: [MysteriousFighterScene],
};

export default new Phaser.Game(config);
