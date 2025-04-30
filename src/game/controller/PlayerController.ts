import Player from '../object/Player'
import Letter from '../object/Letter'

export default class PlayerController {
    private player: Player

    constructor(player: Player) {
        this.player = player
    }

    // Ловим букву
    catchLetter(letter: Letter) {
        this.player.catchLetter(letter)
    }

    // Проверка столкновения с буквой
    checkCollision(playerBounds: Phaser.Geom.Rectangle, letter: Letter): boolean {
        return Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, letter.getBounds())
    }
}
