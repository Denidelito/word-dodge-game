import Phaser from 'phaser';
import { useGameStore } from '../../store/gameStore';

/**
 * Класс Player управляет спрайтом игрока, его перемещением по колонкам и обработкой столкновений с буквами.
 */
export default class Player {
    /** Спрайт игрока с динамическим физическим телом */
    private sprite: Phaser.Physics.Arcade.Sprite;

    /** Ширина одной колонки на экране */
    private columnWidth: number;

    /** Индекс текущей колонки, в которой находится игрок (от 0 до 11) */
    private currentColumn: number = 6;

    /** Флаг, указывающий, выполняется ли сейчас анимация перемещения */
    private isMoving: boolean = false;

    /** Ссылка на хранилище состояния игры */
    private gameStore = useGameStore();

    /**
     * Конструктор класса Player.
     * @param scene - Текущая сцена Phaser, в которую добавляется игрок.
     */
    constructor(scene: Phaser.Scene) {
        this.columnWidth = scene.scale.width / 12;

        // Создание спрайта игрока с физикой
        this.sprite = scene.physics.add.sprite(0, scene.scale.height - 100, '');
        this.sprite.setDisplaySize(80, 30).setTint(0x00ffcc);
        this.sprite.setCollideWorldBounds(true);

        // Установка начальной позиции игрока
        this.setPlayerToColumn(this.currentColumn, false);

        // Обработка нажатий клавиш для перемещения
        scene.input.keyboard?.on('keydown-A', () => this.movePlayer(-1));
        scene.input.keyboard?.on('keydown-D', () => this.movePlayer(1));
    }

    /**
     * Устанавливает позицию игрока на указанную колонку.
     * @param columnIndex - Индекс колонки (от 0 до 11).
     * @param animate - Флаг, указывающий, использовать ли анимацию при перемещении.
     */
    private setPlayerToColumn(columnIndex: number, animate: boolean = false): void {
        const x = (columnIndex + 0.5) * this.columnWidth;
        if (animate) {
            this.sprite.x = x;
        } else {
            this.sprite.setX(x);
        }
    }

    /**
     * Перемещает игрока влево или вправо на одну колонку.
     * @param direction - Направление перемещения: -1 для влево, 1 для вправо.
     */
    public movePlayer(direction: -1 | 1): void {
        if (this.isMoving) return;

        const newColumn = Phaser.Math.Clamp(this.currentColumn + direction, 0, 11);
        if (newColumn === this.currentColumn) return;

        this.currentColumn = newColumn;
        const targetX = (this.currentColumn + 0.5) * this.columnWidth;

        this.isMoving = true;
        this.sprite.x = targetX;
        this.isMoving = false;
    }

    /**
     * Обрабатывает столкновение игрока с буквой.
     * @param letter - Объект текста, представляющий букву.
     */
    public catchLetter(letter: Phaser.GameObjects.Text): void {
        const targetWord = this.gameStore.targetWord;
        const typedLetters = this.gameStore.typedLetters;

        if (targetWord[typedLetters.length] === letter.text) {
            this.gameStore.addLetter(letter.text);
        } else {
            this.gameStore.lives -= 1;
            if (this.gameStore.lives <= 0) {
                this.gameStore.endGame();
            }
        }

        letter.destroy();
    }

    /**
     * Возвращает спрайт игрока.
     * @returns Спрайт игрока.
     */
    public getSprite(): Phaser.Physics.Arcade.Sprite {
        return this.sprite;
    }
}
