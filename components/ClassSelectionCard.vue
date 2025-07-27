<template>
  <div class="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
    <!-- Selection Mode (shown when not confirmed) -->
    <div v-if="!isConfirmed">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
        <button
          class="text-gray-400 hover:text-gray-600 p-1"
          @click="onClose"
          v-if="showCloseButton"
        >
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

      <!-- Loading State for Grades -->
      <div v-if="gradesLoading" class="mb-6">
        <div class="flex space-x-3">
          <div class="px-6 py-3 rounded-full bg-gray-200 animate-pulse w-24 h-10"></div>
          <div class="px-6 py-3 rounded-full bg-gray-200 animate-pulse w-24 h-10"></div>
          <div class="px-6 py-3 rounded-full bg-gray-200 animate-pulse w-24 h-10"></div>
        </div>
      </div>

      <!-- Grade Level Selection -->
      <GradeSelector
        v-else
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
        :disabled="!canConfirm || gradesLoading"
        @confirm="handleConfirm"
      />
    </div>

    <!-- Summary Mode (shown after confirmation) -->
    <div v-else class="flex items-center justify-between">
      <div>
        <h4 class="text-sm font-medium text-gray-900 mb-1">Classe</h4>
        <p class="text-lg font-medium text-gray-900">{{ summaryText }}</p>
      </div>
      <button class="text-gray-400 hover:text-gray-600 p-1" @click="handleEdit">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="m18.5 2.5 3 3L13 14l-4 1 1-4 8.5-8.5z"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  title?: string;
  gradeLevels?: string[];
  bacTypes?: string[];
  selectedGrade?: string | null;
  selectedBacType?: string | null;
  bacTypeTitle?: string;
  confirmButtonText?: string;
  showCloseButton?: boolean;
  gradesLoading?: boolean;
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
  gradesLoading: false,
});

const emit = defineEmits<Emits>();

// Internal state for confirmation
const isConfirmed = ref(false);

// Computed property to check if confirm button should be enabled
const canConfirm = computed(() => {
  return props.selectedGrade !== null && props.selectedBacType !== null;
});

// Computed property for summary text
const summaryText = computed(() => {
  if (props.selectedGrade && props.selectedBacType) {
    return `${props.selectedGrade} ${props.selectedBacType}`;
  }
  return 'Non sélectionné';
});

const handleConfirm = () => {
  isConfirmed.value = true;
  emit('confirm');
};

const handleEdit = () => {
  isConfirmed.value = false;
};

const onClose = () => {
  emit('close');
};
</script>
