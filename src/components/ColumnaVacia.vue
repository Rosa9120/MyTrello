<!-- Componente que representa una columna vacía
      props: el id del tablero.
      Funciones: 
      - newColumn hace una petición post para crear una columna. Si se crea correctamente, se emite el evento newColumnEvent para que el tablero actualice sus columnas
      Eventos emitidos: 
      - newColumnEvent -->
<script setup>

import { ref, onMounted } from 'vue'
import axios from 'axios'
import { defineEmits } from 'vue';
import { defineProps } from 'vue';
import { useLoginStore } from '../stores/login';

const loginStore = useLoginStore()

const emits = defineEmits(['newColumnEvent'])

const props = defineProps({
  tableroId: {
    type: Number,
    required: true
  }
})

const newColumnText = ref('')
const nuevaColumna = ref(null)

const newColumn = (e) => {
  // Strip whitespace
  const text = newColumnText.value.trim()

  if (text) {
    // Create a new task
    axios.post('http://localhost:3000/tableros/' + props.tableroId + '/columnas', {
      titulo: text,
    },{
      headers: {
      'Authorization': 'Bearer ' + loginStore.token
      }})
    .then((response) => {
      nuevaColumna.value = response.data.columna
      console.log(nuevaColumna.value)
      newColumnText.value = ''
      // se emite un evento para que el tablero actualice sus columnas
      emits('newColumnEvent', nuevaColumna.value)
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

</script>

<template>
    <div class="columna">
      <div class="tarjetas">
        <!-- Una columna vacía se representa por un input de texto, tal y como se hace en trello -->
        <!-- Para hacer submit se debe dar a enter, como en Trello -->
        <b-form-input
            id="inline-form-input-name"
            class="mb-2 me-sm-2 mb-sm-0"
            placeholder="Añade una columna"
            debounce="500"  
            @keydown.enter="newColumn"
            v-model="newColumnText"
          ></b-form-input>
        </div>
    </div>
  </template>
  
  <style scoped>

  .columna{
      background-color: #EBECF0;
      width: 272px;
      min-width: 250px;
      display:flex;
      flex-flow: column;
  
      padding: 10px;
      margin-bottom: 8px;
  
      height: max-content;
  
      margin-left: 4px;
      margin-right: 4px;
      border-radius: 0.375rem;
  }
  
  </style>
  
  