<template>
  <div class="cuadro-tarjeta" :id="'cuadro-tarjeta-' + columnaId + '-' + id" draggable="true" @dragstart="dragStart" @dragend="dragEnd">
    <h1>{{ titulo }}</h1>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
   
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        HOLA- ESTO FUNCIONA? 
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
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

.hide {
  display: none;
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


