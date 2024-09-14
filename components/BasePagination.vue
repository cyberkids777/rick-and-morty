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
<div>
  <div class="flex items-center max-w-[1400px] mx-auto">

    <button
        class="style-reset cursor-pointer  m-r-4px border-solid border-thirdiary w-40px h-40px border-1px rounded-md"
        @click="setPage(1)"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_5_202)">
          <path d="M10.6667 3.33334V12.6667L3.33335 8L10.6667 3.33334Z" fill="#A9B1BD"/>
        </g>
        <defs>
          <clipPath id="clip0_5_202">
            <rect width="16" height="16" fill="white" transform="matrix(-1 0 0 1 16 0)"/>
          </clipPath>
        </defs>
      </svg>
    </button>

    <button
        v-for="pageNumber in limitPages" :key="pageNumber"
        class="style-reset cursor-pointer poppins-500 text-base border-solid mx-4px w-40px h-40px border-1px rounded-md hover:border-primary hover:text-primary"
        :class="[currentPage === pageNumber ? 'border-primary bg-primary text-white hover:text-white' : 'border-thirdiary']"
        @click="setPage(pageNumber)"
    >
      {{ pageNumber }}
    </button>

    <button
        class="style-reset cursor-pointer m-l-4px border-solid border-1px border-thirdiary w-40px h-40px rounded-md"
        @click="setPage(totalPages)"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_5_218)">
          <path d="M5.33334 3.33334V12.6667L12.6667 8L5.33334 3.33334Z" fill="#11B0C8"/>
        </g>
        <defs>
          <clipPath id="clip0_5_218">
            <rect width="16" height="16" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </button>

  </div>
</div>
</template>