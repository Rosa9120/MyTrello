<script setup>

import { ref, onMounted } from 'vue'
import axios from 'axios'
import { defineEmits } from 'vue';
import { defineProps } from 'vue';

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
    })
    .then((response) => {
      nuevaColumna.value = response.data.columna
      console.log(nuevaColumna.value)
      newColumnText.value = ''
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
  
  