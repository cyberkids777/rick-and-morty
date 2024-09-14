<script setup>
import { useCharacterStore } from '~/stores/characterStore';
import BaseTabs from '~/components/BaseTabs.vue';

const store = useCharacterStore()

</script>

<template>
  <div class="font-poppins font-500">
    <BaseSearch @on-search-submit="store.fetchCharacters" />
    <BaseTabs />
  </div>
</template>

<style>
body {
  margin: 0;
}
</style>