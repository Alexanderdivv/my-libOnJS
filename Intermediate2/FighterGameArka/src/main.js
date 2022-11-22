import Phaser from "phaser";

import FighterGameScene from "./scenes/FighterGameScene2";
import GameOverScene from "./scenes/GameOverScene";
import StartScene from "./scenes/StartScene";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
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
  scene: [StartScene, FighterGameScene, GameOverScene],
};

export default new Phaser.Game(config);
