<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const tableros = ref([])

onMounted(async () => {
  await axios.get('http://localhost:3000/tableros/')    //EN EL FUTURO SERÁ USUARIO/TABLEROS PARA OBTENER LOS TABLEROS DEL USUARIO QUE HA INICIADO SEISON
    .then((response) => {
      tableros.value = response.data.tableros
    })
    .catch((error) => {
      console.log(error)
    })
})

</script>

<template>
    <div class="tableros">
      <b-card-group deck>
        <span v-for="tablero in tableros" :key="tablero.id"> 
          <div>
              <b-card
                img-src="https://picsum.photos/600/300/?image=25"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
              >
                <b-card-title> {{ tablero.nombre }} </b-card-title>
                <b-card-text>
                  Tablero creado por QUIEN SEA
                  o quiza la fecha de creacion
                  o quiza meterle descripcion al tablero
                  yo en la foto pondría la foto de background que tiene cada tablero. y si no tiene, pues un color aleatorio
                </b-card-text>

                <router-link :to="{ name: 'tablero', params: { id: tablero.id }}" custom v-slot="{ navigate }">
                  <b-button @click="navigate" role="link" variant="primary"> Ver tablero </b-button>
                </router-link>
              </b-card>
            </div>
          </span>
      </b-card-group>
    </div>
</template>


<style lang="scss">
.tableros{
    margin: 5vh;
}

</style>