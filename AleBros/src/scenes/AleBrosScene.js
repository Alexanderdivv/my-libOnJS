import Phaser from "phaser";
export default class AleBrosScene extends Phaser.Scene {
  constructor() {
    super("ale-bros-scene");
  }

  init() {}

  preload() {
    this.load.image("background", "images/sky.png");
  }

  create() {
    this.add.image(400, 300, "background").setScale(2);
  }

  update() {}
}
