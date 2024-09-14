<script setup>
import { useCharacterStore } from '~/stores/characterStore.js';
import BaseCharacters from '~/components/BaseCharacters.vue';
import FavouriteCharacters from '~/components/FavouriteCharacters.vue';

const store = useCharacterStore();

const tabs = {
    'All Characters': BaseCharacters,
    'Favourite Characters': FavouriteCharacters,
}

// zdefinować popins w configu i wrzucic kolor jako kolor primary
</script>

<template>
 <div class="p-t-[57px] p-b-[24px]">
   <div class="max-w-[1400px] mx-auto">
     <button
         v-for="(_, tab) in tabs"
         :key="tab"
         class="style-reset cursor-pointer hover:color-primary poppins-500 text-base ml-40px first-of-type:ml-0"
         :class="{'color-primary border-b-solid border-primary border-b-3px': store.currentTab === tab}"
         @click="store.currentTab = tab"
     >
       {{ tab }}
     </button>
   </div>
 </div>
   <KeepAlive>
     <component :is="tabs[store.currentTab]" />
   </KeepAlive>
</template>

<style scoped>

</style>