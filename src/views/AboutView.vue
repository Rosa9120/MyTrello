<template>
    <div class="about">
      <h1> Práctica 4 </h1>
      <h2> Hecha por Ilya Slyusarchuk y Rosa María Rodríguez </h2> 
      <h3> Aplicaciones distribuidas en internet </h3>
      <h4> Cambios introducidos en el servidor: </h4>

      <ul> - Método para ver las columnas de un tablero</ul>
      <ul> - Método para ver las tarjetas de una columna</ul>
      <ul> - Método para añadir una tarjeta a una columna</ul>
      <ul> - Método para añadir una columna al tablero</ul>
      <ul> - Método para borrar columna</ul>
      <ul> - Método para borrar tarjeta</ul>
      <ul> - Método para editar tablero</ul>
      <ul>  - Método para editar tarjeta</ul>
      <ul> - Campo 'descripción' para el tablero</ul>
      <ul> - Autenticación con token JWT en todos los métodos POST, PUT Y PATCH </ul>
      <ul> - Comprobación en esos métodos de que el tablero accedido le pertenece al usuario </ul>
      <ul> - Método para obtener todos los tableros de un usuario  </ul>
      <ul> - Método para el registro de usuarios  </ul>
      <ul> - Modificación para poder usar cors  </ul>

    <h4> Requisitos mínimos: </h4>
    <ul> - Hemos implementado login/logout</ul>
    <ul>- Listado de items: listamos todos los tableros del usuario. También se podrían considerar como listados las columnas y las tarjetas de esos tableros.</ul>
    <ul>- Eliminación de items: se pueden borrar los tableros, las columnas y las tarjetas. Como en tableros y tarjetas usamos un modal, hemos añadido una X para borrar las columnas y así que sea similar al ejemplo de la lista de la compra.</ul>
    <ul>- Creación de items: se pueden crear tableros, columnas y tarjetas.</ul>
    <ul>- Ver detalles: al hacer click en los tres puntos al lado de cada tarjeta, se pueden ver sus detalles y editarlos.</ul>
    <ul>- Edición de items: se pueden editar los tableros y las tarjetas.</ul>
    <ul>- Validación del formulario de registro y en creación/edición de tableros y tarjetas.</ul>

    <h4> Requisitos adicionales: </h4>
    <ul> - Usamos la estructura de proyecto que genera create-vue </ul> 
    <ul> - Búsqueda y paginación de tableros </ul>
    <ul>- No solo el tablero, sino también las tarjetas, permiten ver detalles, editar y eliminar. </ul>
    <ul>- Como framework de componentes visuales usamos bootstrap-vue. </ul>
    <ul> - Gestión del estado con Pinia para mantener la información del usuario autentificado </ul>
    <ul> - Uso de Vue Router </ul>

    <h4> Otros detalles: </h4>
    <ul> - Una documentación más extensa de la API la puedes encontrar en server/Entrega4ADI.pdf </ul>
    <ul> - Cada componente y cada vista del cliente de Vue está documentado en el código </ul>

    </div>
    

</template>

<style>
  .about{
    padding:2%;
  }
</style>
