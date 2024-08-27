<script setup>
const store = useCharacterStore()
</script>

<template>
  <div>
    <h2>Favourite Characters Page</h2>
    <NuxtLink to="/">Back</NuxtLink>
    <ul v-if="store.favCharactersList">
      <li
          v-for="character in store.favCharactersList"
          :key="`character-id:${character.id}`"
      >
        {{ character.name }}
        <button @click="store.removeFromFavCharacterList(character)">
          Remove From Favourites
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>