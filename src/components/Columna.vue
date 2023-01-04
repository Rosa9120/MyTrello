<template>
  <div class="columna">
    <h4 class="titulo-columna">{{ titulo }}</h4>
    <div class="tarjetas">
      <Tarjeta v-for="tarjeta in tarjetas" :key="tarjeta.id" :titulo="tarjeta.nombre"/>
      <TarjetaVacia/>
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
    opacity: 0.6;
    width: 272px;
    display:flex;
    flex-flow: column;

    padding: 10px;
    margin-bottom: 8px;

    height: max-content;

    margin-left: 4px;
    margin-right: 4px;
    border-radius: 0.375rem;
}


.tarjetas{
  overflow-x:hidden;
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
    type: String,
    required: true
  }
})

const tarjetas = ref([])

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