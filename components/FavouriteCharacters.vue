<script setup>
const store = useCharacterStore()
</script>

<template>

  <div>

    <ul
        v-if="store.favCharactersList.length > 0"
        class="list-none m-x-auto max-w-[1400px] p-0"
    >
      <li
          v-for="character in store.favCharactersList"
          :key="`character-id:${character.id}`"
          class="flex justify-start items-center border-b-solid border-secondary border-b max-h-[76px]"
      >
        <div
            class="m-y-8px flex-c-1"
        >
          <img
              :src="character.image" :alt="`Picture of ${character.name}`"
              class="object-cover align-mid justify-center"
              :class="[character.status === 'Dead' ? 'grayscale': 'grayscale-0']"
              width="43"
              height="68"
          >
        </div>

        <p class="flex-c-2">{{ character.id }}</p>
        <p class="flex-c-3">{{ character.name }}</p>

        <div
            v-if="character.gender === 'Male'"
            class="flex items-center flex-c-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_6_4)">
              <path d="M9.5 11C11.43 11 13 12.57 13 14.5C13 16.43 11.43 18 9.5 18C7.57 18 6 16.43 6 14.5C6 12.57 7.57 11 9.5 11ZM9.5 9C6.46 9 4 11.46 4 14.5C4 17.54 6.46 20 9.5 20C12.54 20 15 17.54 15 14.5C15 13.34 14.64 12.27 14.03 11.38L18 7.42V10H20V4H14V6H16.58L12.61 9.97C11.73 9.36 10.66 9 9.5 9Z" fill="#A9B1BD"/>
            </g>
            <defs>
              <clipPath id="clip0_6_4">
                <rect width="24" height="24" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <p> {{ character.gender}}</p>
        </div>

        <div
            v-else-if="character.gender === 'Female'"
            class="flex items-center flex-c-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_6_7)">
              <path d="M17.5 9.5C17.5 6.46 15.04 4 12 4C8.96 4 6.5 6.46 6.5 9.5C6.5 12.2 8.44 14.43 11 14.9V17H9V19H11V21H13V19H15V17H13V14.9C15.56 14.43 17.5 12.2 17.5 9.5ZM8.5 9.5C8.5 7.57 10.07 6 12 6C13.93 6 15.5 7.57 15.5 9.5C15.5 11.43 13.93 13 12 13C10.07 13 8.5 11.43 8.5 9.5Z" fill="#A9B1BD"/>
            </g>
            <defs>
              <clipPath id="clip0_6_7">
                <rect width="24" height="24" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <p> {{ character.gender}}</p>
        </div>

        <div
            v-else
            class="flex items-center flex-c-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_6_13)">
              <path d="M19 13H5V11H19V13Z" fill="#A9B1BD"/>
            </g>
            <defs>
              <clipPath id="clip0_6_13">
                <rect width="24" height="24" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <p> {{ character.gender}}</p>
        </div>

        <p class="flex-c-2">{{ character.species }}</p>
        <p class="flex-c-2">E{{ character.episode[character.episode.length - 1].split('/')[5] }}</p>

        <div class="flex-c-2">
          <button
              class="style-reset cursor-pointer border-solid border-3px border-primary rounded-lg w-43px h-43px"
              :class="{'bg-primary': store.isCharacterFavourite(character.id)}"
              @click="store.removeFromFavCharacterList(character)"
          >

            <svg class="fill-primary" :class="{'fill-white': store.isCharacterFavourite(character.id)}" width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 18.4847L19.416 23L17.448 14.49L24 8.76421L15.372 8.02579L12 0L8.628 8.02579L0 8.76421L6.552 14.49L4.584 23L12 18.4847Z"/>
            </svg>

          </button>
        </div>

      </li>
    </ul>

    <p
        v-else
        class="text-align-center"
    >
      Favourite Characters list is currently empty
    </p>

  </div>

</template>

<style scoped>

</style>