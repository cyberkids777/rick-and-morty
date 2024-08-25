<script setup>
const emit = defineEmits([
    'onPageChange',
])
const props = defineProps({
    totalPages: {
        type: Number,
        required: true,
    },
})
const store = useCharacterStore()
const { currentPage } = toRefs(store)

const limitPages = computed(() => {

    const numShown = ref(5)
    numShown.value = Math.min(numShown.value, props.totalPages)
    const first = ref(currentPage.value - Math.floor(numShown.value / 2))
    first.value = Math.max(first.value, 1)
    first.value = Math.min(first.value, props.totalPages - numShown.value + 1)
  
    return [
        ...Array(numShown.value),
    ].map((k, i) => i + first.value)

})

const setPage = (pageNumber) => {
    currentPage.value = pageNumber
    emit('onPageChange')
}

</script>

<template>
  <button @click="setPage(1)">
    First Page
  </button>
  <button
      v-for="pageNumber in limitPages" :key="pageNumber"
      @click="setPage(pageNumber)"
  >
    {{ pageNumber }}
  </button>
  <button @click="setPage(totalPages)">
    Last Page
  </button>
</template>