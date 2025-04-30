import Phaser from 'phaser'

export default class Letter extends Phaser.GameObjects.Text {
    public speed: number
    private gameScene: Phaser.Scene

    constructor(scene: Phaser.Scene, x: number, y: number, letter: string) {
        super(scene, x, y, letter, {
            fontFamily: 'monospace',
            fontSize: '160px',
            color: '#ffffff',
        })

        this.gameScene = scene
        this.setOrigin(0.5)
        this.speed = 120
        scene.add.existing(this)
    }

    // Метод для обновления позиции
    update(delta: number) {
        this.y += (this.speed * delta) / 1000

        // Убираем букву, если она вышла за пределы экрана
        if (this.y > this.gameScene.scale.height + 50) {
            this.destroy()
        }
    }

    // Проверка на столкновение с объектом игрока
    checkCollision(playerBounds: Phaser.Geom.Rectangle) {
        return Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, this.getBounds())
    }
}
