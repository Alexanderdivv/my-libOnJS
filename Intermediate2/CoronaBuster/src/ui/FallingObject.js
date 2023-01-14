import Phaser from "phaser";
export default class FallingObject extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, config) {
    super(scene, x, y, texture);

    this.scene = scene;
    this.speed = config.speed;
    this.rotationVal = config.rotation;
  }
  // constructor(scene, x, y, texture, configSpeed, configRotation) {
  //   super(scene, x, y, texture);
  //   this.scene = scene;
  //   this.speed = configSpeed;
  //   this.rotationVal = configRotation;
  // }
  // memunculkan objek enemy
  spawn(x) {
    // const positionY = Phaser.Math.Between(-50, -70);
    this.setPosition(x, -10);

    this.setActive(true);
    this.setVisible(true);
  }
  // menghancurkan objek enemy
  die() {
    this.destroy();
  }

  update(time) {
    this.setVelocityY(this.speed);
    this.rotation += this.rotationVal;
    const gameHeight = this.scene.scale.height;

    if (this.y > gameHeight + 5) {
      this.die();
    }
  }
}
