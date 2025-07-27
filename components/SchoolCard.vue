<template>
  <div
    class="relative bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 rounded-2xl p-5 sm:p-6 text-white"
  >
    <div>
      <h2 class="text-xl font-semibold mb-2">{{ schoolName }}</h2>
      <div class="flex items-center space-x-4 text-sm opacity-90">
        <div class="flex items-center space-x-1">
          <div class="w-1 h-1 bg-white rounded-full"></div>
          <span>{{ city }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <div class="w-1 h-1 bg-white rounded-full"></div>
          <span>{{ schoolType }}</span>
        </div>
      </div>
    </div>
    <button
      class="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm"
      @click="onModify"
    >
      {{ modifyButtonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  schoolName: string;
  city: string;
  schoolType: string;
  modifyButtonText?: string;
}

interface Emits {
  (e: 'modify'): void;
}

const props = withDefaults(defineProps<Props>(), {
  modifyButtonText: 'Modifier',
});

const emit = defineEmits<Emits>();

const onModify = () => {
  emit('modify');
};
</script>
