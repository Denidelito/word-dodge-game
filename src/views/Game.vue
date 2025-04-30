<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Phaser from 'phaser'
import GameScene from '../game/GameScene'
import GameOverlay from "../components/GameOverlay.vue";

const gameContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (gameContainer.value) {
    new Phaser.Game({
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: gameContainer.value,
      backgroundColor: '#122334',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {
            y: 150,
            x: 0
          },
          debug: true,
        },
      },
      scene: [GameScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
      },
    })
  }
})
</script>

<template>
  <GameOverlay/>
  <div ref="gameContainer" class="game-container"></div>
</template>

<style scoped>
.game-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
