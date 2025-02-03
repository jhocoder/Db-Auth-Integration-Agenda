<script setup>
import { ref } from 'vue';
import { signOut, getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';
const router  = useRouter()

const auth = getAuth();

const salir =  () => {

  signOut(auth).then(() => {
  router.push("/storepoke")
}).catch((error) => {
  console.log("error al salir")
});

}



</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-blue-500 text-center">
    <div class="bg-white border-4 border-black rounded-lg shadow-lg p-6 w-80 relative">
      <!-- Parte superior Poké Ball -->
      <div class="absolute top-0 left-0 w-full h-1/2 bg-red-500 rounded-t-lg border-b-4 border-black"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white border-4 border-black rounded-full flex items-center justify-center">
        <div class="w-6 h-6 bg-black rounded-full"></div>
      </div>

      <h1 class="text-xl font-bold text-gray-800 mt-12">¡Este es tu perfil! 🎮</h1>

      <div class="flex flex-col gap-4 mt-4">
        <router-link to="/storepoke" class="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded border-2 border-black">
          🔥 Ir a Pokemones y elegir favoritos
        </router-link>
        <button @click="salir" class="bg-black text-white font-bold py-2 px-4 rounded border-2 border-white hover:bg-gray-800">
          ❌ Cerrar sesión
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>
