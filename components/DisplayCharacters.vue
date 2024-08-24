<script setup>
import { useCharacterStore } from '~/stores/characterStore.js';

const currentPage = ref(1)
const isLoading = ref(true)
const isError = ref(false)
const store = useCharacterStore()
const inputData = defineModel('gay')

//Pamietaj żeby fetch ZAWSZE był explicit async/await
// Kazdy obiekt/tablica jest unikatowy bez wzgledu na to czy ma te same dane BO W JSie WSZYSTKO TO OBIEKT

const fetchChars = async (pageNumber, characterName) => {
    isError.value = false //flagi, boolean, ktory swiadczy o stanie
    isLoading.value = true
    try {
        const { data } = await useFetch('https://rickandmortyapi.com/api/character/', {
            query: { // query: to ogólnie parametry przekazywane w zapytaniu do api
                page: pageNumber, // Inaczej ?page=pageNumber
                name: characterName,
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

const searchCharacters = async () => {
    currentPage.value = 1
    await fetchChars(currentPage.value, inputData.value)
}

onMounted(async () => {
    await fetchChars(1)
    isLoading.value = false
})

// todo dropdown menu (drugi parametr do szukajki) dla statusu postaci tak zeby se mozna bylo szukac po ich statusie, remove postaci, zrobic local storage, paginacja dla listy ulubionych, odświeżanie danych z local storage

</script>

<template>
  <h2>Rick and Morty Characters</h2>
  <div v-if="isLoading">loading</div>
  <div v-if="isError">nie udało się zaciągnać danych, spróbuj ponownie później</div>
  <p>Current page: {{ currentPage }}</p>
  <div>
    <p> {{ inputData }}</p>
    <label for="input">
      <input
          v-model="inputData"
          type="text"
          placeholder="Search here"
          @keyup.enter="searchCharacters"
      >
    </label>
  </div>

<!--  Pokaż wyniki-->

  <ul v-if="store.characterList">
    <li
        v-for="character in store.characterList"
        :key="`character-id:${character.id}`"
    >
      {{character.name}}
      <button  @click="store.addToFavCharacterList(character)">Add to Favourites</button>
    </li>
  </ul>

<!--  Ulubione postacie-->

  <ul>
    <li v-for="character in store.favCharactersList" :key="`character-id:${character.id}`">{{ character.name}}</li>
  </ul>

  <BasePagination v-if="store.paginationInfo.pages" :total-pages="store.paginationInfo.pages" :current-page="currentPage" @change-page-number="fetchAgain" />

</template>

<style scoped>

</style>