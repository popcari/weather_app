<template>
  <header class="sticky top-0 bg-teal-400 shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 py-4 text-white">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-2 flex-1">
          <i class="fa-solid fa-snowflake text-xl"></i>
          <p class="text-xl">The local weather</p>
        </div>
      </RouterLink>
      <div class="flex gap-2 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info hover:text-teal-500 duration-300 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i class="fa-solid fa-plus hover:text-teal-500 duration-300 cursor-pointer"></i>
      </div>
      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <h1 class="text-black">lorem</h1>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import BaseModal from './BaseModal.vue'

const modalActive = ref(null)
const toggleModal = () => {
  modalActive.value = !modalActive.value
}
</script>
