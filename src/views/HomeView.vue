<!-- Vista principal situado en la ruta /
      Muestra un conjunto de cards de bootstrap, cada uno representando un tablero del usuario 
      Permite buscar entre estos tableros con el buscador
      Permite crear un nuevo tablero con el botón de crear tablero. Este botón abre un modal con un formulario para crear el tablero. Se llama al método crearTablero() para crear el tablero en la base de datos y se actualiza la vista haciendo una petición GET de todos los tableros a la API
      También permite gestionar cada tablero con el botón de gestionar. Se abre un modal en el que se puede borrar o editar el tablero. Se llama a la función correspondiente y se actualiza la pagina con una petición GET de todos los tableros a la API.
      Por ultimo, cada card tiene un botón de ver que nos lleva a la vista de ese tablero en concreto. Se pasa el id del tablero como parámetro en la ruta.
      -->
<template>
    <div class="tableros" v-if="loaded">
      <div class="crud"> 
        <div></div>
        <!-- input y boton para buscar -->
        <div class="buscador"> 
          <b-form-input v-model="buscador" lass="mr-sm-2" style="width:40%" placeholder="Nombre del tablero"></b-form-input>
          <b-button class="my-2 my-sm-0" type="submit">Buscar</b-button>
        </div>
        <!-- boton para crear un tablero nuevo -->
        <b-button class="my-2 my-sm-0" variant="success" data-bs-toggle="modal" data-bs-target="#exampleModal">Crear un tablero nuevo</b-button>
      </div>
      <!-- card deck de bootstrap para mostrar todos los tableros -->
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
            <!-- modal para editar y borrar un tablero -->
            <div class="modal fade" :id="'exampleModal-' + tablero.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> Gestión de un tablero </h5>
                    <button type="button" class="btn-close" id="close-editar" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <b-form>
                    <div class="modal-body">
                      <b> Nombre: </b> <b-form-input type="text" class="form-control" v-model="nuevoNombreTableroEditar" required> </b-form-input> 
                      <!-- validacion -->
                      <b-alert style="margin-top:15px;" v-model="showDismissibleAlertEditar" variant="danger" dismissible>
                      El nombre del tablero no puede estar vacío!
                      </b-alert>
                      <br>
                      <b> Descripcion: </b> <b-form-textarea class="form-control"  v-model="nuevaDescripcionTableroEditar"> </b-form-textarea> <br>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" id="btn-close-modal-editar"  data-bs-dismiss="modal">Cerrar</button>
                      <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click.prevent="borrarTablero(tablero.id)" >Borrar tablero</button>
                      <button class="btn btn-primary" type="submit" @click.prevent="editarTablero(tablero.id)"> Guardar los cambios</button>
                    </div>
                  </b-form>
                </div>
          </div>
          </div>
          </span>
      </b-card-group>

      <!-- modal para crear un tablero -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"> Creación de un tablero </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <b> Nombre: </b> <input type="text" v-model="nuevoNombreTablero" required class="form-control" > 
            <!-- validacion -->
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
const showDismissibleAlertEditar = ref(false)

const loginStore = useLoginStore()

const allTableros = ref(null)

//buscador
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
  //peticion post para crear el tablero
  await axios.post('http://localhost:3000/tableros/', {
    nombre: nuevoNombreTablero.value,
    descripcion: nuevaDescripcionTablero.value
  }, {
    headers: {
      'Authorization': 'Bearer ' + loginStore.token
    }
  })
    .then(async (response) => {
      //si se crea correctamente, se hace una peticion get para actualizar la pagina
      await axios.get('http://localhost:3000/tableros/', {
        headers: {
          'Authorization': 'Bearer ' + loginStore.token
        }
      })   
      .then((response) => {
        //se cierra el modal y se actualizan los tableros
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
  //se hace la peticion delete para borrar el tablero
  await axios.delete('http://localhost:3000/tableros/' + id, {
    headers: {
      'Authorization': 'Bearer ' + loginStore.token
    }
  })
    .then(async (response) => {
      //si se borra correctamente, se hace una peticion get para actualizar la pagina
      await axios.get('http://localhost:3000/tableros/', {
        headers: {
          'Authorization': 'Bearer ' + loginStore.token
        }
      })   
      .then((response) => {
        //se actualizan los tableros y se cierra el modal
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
  if (nuevoNombreTableroEditar.value === '') {
    showDismissibleAlertEditar.value = true
    return
  }
  showDismissibleAlertEditar.value = false
  //se hace la peticion put para editar el tablero
  await axios.put('http://localhost:3000/tableros/' + id, {
    nombre: nuevoNombreTableroEditar.value,
    descripcion: nuevaDescripcionTableroEditar.value
  }, {
    headers: {
      'Authorization': 'Bearer ' + loginStore.token
    }
  })
    .then(async (response) => {
      //si se edita correctamente, se hace una peticion get para actualizar la pagina
      await axios.get('http://localhost:3000/tableros/', 
      {
        headers: {
          'Authorization': 'Bearer ' + loginStore.token
        }
      })   
      .then((response) => {
        //se actualizan los tableros y se cierra el modal
        nuevoNombreTableroEditar.value = ''
        nuevaDescripcionTableroEditar.value = ''
        tableros.value = response.data.tableros
        const closeButton = document.getElementById('close-editar')
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
  // se hace la peticion get para obtener los tableros
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