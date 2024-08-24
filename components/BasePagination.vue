<script setup>
const props = defineProps({
    totalPages: {
        type: Number,
        required: true,
    },
    currentPage: {
        type: Number,
        required: true,
    },
})

const emits = defineEmits([
    'changePageNumber',
])

const limitPages = computed(() => {

    const numShown = ref(5)
    numShown.value = Math.min(numShown.value, props.totalPages)
    const first = ref(props.currentPage - Math.floor(numShown.value / 2))
    first.value = Math.max(first.value, 1)
    first.value = Math.min(first.value, props.totalPages - numShown.value + 1)
  
    return [
        ...Array(numShown.value),
    ].map((k, i) => i + first.value)

})

</script>

<template>
  <button @click="emits('changePageNumber', 1)">First Page</button>
  <button v-for="pageNumber in limitPages" :key="pageNumber" @click="emits('changePageNumber', pageNumber)"> {{ pageNumber }}</button>
  <button @click="emits('changePageNumber', totalPages)">Last Page</button>
</template>

<style scoped>

</style>