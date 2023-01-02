<template>
  <div class="cuadro">
    <h1 class="green">{{ nombreTablero }}</h1>
    <Columna v-for="columna in columnas" :key="columna.id" :msg="columna.titulo" :id="columna.id" />
  </div>
</template>


<script setup>
import Columna from '/src/components/Columna.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'

defineProps({
  nombreTablero: {
    type: String,
    required: true
  }
})

const columnas = ref([])

onMounted(async () => {
  await axios.get('http://localhost:3000/tableros/1/columnas')
    .then((response) => {
      columnas.value = response.data.columnas
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

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
