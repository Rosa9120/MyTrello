<script setup>

import Columna from '/src/components/Columna.vue'
import ColumnaVacia from '/src/components/ColumnaVacia.vue'

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

<h3 class="titulo"> Tablero {{ nombre }} </h3>
<div class="cuadro">
    <Columna v-for="columna in columnas" :key="columna.id" :titulo="columna.titulo" :id="columna.id" :tableroId="props.id" />
    <ColumnaVacia/>
</div>
</template>

<style>

html,body{
    height:100%;
    margin:0;
    padding:0;
}

#app{
    height:100%;
    display:flex;
    flex-flow: column;
    background-color: whitesmoke;
}

.cuadro{
    background-color: whitesmoke;
    display:flex;
    flex-flow: row;
    flex-grow: 1;
}

.cuadro h1{
  text-align: center;
}

</style>
