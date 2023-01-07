<template>
    <div id="login">
        <h3> Formulario de inicio de sesión </h3>
        <b-form class="custom-login">

            <b-form-group id="input-group-1" label="Correo electronico" label-for="input-1">
                <b-form-input id="input-1" type="email" placeholder="user@ua.es" v-model="email" required> </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
                <b-form-input id="input-2" type="password" placeholder="Contraseña" v-model="password" required> </b-form-input>
            </b-form-group>

        </b-form>

        <b-button type="submit" variant="primary" @click.prevent="login">Iniciar sesión</b-button>

        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
            Los datos introducidos no coinciden con ningun usuario!
        </b-alert>
    </div>
    
</template>

<script setup>
import { onMounted, ref } from "vue"
import axios from "axios"
import { useLoginStore } from "../stores/login";
import router from "../router";

const email = ref(null)
const password = ref(null)

const showDismissibleAlert = ref(false)

const loginStore = useLoginStore()

const login = async () => {
    axios.post("http://localhost:3000/login", {
        login: email.value,
        password: password.value
    }).then((response) => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        loginStore.updateToken()
        loginStore.updateUser()
        router.push("/")
    }).catch((error) => {
        showDismissibleAlert.value = true
        console.log('Los datos introducidos no coinciden con ningun usuario')
    })
}

onMounted(() => {
    loginStore.updateUser()
    loginStore.updateToken()

    if (loginStore.user) {
        router.push("/")
    }
})
</script>

<style>

html,body{
    height:100%;
    width: 100%;
}

#login{
    height: 100%;
    width: 100%;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
}


.custom-login{
    width: 300px;
}

</style>