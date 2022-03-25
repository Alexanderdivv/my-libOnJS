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
    // load nama pembuat
    this.load.image("createdby2", "images/michelle.png");
    this.load.image("createdby3", "images/clarissa.png");
    this.load.image("createdby1", "images/joshua.png");
    this.load.image("createdby4", "images/alex.png");
  }
  create() {
    this.add.image(240, 320, "background");
    this.add.image(280, 360, "game-over-text");
    this.add.image(280, 800, "createdby2").setScale(0.4);
    this.add.image(280, 830, "createdby3").setScale(0.4);
    this.add.image(280, 860, "createdby1").setScale(0.4);
    this.add.image(280, 890, "createdby4").setScale(0.4);

    this.replayButton = this.add
      .image(280, 520, "replay-button")
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
