<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const tableros = ref([])

onMounted(async () => {
  await axios.get('http://localhost:3000/tableros/')    //EN EL FUTURO SERÁ USUARIO/TABLEROS PARA OBTENER LOS TABLEROS DEL USUARIO QUE HA INICIADO SEISON
    .then((response) => {
      tableros.value = response.data.tableros
    })
    .catch((error) => {
      console.log(error)
    })
})

</script>

<template>
    <div class="tableros">
        <li v-for="tablero in tableros" :key="tablero.id" :nombreTablero="tablero.nombre"> {{ tablero.nombre }}</li>
    </div>
</template>


