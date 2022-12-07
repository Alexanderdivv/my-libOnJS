import Phaser from "phaser";

import BunnyJumpScene from "./scenes/BunnyJumpScene4";
import GameOverScene from "./scenes/GameOverScene";

const MAX_SIZE_WIDTH_SCREEN = 1920;
const MAX_SIZE_HEIGHT_SCREEN = 1080;
const MIN_SIZE_WIDTH_SCREEN = 270;
const MIN_SIZE_HEIGHT_SCREEN = 480;
const SIZE_WIDTH_SCREEN = 540;
const SIZE_HEIGHT_SCREEN = 960;

const config = {
  type: Phaser.AUTO,
  // width: 480,
  // height: 640,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  // make the game fullscreen
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: SIZE_WIDTH_SCREEN,
    height: SIZE_HEIGHT_SCREEN,
    maxWidth: MAX_SIZE_WIDTH_SCREEN,
    maxHeight: MAX_SIZE_HEIGHT_SCREEN,
    minWidth: MIN_SIZE_WIDTH_SCREEN,
    minHeight: MIN_SIZE_HEIGHT_SCREEN,
  },
  scene: [BunnyJumpScene, GameOverScene],
};

export default new Phaser.Game(config);
