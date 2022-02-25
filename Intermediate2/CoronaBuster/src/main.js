import Phaser from "phaser";

// Meeting8
// import CoronaBusterScene from "./scenes/CoronaBusterScene";

// Meeting 9
// import CoronaBusterScene from "./scenes/CoronaBusterScene2";

// Meeting 10
import CoronaBusterScene from "./scenes/CoronaBusterScene3";

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 620,
  physics: {
    default: "arcade",
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [CoronaBusterScene],
};

export default new Phaser.Game(config);
