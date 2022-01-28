import Phaser from "phaser";
var platforms
var player
export default class CollectingStartScene extends Phaser.Scene{
    constructor(){
        super(`collecting-starts-scene`)
    }
    preload(){
        this.load.image(`ground`, 'images/platform.png')
        this.load.image(`sky`, `images/sky.png`)
        this.load.image(`star`, `images/star.png`)
        this.load.image(`bomb`, `images/bomb.png`)
        this.load.spritesheet(`dude`, `images/dude.png`, {
            frameWidth: 32, frameHeight:48
        })
    }
    create(){
        this.add.image(400, 300, `sky`)
        // this.add.image(400, 300, `star`)
        platforms = this.physics.add.staticGroup()
        platforms.create(600, 400, `ground`)
        platforms.create(80, 100, `ground`)
        platforms.create(50, 300, `ground`)
        platforms.create(750, 220, `ground`)
        platforms.create(400, 568, `ground`).setScale(2).refreshBody()

        player = this.physics.add.sprite(100, 450, `dude`)
        player.setCollideWorldBounds(true)
        player.setBounce(0.2)

        // animasi dude berjalan ke kiri
        this.anims.create({
            key: `left`, //nama animasi'
            frames: this.anims.generateFrameNumbers(`dude`, {
                start: 0, end: 3
            }), //frame yang digunakan 
            frameRate: 10,
            repeat: -1
        })
        // animasi menghadap ke depan
        this.anims.create({
            key:`turn`,
            frames:[{ key: `dude`, frame: 4}], //satu frame saja
            frameRate: 20
        })

        // animasi berjalan ke kanan
        this.anims.create({
            key: `right`,
            frames:this.anims.generateFrameNumbers(`dude`, { start: 5, end: 8}),
            frameRate: 10,
            repeat: -1 //mengulangu animasi (loop)
        })
    }
}