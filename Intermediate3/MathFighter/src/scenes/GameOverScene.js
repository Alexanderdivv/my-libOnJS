import Phaser from "phaser";
var replayButton;
export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("game-over-scene");
  }

  init(data) {
    this.score = data.score;
  }

  preload() {
    this.load.image("background", "images/bg_layer1.png");
    this.load.image("game-over-text", "images/gameover.png");
    this.load.image("replay-button", "images/replay.png");
    this.load.image("fight-bg", "images/fight-bg.png");
  }

  create() {
    this.add.image(230, 320, "background");
    this.add.image(240, 150, "fight-bg");
    this.add.image(230, 200, "game-over-text");

    this.replayButton = this.add
      .image(230, 530, "replay-button")
      .setInteractive();
    this.replayButton.once(
      "pointerup",
      () => {
        this.scene.start(`math-fighter-scene`);
      },
      this
    );

    this.add.text(60, 300, `SCORE:`, { fontSize: `60px`, color: `#000` });
    // menambahkan nilai score
    this.add.text(300, 300, this.score, { fontSize: `60px`, color: `#000` });
  }
}
