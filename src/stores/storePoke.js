import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePokeStore = defineStore('storePoke', () => {

  const AllPokemons = ref([]);  // Aquí se guardan los Pokémon completos
  const FavPokeList = ref([]);  // Aquí se guardan los Pokémon favoritos

  const SET_POKEMONS = (pokemons) => {
    AllPokemons.value = pokemons;
  };

  const SET_FAVORITE = (favorite) => {
    console.log("favorite");
  };

  const getAllPokemons = async () => {
    const fetchPokes = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const responsePokes = await fetchPokes.json();
    

    const pokemonDetailsPromises = responsePokes.results.map(async (element) => {
      const fetcher = await fetch(element.url);
      const pokemonDetails = await fetcher.json();
      return pokemonDetails;  
    });


    const allPokemonDetails = await Promise.all(pokemonDetailsPromises);

    SET_POKEMONS(allPokemonDetails);
    
 
    console.log(allPokemonDetails); 
  };

  return { AllPokemons, FavPokeList, SET_POKEMONS, SET_FAVORITE, getAllPokemons };
});
