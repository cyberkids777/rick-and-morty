<script setup lang="ts">
const store = useCharacterStore()
const { searchParam, activeFilter, currentPage } = toRefs(store)
const searchInput = ref('')

const emit = defineEmits([
    'on-search-submit',
])

const onSubmit = async () => {
    if (searchParam.value === searchInput.value) return;
    searchParam.value = searchInput.value
    emit('on-search-submit')
}

watch(activeFilter, () => {
    currentPage.value = 1
})

</script>

<template>
  <div>
    <form method="GET" @submit.prevent="onSubmit">
      <label for="input">
        <input
            v-model="searchInput"
            type="text"
            placeholder="Search here"
        >
      </label>

      <label for="search-filter">
        <select
            id="search-filter"
            v-model="activeFilter"
            name="filter"
        >
          <option value="name" selected>Name</option>
          <option value="status" >Alive, Dead or Unknown</option>
          <option value="gender">Gender</option>
        </select>
      </label>
    </form>
  </div>
</template>

<style scoped>

</style>