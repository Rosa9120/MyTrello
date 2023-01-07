<template>
  <div class="columna" :id="'columna-' + id" @dragenter="dragEnter" @dragover="dragOver" @dragleave="dragLeave" @drop="drop">
    <div class="header-columna">
      <h4 class="titulo-columna" :id="'titulo-columna-' + id" style="pointer-events: none;">
        {{ titulo }}
      </h4>
      <button class="botonBorrar" type="button" @click.prevent="borrarColumna(id)" > 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
        <!-- EL QUE MÁS TE GUSTE -->
        <!-- MÁS AQUÍ: https://icons.getbootstrap.com/ -->
        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg> -->

      </button>
    </div>
    
    
    <div class="tarjetas" :id="'tarjetas-columna-' + id">
      <Tarjeta v-for="tarjeta in tarjetas" :key="tarjeta.id" :titulo="tarjeta.nombre" :fechaVencimiento="tarjeta.fechaVencimiento" :descripcion="tarjeta.descripcion" :id="tarjeta.id" :columnaId="id" :tableroId="tableroId"/>
      <TarjetaVacia v-on:newTaskEvent="updateTasks" :columnaId="id" :tableroId="tableroId"/>
    </div>
</div>
</template>


<script setup>
import Tarjeta from '/src/components/Tarjeta.vue'
import TarjetaVacia from '/src/components/TarjetaVacia.vue'

import { onMounted, ref } from 'vue'
import axios from 'axios'
import router from '../router';
import { useLoginStore } from '../stores/login';

const loginStore = useLoginStore()

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

const borrarColumna = async(id) =>{
  await axios.delete('http://localhost:3000/tableros/' + props.tableroId + '/columnas/' + id,{
    headers: {
      'Authorization': 'Bearer ' + loginStore.token
    }
  })
  .then(async (response) => {
      await axios.get('http://localhost:3000/tableros/' + props.tableroId + '/columnas/')   
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

</script>




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

.botonBorrar{
  background-color: #EBECF0;
  border: none;
  margin:0px;
  padding: 0px;

    line-height: 20px;
}

.header-columna{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

</style>