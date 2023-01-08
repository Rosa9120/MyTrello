<!-- Componente para definir una tarjeta vacía. Se ve como un input de texto, y cuando se presiona    enter se guarda la tarjeta nueva.
    Props: tableroId, columnaId
    Eventos emitidos: 
    - newTaskEvent para que la columna sepa que se creó una nueva tarjeta y se actualice la lista de tarjetas
    Funciones: 
    - newTask: crea la tarjeta en la base de datos con una petición post y emite el evento newTaskEvent con la tarjeta creada
      -->

<script setup>

import { ref, onMounted } from 'vue'
import axios from 'axios'
import { defineEmits } from 'vue';
import { defineProps } from 'vue';
import { useLoginStore } from '../stores/login';

const loginStore = useLoginStore()

const emits = defineEmits(['newTaskEvent'])

const props = defineProps({
  tableroId: {
    type: Number,
    required: true
  },
  columnaId: {
    type: Number,
    required: true
  }
})

const newTaskText = ref('')
const nuevaTarjeta = ref(null)

const newTask = (e) => {
  // Strip whitespace
  const text = newTaskText.value.trim()

  if (text) {
    // Create a new task
    axios.post('http://localhost:3000/tableros/' + props.tableroId + '/columnas/' + props.columnaId + '/tarjetas', {
      nombre: text,
      idtablero: props.tableroId,
      idcolumna: props.columnaId
    },{
      headers: {
      'Authorization': 'Bearer ' + loginStore.token
      }
    })
    .then((response) => {
      nuevaTarjeta.value = response.data.tarjeta
      console.log(nuevaTarjeta.value)
      newTaskText.value = ''
      emits('newTaskEvent', nuevaTarjeta.value)
    })
    .catch((error) => {
      console.log(error)
    })
  }
}
</script>

<template>
  <div class="cuadro-tarjeta"> 
    <!-- al igual que las columnas, las tarjetas son representadas por un input de texto y cuando se presiona a enter, se guarda el texto escrito -->
    <b-form-input
        :id="'inline-form-input-name-' + columnaId"
        class="mb-2 me-sm-2 mb-sm-0"
        placeholder="Añade una tarjeta"
        debounce="500" 
        @keydown.enter="newTask"
        v-model="newTaskText"
    ></b-form-input>
  </div>

</template>

<style scoped>
  .cuadro-tarjeta{
    min-width:250px;
  }
</style>


