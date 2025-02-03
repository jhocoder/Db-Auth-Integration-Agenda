
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
  <div class="flex flex-col items-center justify-center min-h-screen bg-blue-500">
    <div class="bg-white border-4 border-black rounded-lg shadow-lg p-6 w-80 text-center relative">
      <!-- Contenido -->
      <h1 class="text-xl font-bold text-gray-800 mt-12">¡Regístrate!</h1>
      <form @submit.prevent="registerAuth" class="flex flex-col gap-3 mt-4">
        <input v-model="email" type="email" name="email" id="email" placeholder="Ingresa tu email" class="p-2 border-2 border-black rounded bg-gray-100 text-black text-center">
        <input v-model="password" type="password" name="password" id="password" placeholder="Ingresa tu contraseña" class="p-2 border-2 border-black rounded bg-gray-100 text-black text-center">
        <button type="submit" class="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded border-2 border-black">
          Registrarme
        </button>
      </form>
      <router-link to="/login" class="text-blue-600 font-semibold mt-4 inline-block hover:underline">Ir a Iniciar sesión</router-link>
    </div>
  </div>
</template>


<style scoped>
</style>




