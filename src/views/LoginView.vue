<script setup>
</script>

<template>
    <div id="login">
        <h3> Formulario de inicio de sesión </h3>
        <b-form class="custom-login">

            <b-form-group id="input-group-1" label="Nombre de usuario" label-for="input-1">
                <b-form-input id="input-1" placeholder="Nombre de usuario" required> </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
                <b-form-input id="input-2" placeholder="Contraseña" required> </b-form-input>
            </b-form-group>

        </b-form>

        <b-button type="submit" variant="primary">Iniciar sesión</b-button>
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
    width: 300px;
}

</style>