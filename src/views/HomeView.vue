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
      <div class="crud"> 
        <div></div>
        <div class="buscador"> 
          <b-form-input lass="mr-sm-2" style="width:40%" placeholder="Nombre del tablero"></b-form-input>
          <b-button class="my-2 my-sm-0" type="submit">Buscar</b-button>
        </div>
        <b-button class="my-2 my-sm-0" variant="success" data-bs-toggle="modal" data-bs-target="#exampleModal">Crear un tablero nuevo</b-button>
      </div>
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
                    <div class="botones">
                      <router-link :to="{ name: 'tablero', params: { id: tablero.id }}" custom v-slot="{ navigate }">
                      <b-button @click="navigate" role="link" variant="primary"> Ver tablero </b-button>
                    </router-link>
                    <b-button data-bs-toggle="modal" :data-bs-target="'#exampleModal-' + tablero.id" variant="warning"> Gestionar </b-button>
                </div>

              </b-card>
            </div>

            <div class="modal fade" :id="'exampleModal-' + tablero.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> Gestión de un tablero </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <div class="modal-body">
                    <b> Nombre: </b> <input type="text" required class="form-control" :value=tablero.nombre > <br>
                    <b> Descripcion: </b> <b-form-textarea class="form-control" > </b-form-textarea> <br>
                    <b> Imagen de fondo: </b> <input type="file" accept='image/*' class="form-control" > <br>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Borrar tablero</button>
                    <button type="button" class="btn btn-primary">Guardar los cambios</button>
                  </div>
                </div>
          </div>
          </div>
          </span>
      </b-card-group>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"> Creación de un tablero </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <b> Nombre: </b> <input type="text" required class="form-control" > <br>
            <b> Descripcion: </b> <b-form-textarea class="form-control" > </b-form-textarea> <br>
            <b> Imagen de fondo: </b> <input type="file" accept='image/*' class="form-control" > <br>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary">Guardar los cambios</button>
          </div>
        </div>
      </div>
      </div>

    </div>
</template>


<style lang="scss">

html,body{
    height:100%;
    width: 100vw;
}

.tableros{
    margin: 5vh;
    display:flex;
    flex-direction: column;
    gap: 40px;
}

.buscador{
    display:flex;
    flex-flow: row nowrap;
    justify-content: center;
    flex-grow: 1;
}

.crud{
  display:flex;
  flex-flow: row nowrap;
  width: 90%;
}

.botones{
  display:flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  width: 100%;
}

</style>