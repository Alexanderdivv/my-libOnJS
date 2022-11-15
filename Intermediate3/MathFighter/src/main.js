import Phaser from "phaser";

import MathFighterScene from "./scenes/MathFighterScene3";
import GameOverScene from "./scenes/GameOverScene";
// import MathFighterScene from "./scenes/test";

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
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [MathFighterScene, GameOverScene],
};

export default new Phaser.Game(config);
