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
  <div>
    <h1>ESTE ES TU PROFILE</h1>
    <div class="flex flex-col">
      <router-link to="/storepoke">Ir a pokemones y elegir favoritos <button class="bg-red-200 p-2 w-10">IR</button></router-link>
      <button @click="salir" class="bg-black text-white p-2">Cerrar sesion</button>
    </div>

  </div>
</template>

<style scoped>

</style>
