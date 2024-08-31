<script setup>
import { useCharacterStore } from '~/stores/characterStore.js';
import BaseCharacters from '~/components/BaseCharacters.vue';
import FavouriteCharacters from '~/components/FavouriteCharacters.vue';

const store = useCharacterStore();

const tabs = {
    'All Characters': BaseCharacters,
    'Favourite Characters': FavouriteCharacters,
}
</script>

<template>
 <div>
   <button
       v-for="(_, tab) in tabs"
       :key="tab"
       @click="store.currentTab = tab"
   >
     {{ tab }}
   </button>
   <KeepAlive>
     <component :is="tabs[store.currentTab]" />
   </KeepAlive>
 </div>
</template>

<style scoped>

</style>