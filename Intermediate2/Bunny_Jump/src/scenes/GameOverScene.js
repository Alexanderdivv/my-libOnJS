import Phaser from "phaser";

var replayButton;
export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("game-over-scene");
  }
  preload() {
    this.load.image("background", "images/bg_layer1.png");
    //   load iamge teks game over disini
    this.load.image("game-over-text", "images/gameover.png");
    // load iamge tombol replay disini
    this.load.image("replay-button", "images/replay.png");
  }
  create() {
    this.add.image(240, 320, "background");
    this.add.image(240, 280, "game-over-text");
    this.replayButton = this.add
      .image(240, 420, "replay-button")
      .setInteractive();
    // berpindah ke bunny jum scene ketika button di klik
    this.replayButton.once(
      "pointerup",
      () => {
        this.scene.start("bunny-jump-scene");
      },
      this
    );
  }
}
