<template>
  <div class="cuadro-tarjeta" :id="'cuadro-tarjeta-' + columnaId + '-' + id" draggable="true" @dragstart="dragStart" @dragend="dragEnd">
    <div class="interior">
      <h1>{{ titulo }}</h1>
      <button class="botones" type="button" data-bs-toggle="modal" :data-bs-target="'#exampleModal-' + id ">
        ⠇
      </button>
    </div>

    <div class="modal fade" :id="'exampleModal-' + id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Gestión de la tarjeta</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">

          <b-tabs content-class="mt-3">
          <b-tab title="Ver" active>
            <b> Título: </b> {{titulo}} <br>
            <b> Descripcion: </b> {{descripcion}} <br>
            <b> Creado por: </b> <br>
            <b> Fecha límite:</b>  <br>
            mas cosas
          </b-tab>
          <b-tab title="Editar">
            <b> Título: </b> <input type="text" class="form-control" :value=titulo> <br>
            <b> Descripcion: </b> <b-form-textarea class="form-control" :value=descripcion> </b-form-textarea> <br>
            <b> Fecha límte CUIDAO TODAVIA NO EXISTE: </b> <input type="date" class="form-control" :value=titulo> <br>
          </b-tab>

        </b-tabs>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Borrar tarjeta</button>
          <button type="button" class="btn btn-primary">Guardar los cambios</button>
        </div>
      </div>
    </div>
    </div>

  </div> 
</template>

<script setup>
import { onMounted } from "@vue/runtime-core"

  defineProps({
    titulo: {
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
    }
  })

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

.botones{
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


