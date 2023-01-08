
<script setup>
    import Navbar from '/src/components/Navbar.vue'
</script>
<!-- Plantilla que se usará en todas las páginas. Compuesta por el navbar y por lo que se vea en cada template -->
<template>
    <div id="app">
        <Navbar></Navbar>
        <router-view></router-view>
    </div>
</template>

<style scoped>



</style>
