import Phaser from 'phaser'
import { useGameStore } from '../store/gameStore'
import Player from './object/Player'
import PlayerController from './controller/PlayerController'
import LetterController from './controller/LetterController'
import Letter from './object/Letter'

export default class GameScene extends Phaser.Scene {
    private lettersGroup!: Phaser.GameObjects.Group
    private spawnTimer = 0
    private spawnInterval = 1000

    private player!: Player
    private columnWidth!: number

    private gameStore = useGameStore()

    private playerController!: PlayerController
    private letterController!: LetterController

    constructor() {
        super('GameScene')
    }

    create() {
        this.columnWidth = this.scale.width / 12
        this.spawnInterval = Math.max(300, 1000 - this.gameStore.level * 100)

        this.player = new Player(this)
        this.lettersGroup = this.add.group()

        this.playerController = new PlayerController(this.player)
        this.letterController = new LetterController(this, this.lettersGroup, this.columnWidth)
    }

    update(_time: number, delta: number) {
        this.spawnTimer += delta
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnTimer = 0
            this.letterController.spawnLetter()
        }

        this.letterController.updateLetters(delta)

        this.lettersGroup.getChildren().forEach((obj) => {
            const letter = obj as Letter

            if (this.playerController.checkCollision(this.player.getSprite().getBounds(), letter)) {
                this.playerController.catchLetter(letter)
                this.lettersGroup.remove(letter, true, true)
            }
        })
    }
}
