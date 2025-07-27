<template>
  <div class="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
      <button class="text-gray-400 hover:text-gray-600 p-1" @click="onClose" v-if="showCloseButton">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Grade Level Selection -->
    <GradeSelector
      :gradeLevels="gradeLevels"
      :selectedGrade="selectedGrade"
      @update:selectedGrade="$emit('update:selectedGrade', $event)"
      @gradeSelected="$emit('gradeSelected', $event)"
    />

    <!-- Bac Type Selection -->
    <BacTypeSelector
      :bacTypes="bacTypes"
      :selectedBacType="selectedBacType"
      :title="bacTypeTitle"
      @update:selectedBacType="$emit('update:selectedBacType', $event)"
      @bacTypeSelected="$emit('bacTypeSelected', $event)"
    />

    <!-- Confirm Button -->
    <ConfirmButton
      :buttonText="confirmButtonText"
      :disabled="!canConfirm"
      @confirm="$emit('confirm')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title?: string;
  gradeLevels?: string[];
  bacTypes?: string[];
  selectedGrade?: string | null;
  selectedBacType?: string | null;
  bacTypeTitle?: string;
  confirmButtonText?: string;
  showCloseButton?: boolean;
}

interface Emits {
  (e: 'update:selectedGrade', value: string): void;
  (e: 'update:selectedBacType', value: string): void;
  (e: 'gradeSelected', value: string): void;
  (e: 'bacTypeSelected', value: string): void;
  (e: 'confirm'): void;
  (e: 'close'): void;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'En quelle classe es-tu ?',
  gradeLevels: () => ['Seconde', 'Première', 'Terminale'],
  bacTypes: () => ['Général', 'Technologique', 'Professionnel'],
  selectedGrade: null,
  selectedBacType: null,
  bacTypeTitle: 'Type de bac',
  confirmButtonText: 'Confirmer',
  showCloseButton: true,
});

const emit = defineEmits<Emits>();

// Computed property to check if confirm button should be enabled
const canConfirm = computed(() => {
  return props.selectedGrade !== null && props.selectedBacType !== null;
});

const onClose = () => {
  emit('close');
};
</script>
