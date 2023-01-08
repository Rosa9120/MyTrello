<!-- Vista para cada tablero. Se accede con la url tablero/:id
      Props: el id del tablero determinado
      Funciones: 
      - updateColumns para añadir una columna al array de columnas.
      - updateColumnsDelete para actualizar las columnas haciendo una petición get a la api.<template>
      - onMounted para hacer una petición get a la api para obtener el nombre del tablero y las columnas que tiene. Además, comprueba si el tablero le pertenece a la sesión que está intentando acceder. Si no le pertenece, se redirige a la vista de sus tableros.
      Se recorre un for para mostrar las columnas que tiene el tablero. Al final se muestra una columna vacía para añadir una nueva columna. Cada columna puede emitir el evento deleteColumnEvent, que se recibe en el componente padre y se ejecuta la funcion updateColumnsDelete para actualizar las columnas. Por otro lado, la columna vacía puede emitir el evento addColumnEvent, que se recibe en el componente padre y se ejecuta la funcion updateColumns para añadir una columna al array de columnas.
      -->
<script setup>

import Columna from '/src/components/Columna.vue'
import ColumnaVacia from '/src/components/ColumnaVacia.vue'

import { useLoginStore } from '../stores/login';
import { onMounted, ref } from 'vue'
import axios from 'axios'
import router from '../router';

const columnas = ref([])
var nombre = ref('')
var user_id = ref('')

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const loginStore = useLoginStore()

const updateColumns = (columna) => {
  columnas.value.push(columna)
}

const updateColumnsDelete = () => {
  axios.get('http://localhost:3000/tableros/' + props.id + '/columnas', 
      {
          headers: {
          'Authorization': 'Bearer ' + loginStore.token
          }
        })
        .then((response) => {
        columnas.value = response.data.columnas
        })
        .catch((error) => {
        console.log(error)
        })
}

onMounted(async () => {

    await axios.get('http://localhost:3000/tableros/' + props.id, {
    headers: {
      'Authorization': 'Bearer ' + loginStore.token
    }
    })
    .then((response) => {
      nombre = response.data.tablero.nombre
      user_id.value = response.data.tablero.user_id

      axios.get('http://localhost:3000/tableros/' + props.id + '/columnas', 
      {
          headers: {
          'Authorization': 'Bearer ' + loginStore.token
          }
        })
        .then((response) => {
        columnas.value = response.data.columnas
        })
        .catch((error) => {
        console.log(error)
        })
    })
    .catch((error) => {
      console.log(error)
        if (error.response) {
          if (error.response.status == 403) {
            router.push('/')
          }
        // Request made and server responded
        } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        }
    })

})

</script>


<template>
<div>
  <h3 class="titulo"> Tablero {{ nombre }} </h3>

  <div class="layout">
    <div class="cuadro">
        <Columna v-for="columna in columnas" v-on:deleteColumnEvent="updateColumnsDelete"  :key="columna.id" :titulo="columna.titulo" :id="columna.id" :tableroId="props.id" />
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
