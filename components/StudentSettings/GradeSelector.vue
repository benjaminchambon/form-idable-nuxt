<template>
  <div>
    <div class="flex flex-wrap gap-3">
      <button
        v-for="level in gradeLevels"
        :key="level"
        @click="selectGrade(level)"
        :class="[
          'pt-2 pr-4 pb-2 pl-4 h-[36px] rotate-0 opacity-100 rounded-[24px]',
          selectedGrade === level
            ? 'outline outline-1 outline-black text-center align-middle font-medium text-[16px] leading-[20px] font-[\'DM_Sans\'] px-4 py-2'
            : 'bg-[#F7F3F0] text-center align-middle font-medium text-[16px] leading-[20px] font-[\'DM_Sans\']',
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
  (e: "update:selectedGrade", value: string): void;
  (e: "gradeSelected", value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  gradeLevels: () => ["Seconde", "Première", "Terminale"],
  selectedGrade: null,
});

const emit = defineEmits<Emits>();

const selectGrade = (grade: string) => {
  emit("update:selectedGrade", grade);
  emit("gradeSelected", grade);
};
</script>
