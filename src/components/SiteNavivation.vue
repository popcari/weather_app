<template>
  <header class="sticky top-0 bg-slate-400 shadow-md z-10">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 py-4 text-white">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-2 flex-1">
          <i class="fa-solid fa-snowflake text-xl"></i>
          <div class="text-xl flex gap-2">
            <strong>{{ day }}</strong>
            <h2>{{ date }}</h2>
            <h2>{{ month }}</h2>
            <h2>{{ year }}</h2>
          </div>
        </div>
      </RouterLink>
      <div class="flex gap-2 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info hover:text-slate-600 duration-300 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i class="fa-solid fa-plus hover:text-slate-600 duration-300 cursor-pointer"></i>
      </div>
      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <h1 class="text-black">lorem</h1>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import BaseModal from './BaseModal.vue'

const modalActive = ref(null)
const toggleModal = () => {
  modalActive.value = !modalActive.value
}
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
const today = ref(null)

today.value = new Date()
const day = computed(() => {
  return dayNames[today.value.getDay()]
})
const date = computed(() => {
  return today.value.getDate()
})
const month = computed(() => {
  return monthNames[today.value.getMonth()]
})
const year = computed(() => {
  return today.value.getFullYear()
})
</script>
