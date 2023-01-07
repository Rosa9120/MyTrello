
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
          <b-nav-item-dropdown right v-if="user">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ user.name }}</em>
            </template>
            <b-dropdown-item @click="logout">Cerrar sesión</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-if="!user">
              <router-link class="custom-link" to="/login">Inicia sesion</router-link>
              <router-link class="custom-link" style="margin-left: 20px;" to="/registro">Registrate</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core"
import { storeToRefs } from "pinia";
import { useLoginStore } from "../stores/login";

const loginStore = useLoginStore()

const token = storeToRefs(loginStore).token
const user = storeToRefs(loginStore).user

const logout = () => {
  loginStore.logout()
}

onMounted(() => {
  loginStore.updateUser()
  loginStore.updateToken()
})
</script>

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