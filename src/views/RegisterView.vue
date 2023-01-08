<!-- 
    Vista de registro en la url /registro. Tiene tres campos basicos y un boton para registrar al usuario.
    Se hace una peticion post a la API para crear un nuevo usuario.
    Los datos se validan y se muestran mensajes cuando no se pasa la validacion.
    Funciones: 
    - registrar: hace la peticion post a la API para crear un nuevo usuario.
    - validation: cambia el estado del input de password para mostrar o no el mensaje de validacion.
    - showDismissibleAlert: muestra un mensaje de alerta cuando el usuario ya existe.
    - onMounted. Redirige al usuario a la vista de sus tableros si ya está logueado (para no permitirle acceder al registro).
    Creamos tres watchers para actualizar la varible valid cuando cambie alguno de los campos.
 -->
<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { computed } from 'vue'
import router from '../router'
import { useLoginStore } from '../stores/login'

const username = ref('')
const email = ref('')
const password = ref('')

const valid = ref(false)
const loginStore = useLoginStore()

//expresion regular para validar un email
var re = /\S+@\S+\.\S+/

//vigila que el nombre de usuario, el email y la contraseña cumplan con los requisitos y cambia la variable valid para permitir que se pueda dar click al boton de registrar o no.
watch(username, (newValue, oldValue) => {
    if (username.value.length > 0 && password.value.length > 4 && re.test(email.value)) {
        valid.value = true
    } else {
        valid.value = false
    }
})

// creamos un watch para cada campo para que se actualice la variable valid cuando cambie alguno de los campos.
watch(password, (newValue, oldValue) => {
    if (username.value.length > 0 && password.value.length > 4 && re.test(email.value)) {
        valid.value = true
    } else {
        valid.value = false
    }
})

watch(email, (newValue, oldValue) => {
    if (username.value.length > 0 && password.value.length > 4 && re.test(email.value)) {
        valid.value = true
    } else {
        valid.value = false
    }
})

// esta funcion solo sirve para cambiar el estado del input de password, pero si no se cumple no valida nada. Es por eso que usamos la variable valid para validar.
const validation = computed(() => {
    return password.value.length > 4
})

const showDismissibleAlert = ref(false)

//funcion para registrar
const registrar = () => {
    console.log(username.value)
    // Crear un usuario nuevo en el api
    axios.post('http://localhost:3000/usuarios/', {
    nombre: username.value,
    email: email.value,
    password: password.value
    })
    .then((response) => {
        console.log(response)
        if (response.data.cod == 400) {
            showDismissibleAlert.value = true
        } else if (response.status == 200) {
            // si se registra, se envia al login
            router.push('/login')
        }
    })
    .catch((error) => {
        console.log(error)
        if (error.response) {
        // Request made and server responded. Puede ser que el usuario ya exista. Sea lo que sea se muestra en una alerta.
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        showDismissibleAlert.value = true
        } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        }

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


<template>
    <div id="login">
        <h3> Formulario de registro </h3>
        <b-form class="custom-login">
            <!-- Campo nombre de usuario -->
            <b-form-group class="input-custom"  id="input-group-2" label="Nombre de usuario" label-for="input-2">
                <b-form-input id="input-2" v-model="username" placeholder="Nombre de usuario"  required> </b-form-input>
                <b-form-invalid-feedback
                id="input-2"> This is a required field and must be at least 3 characters. </b-form-invalid-feedback>
            </b-form-group>

            <!-- Campo email -->
            <b-form-group class="input-custom" id="input-group-3" label="Correo electrónico" label-for="input-3">
                <b-form-input id="input-3" type="email" v-model="email" placeholder="Correo electrónico" required> </b-form-input>
                <b-form-invalid-feedback id="input-3">This is a required field.</b-form-invalid-feedback>
            </b-form-group>

            <!-- Campo password -->
            <b-form-group  class="input-custom" id="input-group-4" label="Contraseña:" label-for="input-4">
                <b-form-input id="input-4" type="password" v-model="password" :state="validation"  placeholder="Contraseña" required> </b-form-input>
                <b-form-invalid-feedback :state="validation">
                    La contraseña debe tener un mínimo de 5 caracteres.
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="validation">
                    La contraseña es válida
                </b-form-valid-feedback>
            </b-form-group>

            <b-button type="submit" variant="primary" @click="registrar" :disabled="!valid"> Regístrate </b-button>

        </b-form>

        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
            Este correo ya está siendo usado por otro usuario. 
            </b-alert>
    </div>
    
</template>


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
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.input-custom{
    width: 300px;
}

</style>
