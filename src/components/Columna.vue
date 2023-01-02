
<script setup>
import Tarjeta from './Tarjeta.vue'

defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="columna">
    <h1 class="titulo-columna">{{ msg }}</h1>
    <div class="tarjetas">
      <Tarjeta titulo="Tarea 1" />
      <Tarjeta titulo="Tarea 2" />
      <Tarjeta titulo="Tarea 3" />
      <Tarjeta titulo="Tarea 3" />
      <Tarjeta titulo="Tarea 3" />
      <Tarjeta titulo="Tarea 3" />
      <Tarjeta titulo="Tarea 3" />
      <Tarjeta titulo="Tarea 3" />
      <Tarjeta titulo="Tarea 3" />
      <Tarjeta titulo="Tarea 3" />
      <TarjetaVacia> </TarjetaVacia>
    </div>

</div>
</template>

<style scoped>

.titulo-columna{
  background-color: #EBECF0;
    opacity: 0.6;
    width: 200px;
    color:black;
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
    margin-left: 4px;
    margin-right: 4px;

}

.tarjetas{
  overflow-x:hidden;
}


@media (min-width: 1024px) {
  .cuadro h1,
  .cuadro h3 {
    text-align: left;
  }
}
</style>
