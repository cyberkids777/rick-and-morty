<script setup>
import { useCharacterStore } from '~/stores/characterStore.js';
const store = useCharacterStore()

const isCharacterInFavourites = (characterId) => {
    return store.favCharactersList.find(({ id }) => id === characterId)
}

//Pamietaj żeby fetch ZAWSZE był explicit async/await
// Kazdy obiekt/tablica jest unikatowy bez wzgledu na to czy ma te same dane BO W JSie WSZYSTKO TO OBIEKT

onMounted(async () => {
    await store.fetchCharacters()
    store.readFromStorage()
})

</script>

<template>
  <div>
    <h2>Rick and Morty Characters</h2>
    <p>Current page: {{ store.currentPage }}</p>
    <NuxtLink to="/favourites">Favourite characters</NuxtLink>

    <ul v-if="store.characterList">
      <li
          v-for="character in store.characterList"
          :key="`character-id:${character.id}`"
      >
        {{ character.name }}
        <button
            :disabled="isCharacterInFavourites(character.id)"
            @click="store.addToFavCharacterList(character)"
        >
          Add to Favourites
        </button>
      </li>
    </ul>

    <BasePagination
        v-if="store.paginationInfo.pages"
        :total-pages="store.paginationInfo.pages"
        @on-page-change="store.fetchCharacters"
    />

  </div>
</template>

<style scoped>

</style>