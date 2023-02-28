import Phaser from "phaser";
export default class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }
  preload() {
    this.load.image("background", "images/823383.jpg");
    this.load.image("start-button", "images/start.png");
  }
  create() {
    this.add.image(400, 300, "background").setScale(0.6);
    this.add.image(400, 300, "background").setScale(0.278).setAlpha(0.5);
    // this.add.image(390, 350, "startButton").setScale(0.55);
    // blur the background
    this.startButton = this.add
      .image(390, 350, "start-button")
      .setScale(0.55)
      .setInteractive();
    this.startButton.once("pointerup", () => {
      this.scene.start("gangster-hunter-scene");
    });
  }
}
