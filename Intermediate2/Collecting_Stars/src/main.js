import Phaser from 'phaser'

// import HelloWorldScene from './scenes/HelloWorldScene'
import CollectingStartScene from './scenes/CollectingStartsScene'

const config = {
	type: Phaser.AUTO,
	width: 1920,
	height: 1080,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	// scene: [HelloWorldScene]
	scene: [CollectingStartScene]
}

export default new Phaser.Game(config)
