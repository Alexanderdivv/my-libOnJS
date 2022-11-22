import Phaser from "phaser";
export default class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }
  preload() {
    this.load.image("background", "images/city3.png");
    this.load.image("start-button", "images/start_button2.png");
    this.load.image("logo", "images/logo.png");
    this.load.image("imageBy", "images/byArka.png");
  }
  create() {
    this.add.image(400, 300, "background").setScale(0.6).setAlpha(0.5);
    // blur the background

    this.add.image(400, 200, "logo").setScale(0.5).setAlpha(0.9);
    this.add.image(400, 250, "imageBy").setScale(0.5).setAlpha(0.9);
    this.startButton = this.add
      .image(400, 350, "start-button")
      .setScale(0.2)
      .setInteractive();
    this.startButton.once("pointerup", () => {
      this.scene.start(`FighterGameScene2`);
    });
  }
}
