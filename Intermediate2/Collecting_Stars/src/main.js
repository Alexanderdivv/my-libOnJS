import Phaser from "phaser";
// import HelloWorldScene from './scenes/HelloWorldScene'
// import CollectingStartScene from "./scenes/CollectingStartsScene";
import CollectingStarScene from "./scenes/CollectingStartsSceneArka";

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
  // scene: [HelloWorldScene]
  scene: [CollectingStarScene],
};

export default new Phaser.Game(config);
