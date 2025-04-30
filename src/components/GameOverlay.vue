<script lang="ts" setup>
import { useGameStore } from '../store/gameStore'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()
const { score, level, lives, timer, targetWord, typedLetters, gameOver, gameStarted } = storeToRefs(gameStore)

const restart = () => {
  gameStore.startGame('VUE')
}

if (!gameStarted) {
  gameStore.startGame('VUE')
}
</script>

<template>
  <div class="overlay">
    <div class="stats">
      <p>Счёт: {{ score }}</p>
      <p>Уровень: {{ level }}</p>
      <p>Жизни: {{ lives }}</p>
      <p>Время: {{ timer }} сек</p>
    </div>

    <div class="word">
      <span
          v-for="(letter, index) in targetWord"
          :key="index"
          :class="{ typed: typedLetters[index] === letter }"
      >
        {{ typedLetters[index] || '_' }}
      </span>
    </div>

    <div class="next-letter">
      <p>Следующая буква: {{ targetWord[typedLetters.length] || '' }}</p>
    </div>

    <div v-if="gameOver" class="game-over">
      <p>Игра окончена 😢</p>
      <button @click="restart">Начать заново</button>
    </div>
  </div>
</template>


<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: white;
  padding: 1rem;
  font-family: 'Courier New', monospace;
  user-select: none;
  z-index: 10;
}

.stats {
  display: flex;
  gap: 1rem;
  font-size: 1.2rem;
}

.word {
  margin-top: 1rem;
  font-size: 2rem;
  letter-spacing: 0.2rem;
}

.word span {
  padding: 0 0.3rem;
  transition: color 0.2s;
}

.word span.typed {
  color: #00ff66;
}

.next-letter {
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff6347;
}

.game-over {
  margin-top: 2rem;
  font-size: 1.5rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 1rem;
  border-radius: 8px;
}
</style>
