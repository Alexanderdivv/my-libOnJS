// import Phaser from "phaser";

// import { GangsterHunter } from "./scenes/GangsterHunter";
// import StartScene from "./scenes/StartScene";
// const config = {
//   type: Phaser.AUTO,
//   width: 770,
//   height: 500,
//   physics: {
//     default: "arcade",
//     arcade: {
//       gravity: { y: 200 },
//     },
//   },
//   scene: [StartScene, GangsterHunter],
// };

// export default new Phaser.Game(config);

// ARthur
import Phaser from "phaser";

// import DungeonAdventureScene from "./scenes/DungeonAdventureScene";
// import BunnyJumpScene from "./scenes/BunnyJumpScene4";
import GameScene from "./scenes/GameScene";

const config = {
  type: Phaser.AUTO,
  // dungeon
  // width: 720,
  // height: 480,
  // bunny
  width: 480,
  height: 640,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 },
    },
  },
  scene: [GameScene],
};

export default new Phaser.Game(config);
