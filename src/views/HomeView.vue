<template>
    <div class="tableros" v-if="loaded">
      <div class="crud"> 
        <div></div>
        <div class="buscador"> 
          <b-form-input v-model="buscador" lass="mr-sm-2" style="width:40%" placeholder="Nombre del tablero"></b-form-input>
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
                style="max-width: 20rem; min-height: 380px;"
                class="mb-2"
              >
                <b-card-title> {{ tablero.nombre }} </b-card-title>
                <b-card-text>
                {{ tablero.descripcion }}
                </b-card-text>
                <template #footer>
                  <div class="botones" >
                    <router-link :to="{ name: 'tablero', params: { id: tablero.id }}" custom v-slot="{ navigate }">
                    <b-button @click="navigate" role="link" variant="primary"> Ver tablero </b-button>
                  </router-link>
                  <b-button data-bs-toggle="modal" :data-bs-target="'#exampleModal-' + tablero.id" variant="warning"> Gestionar </b-button>
                  </div>
                </template>
                

              </b-card>
            </div>

            <div class="modal fade" :id="'exampleModal-' + tablero.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> Gestión de un tablero </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <b-form>
                    <div class="modal-body">
                      <b> Nombre: </b> <b-form-input type="text" class="form-control" v-model="nuevoNombreTableroEditar" required> </b-form-input> <br>
                      <b> Descripcion: </b> <b-form-textarea class="form-control"  v-model="nuevaDescripcionTableroEditar"> </b-form-textarea> <br>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" id="btn-close-modal-editar"  data-bs-dismiss="modal">Cerrar</button>
                      <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click.prevent="borrarTablero(tablero.id)" >Borrar tablero</button>
                      <button class="btn btn-primary" type="submit" data-bs-dismiss="modal"  @click.prevent="editarTablero(tablero.id)"> Guardar los cambios</button>
                    </div>
                  </b-form>
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
            <b> Nombre: </b> <input type="text" v-model="nuevoNombreTablero" required class="form-control" > 
            <b-alert style="margin-top:15px;" v-model="showDismissibleAlert" variant="danger" dismissible>
            El nombre del tablero no puede estar vacío!
            </b-alert>
            <br>
            <b> Descripcion: </b> <b-form-textarea v-model="nuevaDescripcionTablero" class="form-control" > </b-form-textarea> <br>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="btn-close-modal" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" @click.prevent="crearTablero">Guardar los cambios</button>
          </div>
        </div>
      </div>
      </div>

    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useLoginStore } from '../stores/login';
import router from '../router';

const tableros = ref([])

const nuevoNombreTablero = ref('')
const nuevaDescripcionTablero = ref('')
const nuevoNombreTableroEditar = ref('')
const nuevaDescripcionTableroEditar = ref('')
const buscador = ref('')

const showDismissibleAlert = ref(false)

const loginStore = useLoginStore()

const allTableros = ref(null)

watch(buscador, (newValue, oldValue) => {
  // filter tableros name by buscador
  tableros.value = allTableros.value.filter(tablero => tablero.nombre.includes(newValue))
})

const crearTablero = async () => {
  if (nuevoNombreTablero.value === '') {
    showDismissibleAlert.value = true
    return
  }
  showDismissibleAlert.value = false
  await axios.post('http://localhost:3000/tableros/', {
    nombre: nuevoNombreTablero.value,
    descripcion: nuevaDescripcionTablero.value
  }, {
    headers: {
      'Authorization': 'Bearer ' + loginStore.token
    }
  })
    .then(async (response) => {
      await axios.get('http://localhost:3000/tableros/', {
        headers: {
          'Authorization': 'Bearer ' + loginStore.token
        }
      })   
      .then((response) => {
        tableros.value = response.data.tableros
        const closeButton = document.getElementById('btn-close-modal')
        closeButton.click()
      })
      .catch((error) => {
        console.log(error)
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

const borrarTablero = async (id) => {
  await axios.delete('http://localhost:3000/tableros/' + id, {
    headers: {
      'Authorization': 'Bearer ' + loginStore.token
    }
  })
    .then(async (response) => {
      await axios.get('http://localhost:3000/tableros/', {
        headers: {
          'Authorization': 'Bearer ' + loginStore.token
        }
      })   
      .then((response) => {
        tableros.value = response.data.tableros
        const closeButton = document.getElementById('btn-close-modal')
        closeButton.click()
      })
      .catch((error) => {
        console.log(error)
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

const editarTablero = async (id) =>{
  await axios.put('http://localhost:3000/tableros/' + id, {
    nombre: nuevoNombreTableroEditar.value,
    descripcion: nuevaDescripcionTableroEditar.value
  }, {
    headers: {
      'Authorization': 'Bearer ' + loginStore.token
    }
  })
    .then(async (response) => {
      await axios.get('http://localhost:3000/tableros/', 
      {
        headers: {
          'Authorization': 'Bearer ' + loginStore.token
        }
      })   
      .then((response) => {
        nuevoNombreTableroEditar.value = ''
        nuevaDescripcionTableroEditar.value = ''
        tableros.value = response.data.tableros
        const closeButton = document.getElementById('btn-close-modal-editar')
        closeButton.click()
      })
      .catch((error) => {
        console.log(error)
      })
    })
    .catch((error) => {
      console.log(error)
    })
}


const loaded = ref(false)

onMounted(async () => {
  loginStore.updateToken()
  loginStore.updateUser()

  if (!loginStore.token) {
    router.push('/login')
    return
  }

  loaded.value = true

  await axios.get('http://localhost:3000/tableros/', {
    headers: {
      'Authorization': 'Bearer ' + loginStore.token
    }
  })   
    .then((response) => {
      tableros.value = response.data.tableros
      allTableros.value = response.data.tableros
    })
    .catch((error) => {
      console.log(error)
    })
})

</script>

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