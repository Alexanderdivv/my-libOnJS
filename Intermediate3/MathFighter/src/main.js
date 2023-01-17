import Phaser from "phaser";

// import MathFighterScene from "./scenes/MathFighterScene5";
// import GameOverScene from "./scenes/GameOverScene";
// import MathFighterScene from "./scenes/test";
// import MathFighterScene from "./scenes/MathWarScene";
import MathFighterScene from "./scenes/MathFighterTnA";
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
  scene: [MathFighterScene],
};

export default new Phaser.Game(config);
