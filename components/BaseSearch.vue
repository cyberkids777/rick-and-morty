<script setup lang="ts">
const inputData = ref('')
const selected = ref('name')

const emits = defineEmits([
    'searchCharacters',
    'setSearchFilter',
])

const searchCharacters = () => {
    emits('searchCharacters', inputData.value)
}

const setSearchFilter = () => {
    emits('setSearchFilter', selected.value)
}

</script>

<template>
  <div>
    <form action="" @submit.prevent>
      <label for="input">
        <input
            v-model="inputData"
            type="text"
            placeholder="Search here"
            @keyup.enter="searchCharacters"
        >
      </label>

      <label for="search-filter">
        <select id="search-filter" v-model="selected" name="filter" @change="setSearchFilter">
          <option value="name">Name</option>
          <option value="status">Alive, Dead or Unknown</option>
          <option value="gender">Gender</option>
        </select>
      </label>
    </form>
  </div>
</template>

<style scoped>

</style>