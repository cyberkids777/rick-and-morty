import { defineStore } from 'pinia';

export const useCharacterStore = defineStore('CharacterStore', {
    state: () => ({
        activeFilter: 'name',
        currentPage: 1,
        currentTab: 'All Characters',
        searchParam: '',
        characterList: [],
        paginationInfo: {
        },
        favCharactersList: [],
        isLoading: true,
        isError: false,
    }),
    actions: {
        addCharacters(payload) {
            this.characterList = payload;
        },
        addPagination(payload) {
            this.paginationInfo = payload;
        },
        addToFavCharacterList(payload) {
            // Uzyj .fing zeby przyrownac idki
            if (this.favCharactersList.find(({ id }) => id === payload.id))
                return
            this.favCharactersList.push(payload)
            localStorage.setItem('favCharacterList', JSON.stringify(this.favCharactersList))
        },
        readFromStorage() {
            const localStorageData = JSON.parse(localStorage.getItem('favCharacterList'))

            if (!localStorageData) return
            this.favCharactersList = localStorageData
        },

        async fetchCharacters() {
            this.isError = false //flagi, boolean, ktory swiadczy o stanie
            this.isLoading = true
            try {
                const response = await $fetch('https://rickandmortyapi.com/api/character/', {
                    query: { // query: to ogólnie parametry przekazywane w zapytaniu do api
                        page: this.currentPage, // Inaczej ?page=pageNumber
                        [this.activeFilter]: this.searchParam,
                    },
                })
                if (!response) return // Zakoncz funkcje kiedy brak danych
                this.addCharacters(response.results)
                this.addPagination(response.info)
            } catch (e) {
                this.isError = true
                if (e.status === 400) console.log('Błędne zapytanie')
                if (e.status === 401) console.log('Zaloguj się żeby kontynuować')
                if (e.status === 403) console.log('Brak dostępu')
                if (e.status === 404) console.log('Nie znaleziono strony')
                if (e.status === 500) console.log('Serwer się wyjebał')
            } finally {
                this.isLoading = false
            }

        },
        removeFromFavCharacterList(payload) {
            this.favCharactersList = this.favCharactersList.filter(({ id }) => id !== payload.id)
            localStorage.setItem('favCharacterList', JSON.stringify(this.favCharactersList))
        },
    },

})