<script setup>
import { useCharacterStore } from '~/stores/characterStore';
import BaseTabs from '~/components/BaseTabs.vue';

const store = useCharacterStore()

</script>

<template>
  <div>
    <BaseSearch @on-search-submit="store.fetchCharacters" />
    <BaseTabs />
  </div>
</template>
