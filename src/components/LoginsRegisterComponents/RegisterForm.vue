<script setup>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../../firestore/sdk';
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 

const auth = getAuth(app)
const email = ref("")
const password = ref("")

const router = useRouter();

const registerAuth = async (e) => {
  e.preventDefault(); 
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const userNow = userCredential.user;
    console.log(userNow);
    router.push('/profile');
  } catch (error) {
    console.error("Error al registrar el usuario:", error.message);
  }
}
</script>

<template>
  <div>
    
    <form @submit.prevent="registerAuth" class="flex flex-col border-4 w-[30vh] items-center justify-center p-3 gap-3">
      <input v-model="email" type="email" name="email" id="email" placeholder="Ingresa tu email" class="bg-gray-400">
      <input v-model="password" type="password" name="password" id="password" placeholder="Ingresa tu contraseña" class="bg-gray-400">
      <button type="submit" class="bg-red-500">Registrarme</button>
    </form>
    <button> <router-link to="/login">Ir a Iniciar sesión</router-link></button>
  </div>
</template>

<style scoped>
</style>
