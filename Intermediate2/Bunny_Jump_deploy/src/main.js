import Phaser from "phaser";

import { GangsterHunter } from "./scenes/GangsterHunter";
import StartScene from "./scenes/StartScene";
const config = {
  type: Phaser.AUTO,
  width: 770,
  height: 500,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [StartScene, GangsterHunter],
};

export default new Phaser.Game(config);
