<template>
  <div class="flex flex-col text-white">
    <SiteNavivation></SiteNavivation>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteNavivation from './components/SiteNavivation.vue'
</script>

<style scoped></style>
