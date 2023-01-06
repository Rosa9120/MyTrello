<template>
  <div class="columna" :id="'columna-' + id" @dragenter="dragEnter" @dragover="dragOver" @dragleave="dragLeave" @drop="drop">
    <h4 class="titulo-columna" :id="'titulo-columna-' + id" style="pointer-events: none;">{{ titulo }}</h4>
    <div class="tarjetas" :id="'tarjetas-columna-' + id">
      <Tarjeta v-for="tarjeta in tarjetas" :key="tarjeta.id" :titulo="tarjeta.nombre" :descripcion="tarjeta.descripcion" :id="tarjeta.id" :columnaId="id"/>
      <TarjetaVacia v-on:newTaskEvent="updateTasks" :columnaId="id" :tableroId="tableroId"/>
    </div>
</div>
</template>

<style scoped>

  .titulo-columna{
    font-style: helvetica;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    width: 200px;
    color: #172b4d !important;
    text-align: center;
}

.columna{
    background-color: #EBECF0;
    width: 272px;
    display:flex;
    flex-flow: column;

    padding: 10px;
    margin-bottom: 8px;

    height: max-content;
    max-height: 80vh;
    margin-left: 4px;
    margin-right: 20px;
    border-radius: 0.375rem;
}


.tarjetas{
  overflow-x:hidden;
}

.drag-over {
  background-color: #ccc;
  border: 1px #172b4d dotted;
}

</style>

<script setup>
import Tarjeta from '/src/components/Tarjeta.vue'
import TarjetaVacia from '/src/components/TarjetaVacia.vue'

import { onMounted, ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  titulo: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  tableroId: {
    type: Number,
    required: true
  }
})

const parentColumna = ref(null)

const contadorElementos = ref(0)

const tarjetas = ref([])

const updateTasks = (tarjeta) => {
  tarjetas.value.push(tarjeta)
}

const dragEnter = (e) => {
  contadorElementos.value += 1
  e.preventDefault()
  // Check if the element is a column and it starts with 'columna-'
  if (e.target.id.startsWith('columna-')) {
    console.log("Entrando a " + e.target.id)
    e.target.classList.add('drag-over')
    parentColumna.value = e.target
  }
}

const dragOver = (e) => {
  e.preventDefault()
  if (e.target.id.startsWith('columna-')) {
    e.target.classList.add('drag-over')
    parentColumna.value = e.target
  }
}

const dragLeave = (e) => {
  setTimeout(() => {
    contadorElementos.value -= 1
    if (contadorElementos.value === 0 && e.target.id.startsWith('columna-')) {
      parentColumna.value = null
      e.target.classList.remove('drag-over')
    }
  }, 0)
}

const drop = (e) => {
  e.preventDefault()
  contadorElementos.value = 0
  parentColumna.value.classList.remove('drag-over')
  let id = e.dataTransfer.getData('text/plain')
  const draggedElement = document.getElementById(id)
  const lastElement = parentColumna.value.children[1].children[parentColumna.value.children[1].children.length - 1]
  parentColumna.value.children[1].insertBefore(draggedElement, lastElement)
  draggedElement.classList.remove('hide')
  const columna_id = id.split('-')[2]
  const tarjeta_id = id.split('-')[3]
  axios.patch('http://localhost:3000/tableros/' + props.tableroId + '/columnas/' + columna_id + '/tarjetas/' + tarjeta_id, {
    columna: props.id
  })
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(async () => {
  await axios.get('http://localhost:3000/tableros/' + props.tableroId + '/columnas/' + props.id + '/tarjetas')
    .then((response) => {
      console.log(response.data)
      tarjetas.value = response.data.tarjetas
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>