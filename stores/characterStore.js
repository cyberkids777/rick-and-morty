import { defineStore } from 'pinia';

export const useCharacterStore = defineStore('CharacterStore', {
    state: () => ({
        characterList: [],
        paginationInfo: {
        },
        favCharactersList: [],

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
            if (this.favCharactersList.find(({ id }) => id === payload.id, // skrócony zapis funckji anonimowej, uzywany tylko wtedy gdy funkcja zwraca tylko JEDNA wartosc

            )) return

            this.favCharactersList.push(payload);
        },
    },

})