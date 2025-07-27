<template>
  <div class="mb-6">
    <div class="flex flex-wrap gap-3">
      <button
        v-for="level in gradeLevels"
        :key="level"
        @click="selectGrade(level)"
        :class="[
          'px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 min-w-0 flex-shrink-0',
          selectedGrade === level
            ? 'bg-gray-900 text-white shadow-lg'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200',
        ]"
      >
        {{ level }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  gradeLevels?: string[];
  selectedGrade?: string | null;
}

interface Emits {
  (e: 'update:selectedGrade', value: string): void;
  (e: 'gradeSelected', value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  gradeLevels: () => ['Seconde', 'Première', 'Terminale'],
  selectedGrade: null,
});

const emit = defineEmits<Emits>();

const selectGrade = (grade: string) => {
  emit('update:selectedGrade', grade);
  emit('gradeSelected', grade);
};
</script>
