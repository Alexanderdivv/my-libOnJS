import Phaser from "phaser";

// Meeting8
// import CoronaBusterScene from "./scenes/CoronaBusterScene";

// Meeting 9
// import CoronaBusterScene from "./scenes/CoronaBusterScene2";

// Meeting 10
// import CoronaBusterScene from "./scenes/CoronaBusterScene3";

// Meeting 11
// import CoronaBusterScene from "./scenes/CoronaBusterScene4";

// Meeting 12
import CoronaBusterScene from "./scenes/CoronaBusterScene5";

// Meeting 13
// import CoronaBusterScene from "./scenes/CoronaBusterScene6";
// import GameOverScene from "./scenes/GameOverScene";

// Meeting 14
// import CoronaBusterScene from "./scenes/CoronaBusterScene7";
// import GameOverScene from "./scenes/GameOverScene";

// update enemy collaps saat bersentuhan dengan bottom frame
// import CoronaBusterScene from "./scenes/CoronaBusterSceneUpdate";
// import GameOverScene from "./scenes/GameOverScene";

// Ayudia Checkpoint
// import CoronaBusterScene from "./scenes/CoronaBusterAyudia";

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
