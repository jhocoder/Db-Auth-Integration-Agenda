<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <!-- Encabezado del menú -->
  <header class="bg-red-500 shadow-md">
    <nav class="max-w-6xl mx-auto flex justify-between items-center h-[15vh]">
      <!-- Logo o título -->
      <div class="text-white font-extrabold text-2xl">
        PokéApp
      </div>
      <!-- Menú de navegación -->
      <ul class="flex space-x-6">
        <li>
          <RouterLink 
            to="/"
            class="text-white hover:text-red-200 transition-colors duration-300"
          >
            Home
          </RouterLink>
        </li>
        <li>
          <RouterLink 
            to="/storePoke"
            class="text-white hover:text-red-200 transition-colors duration-300"
          >
            StorePoke
          </RouterLink>
        </li>
        <li>
          <RouterLink 
            to="/login"
            class="text-white hover:text-red-200 transition-colors duration-300"
          >
            Login
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>

  <!-- Vista principal -->
  <main class="">
    <RouterView />
  </main>
</template>

<style scoped>
/* Puedes agregar estilos personalizados adicionales aquí si lo deseas */
</style>
