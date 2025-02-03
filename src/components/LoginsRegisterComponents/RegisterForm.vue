
<script setup>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../../firestore/sdk';
import { doc, setDoc } from 'firebase/firestore';
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
    // Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const userNow = userCredential.user;
    console.log(userNow);

    // Crear documento en Firestore con el uid de Auth como ID
    const userRef = doc(db, "users", userNow.uid);  // Usamos el UID de Auth como el ID de Firestore

    try {
      await setDoc(userRef, {
        email: email.value,
        password: password.value,
        uid: userNow.uid,  // Guardamos también el uid
        favoritos: []  // Lista vacía de favoritos al inicio
      });

      console.log("Usuario agregado en Firestore con UID como ID");
    } catch (error) {
      console.log("No se puede agregar el usuario en Firestore", error);
    }

    // Redirigir a la página de perfil
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




