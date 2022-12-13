<script setup>
import columna from './columna.vue'
defineProps({
  nombreTablero: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="cuadro">
    <h1 class="green">{{ nombreTablero }}</h1>
    <columna msg="TO DO" />
      <columna msg="TO DO" />
      <columna msg="TO DO" />
      <columna msg="TO DO" />
      <columna msg="TO DO" />
      <columna msg="TO DO" />

  </div>
</template>

<style scoped>


.cuadro{
    background-color: whitesmoke;
    display:flex;
    flex-flow: row;
    margin-top: 5vh;
    height: 95vh;
}

.cuadro h1{
  text-align: center;
}

</style>
