<script setup>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../../firestore/sdk';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const auth = getAuth(app)

const router = useRouter();

const email = ref("")
const password = ref("")
const loginAuth = async (e) =>{
  e.preventDefault();
  const authsign = await signInWithEmailAndPassword(auth, email.value, password.value)
  const usersign = authsign.user;
  router.push('/profile');
  console.log(usersign)

} 

</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-blue-500">
    <div class="bg-white border-4 border-black rounded-lg shadow-lg p-6 w-80 text-center relative">
      <!-- Parte superior Poké Ball -->

      <!-- Contenido -->
      <h1 class="text-xl font-bold text-gray-800 mt-12">¡Inicia sesión!</h1>
      <form @submit.prevent="loginAuth" class="flex flex-col gap-3 mt-4">
        <input v-model="email" type="email" placeholder="Correo electrónico" class="p-2 border-2 border-black rounded bg-gray-100 text-black text-center">
        <input v-model="password" type="password" placeholder="Contraseña" class="p-2 border-2 border-black rounded bg-gray-100 text-black text-center">
        <button type="submit" class="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded border-2 border-black">
          Entrar
        </button>
      </form>
      <router-link to="/register" class="text-blue-600 font-semibold mt-4 inline-block hover:underline">Ir a Registrar</router-link>
    </div>
  </div>
</template>


<style scoped>

</style>
