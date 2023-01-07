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

const updateColumns = (columna) => {
  columnas.value.push(columna)
}

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
<div>
  <h3 class="titulo"> Tablero {{ nombre }} </h3>

  <div class="layout">
    <div class="cuadro">
        <Columna v-for="columna in columnas" :key="columna.id" :titulo="columna.titulo" :id="columna.id" :tableroId="props.id" />
        <ColumnaVacia v-on:newColumnEvent="updateColumns" :tableroId="props.id"/>
    </div>
  </div>
</div>
</template>

<style>

html,body{
    height:100%;
    width: 100vw;
    max-width: 100vw;
    margin:0;
    padding:0;
    overflow-x:clip;
}

#app{
    height:100%;
    width: 100vw;
    max-width: 100vw;
    margin:0;
    padding:0;
    display:flex;
    flex-flow: column;
    background-color: whitesmoke;

}

.cuadro{
    background-color: whitesmoke;
    display:flex;
    flex-flow: row;
    margin: 0px 12px 0px 12px;
}

.cuadro h1{
  text-align: center;
}

.titulo{
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
}

.layout{
    display:flex;
    flex-flow: column wrap;
    align-items:start;
    height:100%;
    width: 100% !important;
    overflow-x:auto;
}

</style>
