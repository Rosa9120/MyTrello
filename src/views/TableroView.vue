<script setup>

import Columna from '/src/components/Columna.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const columnas = ref([])
var nombre = ref('')
var user_id = ref('')

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

onMounted(async () => {

    await axios.get('http://localhost:3000/tableros/' + props.id)
    .then((response) => {
      nombre = response.data.tablero.nombre
      user_id.value = response.data.tablero.user_id

      axios.get('http://localhost:3000/tableros/' + props.id + '/columnas')
        .then((response) => {
        columnas.value = response.data.columnas
        })
        .catch((error) => {
        console.log(error)
        })
    })
    .catch((error) => {
      console.log(error)
    })

})

</script>


<template>
<div class="cuadro">
    <h1 class="green">{{ nombre }} </h1>
    <Columna v-for="columna in columnas" :key="columna.id" :titulo="columna.titulo" :id="columna.id" :tableroId="props.id" />
</div>
</template>

<style>

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
