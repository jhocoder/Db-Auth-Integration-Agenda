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
  <div>
    <form action="/profile" @submit.prevent="loginAuth" method="post" class="flex flex-col border-4 w-[30vh] items-center justify-center p-3 gap-3">
        <input v-model="email" type="email" name="" id="" placeholder="Ingresa tu email" class="bg-gray-400">
        <input v-model="password" type="password" name="" id="" placeholder="Ingresa Contraseña" class="bg-gray-400">  
        <button type="submit" class="bg-red-500">Entrar</button>   
    </form>
    <button> <router-link to="/register" >Ir a registrar</router-link></button>
  </div>
</template>

<style scoped>

</style>
