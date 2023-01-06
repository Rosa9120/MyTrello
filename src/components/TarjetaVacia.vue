
<script setup>

import { ref, onMounted } from 'vue'
import axios from 'axios'
import { defineEmits } from 'vue';
import { defineProps } from 'vue';

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


