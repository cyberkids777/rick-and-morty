<script setup>
import { useCharacterStore } from '~/stores/characterStore';

const store = useCharacterStore()

</script>

<template>
  <div>
    <BaseSearch @on-search-submit="store.fetchCharacters" />
    <NuxtPage />
  </div>
</template>
