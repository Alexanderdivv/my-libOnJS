import Phaser from "phaser";
var replayButton;
export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  init(data) {
    this.score = data.score;
  }

  preload() {
    this.load.image("background", "images/city3.png");
    this.load.image("game-over-text", "images/gameover.png");
    this.load.image("replay-button", "images/replay.png");
  }

  create() {
    this.add.image(400, 300, "background").setScale(0.6);
    // blur the background
    this.cameras.main.setAlpha(0.5);

    this.add.image(400, 250, "game-over-text").setScale(0.5);

    this.replayButton = this.add
      .image(400, 350, "replay-button")
      .setScale(0.5)
      .setInteractive();
    this.replayButton.once(
      "pointerup",
      () => {
        this.scene.start(`FighterGameScene2`);
      },
      this
    );
  }
}
