<template>
  <div class="cuadro-tarjeta" :id="'cuadro-tarjeta-' + columnaId + '-' + id" draggable="true" @dragstart="dragStart" @dragend="dragEnd">
    <h1>{{ titulo }}</h1>
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
