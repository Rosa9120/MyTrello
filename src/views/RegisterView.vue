<script setup>
</script>

<template>
    <div id="login">
        <h3> Formulario de registro </h3>
        <b-form class="custom-login">

            <b-form-group class="input-custom"  id="input-group-2" label="Nombre de usuario" label-for="input-2">
                <b-form-input id="input-2" v-model="username"  placeholder="Nombre de usuario" :state="validation"  required> </b-form-input>
                <b-form-invalid-feedback :state="validation" >
                    El nombre de usuario debe tener entre 5 y 12 caracteres.
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="validation" >
                    El nombre de usuario es válido.
                </b-form-valid-feedback>
            </b-form-group>


            <b-form-group class="input-custom" id="input-group-3" label="Correo electrónico" label-for="input-3">
                <b-form-input id="input-3" type="email" v-model="email" placeholder="Correo electrónico" required> </b-form-input>
                <b-form-invalid-feedback :state="validationEmail" >
                    El correo electronico debe sder bonito
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="validationEmail" >
                    El nombre de usuario es válido.
                </b-form-valid-feedback>
            </b-form-group>

            <b-form-group  class="input-custom" id="input-group-4" label="Contraseña:" label-for="input-4">
                <b-form-input id="input-4" type="password" placeholder="Contraseña" required> </b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" > Regístrate </b-button>

        </b-form>


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

<script>
  export default {
    data() {
      return {
        username: '',
        email: ''
      }
    },
    computed: {
      validation() {
        return this.username.length > 4 && this.username.length < 13
      },
      validationEmail() {
        return this.email.length > 4 && this.email.length < 10}
    }
  }
</script>