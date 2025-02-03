<script setup>
import { ref } from 'vue';
import { signOut, getAuth } from 'firebase/auth';
import { useRouter } from '@/router';
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
    <button class="bg-black text-white">Cerrar sesion</button>
  </div>
</template>

<style scoped>

</style>
