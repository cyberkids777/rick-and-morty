<script setup>
import { useCharacterStore } from '~/stores/characterStore.js';

const currentPage = ref(1)
const isLoading = ref(true)
const isError = ref(false)
const store = useCharacterStore()
const inputData = ref('')
const selected = ref('name')

//Pamietaj żeby fetch ZAWSZE był explicit async/await
// Kazdy obiekt/tablica jest unikatowy bez wzgledu na to czy ma te same dane BO W JSie WSZYSTKO TO OBIEKT

const fetchChars = async (pageNumber, InputDataValue) => {
    isError.value = false //flagi, boolean, ktory swiadczy o stanie
    isLoading.value = true
    try {
        const { data } = await useFetch('https://rickandmortyapi.com/api/character/', {
            query: { // query: to ogólnie parametry przekazywane w zapytaniu do api
                page: pageNumber, // Inaczej ?page=pageNumber
                [selected.value]: InputDataValue,
            },
        })
        if (!data.value) return // Zakoncz funkcje kiedy brak danych
        store.addCharacters(data.value.results)
        store.addPagination(data.value.info)
    } catch (e) {
        isError.value = true
        if (e.status === 400) console.log('Błędne zapytanie')
        if (e.status === 401) console.log('Zaloguj się żeby kontynuować')
        if (e.status === 403) console.log('Brak dostępu')
        if (e.status === 404) console.log('Nie znaleziono strony')
        if (e.status === 500) console.log('Serwer się wyjebał')
    } finally {
        isLoading.value = false
    }
}

const fetchAgain = async (pageNumber) => {
    await fetchChars(pageNumber, inputData.value)
    currentPage.value = pageNumber
}

const searchCharacters = async (payload) => {
    currentPage.value = 1
    inputData.value = payload
    await fetchChars(currentPage.value, inputData.value)
}

const setSearchFilter = (payload) => {
    selected.value = payload
}

onMounted(async () => {
    await fetchChars(1)
    isLoading.value = false
})

</script>

<template>
  <h2>Rick and Morty Characters</h2>
  <div v-if="isLoading">loading</div>
  <div v-if="isError">nie udało się zaciągnać danych, spróbuj ponownie później</div>
  <p>Current page: {{ currentPage }}</p>

  <BaseSearch @search-characters="searchCharacters" @set-search-filter="setSearchFilter"/>

  <ul v-if="store.characterList">
    <li
        v-for="character in store.characterList"
        :key="`character-id:${character.id}`"
    >
      {{character.name}}
      <button  @click="store.addToFavCharacterList(character)">Add to Favourites</button>
    </li>
  </ul>

  <ul v-if="store.favCharactersList">
    <li
        v-for="character in store.favCharactersList"
        :key="`character-id:${character.id}`"
    >
      {{ character.name}}
      <button @click="store.removeFromFavCharacterList(character)">Remove From Favourites</button>
    </li>
  </ul>

  <BasePagination v-if="store.paginationInfo.pages" :total-pages="store.paginationInfo.pages" :current-page="currentPage" @change-page-number="fetchAgain" />

</template>

<style scoped>

</style>