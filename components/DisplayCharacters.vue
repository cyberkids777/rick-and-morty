<script setup>
import { useCharacterStore } from '~/stores/characterStore.js';
const store = useCharacterStore()

//Pamietaj żeby fetch ZAWSZE był explicit async/await
// Kazdy obiekt/tablica jest unikatowy bez wzgledu na to czy ma te same dane BO W JSie WSZYSTKO TO OBIEKT

onMounted(async () => {
    await store.fetchCharacters()
})

</script>

<template>
  <h2>Rick and Morty Characters</h2>
  <p>Current page: {{ store.currentPage }}</p>

  <BaseSearch @on-search-submit="store.fetchCharacters" />

  <ul v-if="store.characterList">
    <li
        v-for="character in store.characterList"
        :key="`character-id:${character.id}`"
    >
      {{ character.name }}
      <button  @click="store.addToFavCharacterList(character)">
        Add to Favourites
      </button>
    </li>
  </ul>

  <ul v-if="store.favCharactersList">
    <li
        v-for="character in store.favCharactersList"
        :key="`character-id:${character.id}`"
    >
      {{ character.name }}
      <button @click="store.removeFromFavCharacterList(character)">
        Remove From Favourites
      </button>
    </li>
  </ul>

  <BasePagination
      v-if="store.paginationInfo.pages"
      :total-pages="store.paginationInfo.pages"
      @on-page-change="store.fetchCharacters"
  />

</template>

<style scoped>

</style>