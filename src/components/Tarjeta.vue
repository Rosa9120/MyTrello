<template>
  <div class="cuadro-tarjeta">
    <h1>{{ titulo }}</h1>
  </div>
</template>

<script setup>

defineProps({
  titulo: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.cuadro-tarjeta{
    background-color: white;
    padding: 6px 6px 2px;
    align-self: center;
    min-width:256px;
    min-height: 32px;
    margin-bottom:8px;
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