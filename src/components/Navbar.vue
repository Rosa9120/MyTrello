
<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand class="custom-navbar">
        <router-link class="custom-link" to="/">MyTrello</router-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
            <router-link class="custom-link" to="/about">Sobre nosotros</router-link>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>Nombre del usuario</em>
          </template>
          <b-dropdown-item href="#">Cerrar sesión</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<style lang="scss" scoped>

.custom-navbar{
    color:black;
}

.custom-link{
    color:black !important;
}

.custom-link:link { 
    color:black;
    text-decoration: none; }

.custom-link:visited { text-decoration: none; }

.custom-link:hover { text-decoration: none; }

.custom-link:active { text-decoration: none; }

</style>