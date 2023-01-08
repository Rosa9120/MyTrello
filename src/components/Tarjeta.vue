<template>
  <div class="cuadro-tarjeta" :id="'cuadro-tarjeta-' + columnaId + '-' + id" draggable="true" @dragstart="dragStart" @dragend="dragEnd">
    <div class="interior">
      <h1>{{ titulo }}</h1>
      <button class="botones-braile" type="button" data-bs-toggle="modal" :data-bs-target="'#exampleModal-' + id ">
        ⠇
      </button>
    </div>

    <div class="modal fade" :id="'exampleModal-' + id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Gestión de la tarjeta</h5>
          <button type="button" id="closeButton" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">

          <b-tabs content-class="mt-3">
          <b-tab title="Ver" active>
            <b> Título: </b> {{titulo}} <br>
            <b> Descripcion: </b> {{descripcion}} <br>
            <b> Fecha límite:</b> {{ fechaVencimiento }} <br>
          </b-tab>
          <b-tab title="Editar">
            <b> Título: </b> <input type="text" class="form-control" v-model="newTitulo"> <br>
            <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
            El titulo no puede estar vacio! 
            </b-alert>
            <b> Descripcion: </b> <b-form-textarea class="form-control" v-model="newDescripcion"> </b-form-textarea> <br>
            <b> Fecha límte: </b> <input type="date" class="form-control" v-model="newFechaVencimiento"> <br>
          </b-tab>

        </b-tabs>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" :id="'close-button-' + id"  data-bs-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Borrar tarjeta</button>
          <button type="button" @click.prevent="guardarCambios" class="btn btn-primary">Guardar los cambios</button>
        </div>
      </div>
    </div>
    </div>

  </div> 
</template>

<script setup>
import { onMounted } from "@vue/runtime-core"
import axios from "axios"
import { ref } from "vue"
import { useLoginStore } from '../stores/login';

const loginStore = useLoginStore()

const props = defineProps({
    titulo: {
      type: String,
      required: true
    },
    tableroId: {
      type: String,
      required: true
    },
    descripcion: {
      type: String,
      required: false
    },
    id: {
      type: Number,
      required: true
    },
    columnaId: {
      type: Number,
      required: true
    },
    fechaVencimiento: {
      type: String,
      required: false
    }
  })

  const titulo = ref(props.titulo)
  const descripcion = ref(props.descripcion)
  const fechaVencimiento = ref(props.fechaVencimiento)

  const newTitulo = ref(props.titulo)
  const newDescripcion = ref('')
  const newFechaVencimiento = ref('')

  const showDismissibleAlert = ref(false)

  const dragStart = (e) => {
    e.dataTransfer.setData('text/plain', e.target.id)

    setTimeout(() => {
      e.target.classList.add('hide')
    }, 0)

    // const id = e.dataTransfer.getData('text/plain')
    // console.log(id)
  }

  const dragEnd = (e) => {
    e.target.classList.remove('hide')
  }

  

  const guardarCambios = () => {
    // Remove whitespace from the beginning and end of the string
    newTitulo.value = newTitulo.value.trim()
    newDescripcion.value = newDescripcion.value.trim()
    newFechaVencimiento.value = newFechaVencimiento.value.trim()

    if (newFechaVencimiento.value != '') {
      const datos = newFechaVencimiento.value.split('-')

      newFechaVencimiento.value = datos[2] + '-' + datos[1] + '-' + datos[0]
    } else {
      newFechaVencimiento.value = props.fechaVencimiento
    }

    if (newTitulo.value == '') {
      newTitulo.value = props.titulo
      showDismissibleAlert.value = true
      return
    }

    showDismissibleAlert.value = false

    if (newDescripcion.value == '') {
      newDescripcion.value = props.descripcion
    }

    axios.put('http://localhost:3000/tableros/' + props.tableroId + '/columnas/' + props.columnaId + '/tarjetas/' + props.id, {
      nombre: newTitulo.value,
      descripcion: newDescripcion.value,
      fechaVencimiento: newFechaVencimiento.value},{
      headers: {
      'Authorization': 'Bearer ' + loginStore.token
      }
    }).then((response) => {
      titulo.value = response.data.tarjeta.nombre
      descripcion.value = response.data.tarjeta.descripcion
      fechaVencimiento.value = response.data.tarjeta.fechaVencimiento
      var closeButton = document.getElementById('close-button-' + props.id)
      closeButton.click()
    }).catch((error) => {
      console.log(error)
    })
  }

</script>

<style scoped>
.cuadro-tarjeta{
    background-color: white;
    padding: 6px 6px 2px;
    align-self: center;
    min-width:250px;
    min-height: 32px;
    margin-bottom:8px;
    border-radius: 0.375rem;
    cursor: pointer;
}

.modal-header{
  background-color: white;
  color: #172b4d;
  border: 0px;
}

.modal-footer{
  border: 0px;
}

.hide {
  display: none;
}

.interior{
  display: flex;
  justify-content: space-between;
}

.botones-braile{
  background-color: white;
  border: 0px;
  cursor: pointer;
}

@media (min-width: 1024px) {
  .cuadro h1,
  .cuadro h3 {
    text-align: left;
    color:black;
    font-size: 16px;
    margin-bottom: 3px;
  }
}
</style>


