<template>
    <div class="columna">
      <div class="tarjetas">
        <b-form-input
            id="inline-form-input-name"
            class="mb-2 me-sm-2 mb-sm-0"
            placeholder="Añade una columna"
            debounce="500"  
          ></b-form-input>
        </div>
    </div>
  </template>
  
  <style scoped>

  .columna{
      background-color: #EBECF0;
      opacity: 0.6;
      width: 272px;
      display:flex;
      flex-flow: column;
  
      padding: 10px;
      margin-bottom: 8px;
  
      height: max-content;
  
      margin-left: 4px;
      margin-right: 4px;
      border-radius: 0.375rem;
  }
  
  </style>
  
  