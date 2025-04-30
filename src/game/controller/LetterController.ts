import Letter from '../object/Letter'

export default class LetterController {
    private lettersGroup: Phaser.GameObjects.Group
    private columnWidth: number
    private scene: Phaser.Scene

    constructor(scene: Phaser.Scene, lettersGroup: Phaser.GameObjects.Group, columnWidth: number) {
        this.scene = scene
        this.lettersGroup = lettersGroup
        this.columnWidth = columnWidth
    }

    // Спавним букву
    spawnLetter(): void {
        const colIndex = Phaser.Math.Between(0, 11)
        const x = (colIndex + 0.5) * this.columnWidth
        const y = -50
        const char = this.getRandomLetter()

        // Создаем объект буквы
        const letter = new Letter(this.scene, x, y, char)

        // Добавляем кастомную скорость
        letter.speed = 120

        // Анимация появления
        letter.setAlpha(0)
        this.scene.tweens.add({
            targets: letter,
            alpha: 1,
            duration: 300,
            ease: 'Linear',
        })

        this.lettersGroup.add(letter)
    }

    // Получаем случайную букву
    private getRandomLetter(): string {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        return letters[Phaser.Math.Between(0, letters.length - 1)]
    }

    // Обновляем все буквы
    updateLetters(delta: number): void {
        this.lettersGroup.getChildren().forEach((obj) => {
            const letter = obj as Letter
            letter.update(delta)

            // Удаляем букву, если она вышла за пределы экрана
            if (letter.y > this.scene.scale.height + 50) {
                letter.destroy()
            }
        })
    }
}
