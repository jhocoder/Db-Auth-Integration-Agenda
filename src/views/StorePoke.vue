<script setup>
import { onMounted, ref } from 'vue';
import { usePokeStore } from '@/stores/storePoke';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from '../../firestore/sdk';
import { collection, addDoc, setDoc, arrayUnion, updateDoc, doc } from 'firebase/firestore';

const auth = getAuth();
const currentUser = ref(null)
const currentPoke = ref(null)

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser.value = user;
    console.log(currentUser.value);
  } else {
    console.log("no hay");
  }
});

const pokeStore = usePokeStore();
const renderAllPokemons = ref([]);

// Función para cargar y renderizar los Pokémon
const seePok = async () => {
  await pokeStore.getAllPokemons();
  renderAllPokemons.value = pokeStore.AllPokemons;
  console.log(renderAllPokemons.value);
}

const verifiedUser = async (pokemon) => {
  if (currentUser.value) {
    const userRef = doc(db, "users", currentUser.value.uid);
    await updateDoc(userRef, {
      favoritos: arrayUnion(pokemon.name)
    });
    console.log("Agregado")
  }
}

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-4">
    <!-- Encabezado -->
    <header class="text-center mb-8">
      <h1 class="text-4xl font-extrabold text-red-500 mb-2">Poké Explorer</h1>
      <p class="text-lg text-gray-700">Descubre a todos los Pokémon</p>
    </header>

    <!-- Botón para cargar Pokémon -->
    <div class="flex justify-center mb-8">
      <button
        @click="seePok"
        class="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-colors duration-300"
      >
        Ver Pokémon
      </button>
    </div>

    <!-- Grid de tarjetas de Pokémon -->
    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div 
        v-for="(pokemon, index) in renderAllPokemons" 
        :key="index"
        class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col items-center"
      >
        <h2 class="text-xl font-semibold text-gray-800 capitalize mb-4">
          {{ pokemon.name }}
        </h2>
        <!-- Imagen del Pokémon (si existe) -->
        <img :src="pokemon.sprites['back_default']" 
          :alt="pokemon.name" 
          class="w-full h-40 object-contain mb-4"
        />
        <p v-for="(item, index) in pokemon.abilities" :key="index">
          {{ item.ability.name }}
        </p>
        <button class="bg-green-100" @click="verifiedUser(pokemon)">add to fav</button>
      </div>
    </section>
  </div>
</template>
