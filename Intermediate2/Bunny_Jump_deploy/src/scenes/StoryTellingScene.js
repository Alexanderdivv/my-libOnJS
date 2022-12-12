// scene for story telling
class StoryTellingScene extends Phaser.Scene {
  constructor() {
    super("StoryTellingScene");
  }
  preload() {
    this.load.image("story", "images/823383.png");
  }
  create() {
    this.add.image(400, 300, "story");
    this.input.keyboard.on("keydown", () => {
      this.scene.start("KnightOfWarScene");
    });
  }
}
