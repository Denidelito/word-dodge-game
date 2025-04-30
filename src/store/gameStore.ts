import { defineStore } from 'pinia'

export interface GameState {
    score: number
    lives: number
    timer: number
    level: number
    targetWord: string
    typedLetters: string[]
    gameStarted: boolean
    gameOver: boolean
}

export const useGameStore = defineStore('game', {
    state: (): GameState => ({
        score: 0,
        lives: 3,
        timer: 60,
        level: 1,
        targetWord: '',
        typedLetters: [],
        gameStarted: false,
        gameOver: false,
    }),

    actions: {
        startGame(word: string) {
            this.score = 0
            this.lives = 3
            this.timer = 60
            this.level = 1
            this.targetWord = word.toUpperCase()
            this.typedLetters = []
            this.gameStarted = true
            this.gameOver = false
        },

        addLetter(letter: string) {
            const nextIndex = this.typedLetters.length
            if (this.targetWord[nextIndex] === letter.toUpperCase()) {
                this.typedLetters.push(letter.toUpperCase())
                if (this.typedLetters.join('') === this.targetWord) {
                    this.score += 100
                    this.level += 1
                    this.nextWord()
                }
            } else {
                this.lives -= 1
                if (this.lives <= 0) this.endGame()
            }
        },

        nextWord() {
            const mockWords = ['VUE', 'PHASER', 'PINIA', 'TYPESCRIPT', 'JAVASCRIPT', 'HTML', 'CSS']
            const newWord = mockWords[Math.floor(Math.random() * mockWords.length)]
            this.targetWord = newWord
            this.typedLetters = []

            // Уменьшаем время с каждым уровнем
            this.timer = 60 - (this.level * 2)
            if (this.timer < 10) this.timer = 10 // Минимальное время на уровень
        },

        decrementTimer() {
            if (this.timer > 0) {
                this.timer -= 1
            } else {
                this.endGame()
            }
        },

        endGame() {
            this.gameOver = true
            this.gameStarted = false
        },
    },
})
