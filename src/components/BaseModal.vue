<template>
  <Transition name="fade">
    <div
      v-show="modalActive"
      class="absolute w-full h-screen top-0 left-0 flex justify-center px-8 bg-black bg-opacity-50"
    >
      <Transition name="inner">
        <div v-if="modalActive" class="w-1/2 p-4 bg-white rounded self-start mt-32 max-w-screen-md">
          <header class="text-slate-400 mb-4 flex justify-between items-center">
            <h3>Information</h3>
            <i
              class="fa-solid fa-xmark p-2 rounded-full cursor-pointer hover:bg-gray-200 transition-all duration-200"
              @click="$emit('close-modal')"
            ></i>
          </header>
          <slot />
          <div class="buttonGroup mt-8 flex justify-end gap-4">
            <button
              class="rounded text-zinc-400 border border-zinc-500 hover:bg-zinc-300 hover:text-black transition-all duration-300 py-2 px-6"
              @click="$emit('close-modal')"
            >
              Agree
            </button>
            <button
              class="rounded text-white bg-teal-400 hover:bg-teal-500 transition-all duration-300 py-2 px-6"
              @click="$emit('close-modal')"
            >
              Close
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineEmits(['close-modal'])
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.inner-enter-active {
  transition: all 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0.1s;
}

.inner-leave-active {
  transition: all 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}

.inner-enter-from {
  opacity: 0;
  transform: scale(0.1);
}
.inner-leave-to {
  transform: scale(0.9);
}
</style>
