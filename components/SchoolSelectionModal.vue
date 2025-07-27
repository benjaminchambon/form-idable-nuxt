<template>
  <!-- Modal Overlay -->
  <Teleport to="body">
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
      @click="closeModal"
    >
      <!-- Modal Content -->
      <div
        class="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100">
          <h3 class="text-lg font-medium text-gray-900">Choisir un établissement</h3>
          <button class="text-gray-400 hover:text-gray-600 p-1" @click="closeModal">
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

        <!-- Loading State -->
        <div v-if="schoolsLoading" class="p-6 text-center">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"
          ></div>
          <p class="text-gray-600">Chargement des établissements...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="schoolsError" class="p-6 text-center">
          <p class="text-red-600">Erreur lors du chargement des établissements</p>
        </div>

        <!-- Schools List -->
        <div v-else class="p-5 sm:p-6 max-h-[60vh] overflow-y-auto">
          <div class="space-y-3">
            <button
              v-for="school in schools"
              :key="school.id"
              @click="selectSchool(school)"
              :class="[
                'w-full text-left p-4 rounded-2xl border-2 transition-all duration-200',
                selectedSchoolId === school.id
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50',
              ]"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-medium text-gray-900">{{ school.name }}</h4>
                  <p class="text-sm text-gray-500 mt-1">{{ school.id }}</p>
                </div>
                <div
                  v-if="selectedSchoolId === school.id"
                  class="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    stroke-width="3"
                  >
                    <polyline points="20,6 9,17 4,12"></polyline>
                  </svg>
                </div>
              </div>
            </button>
          </div>

          <!-- Confirm Button -->
          <div class="mt-6 pt-4 border-t border-gray-100">
            <ConfirmButton
              button-text="Confirmer la sélection"
              :disabled="!selectedSchoolId"
              @confirm="confirmSelection"
            />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { HighSchool } from '../types/highSchools';

interface Props {
  isVisible: boolean;
  schools: HighSchool[];
  schoolsLoading: boolean;
  schoolsError: any;
  currentSchool?: HighSchool | null;
}

interface Emits {
  (e: 'close'): void;
  (e: 'selectSchool', school: HighSchool): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const selectedSchoolId = ref<string | null>(null);

// Set initial selection when modal opens
watch(
  () => props.isVisible,
  (visible) => {
    if (visible && props.currentSchool) {
      selectedSchoolId.value = props.currentSchool.id;
    }
  }
);

// Set initial selection when current school changes
watch(
  () => props.currentSchool,
  (school) => {
    if (school && props.isVisible) {
      selectedSchoolId.value = school.id;
    }
  }
);

const selectSchool = (school: HighSchool) => {
  selectedSchoolId.value = school.id;
};

const confirmSelection = () => {
  const selectedSchool = props.schools.find((school) => school.id === selectedSchoolId.value);
  if (selectedSchool) {
    emit('selectSchool', selectedSchool);
    closeModal();
  }
};

const closeModal = () => {
  selectedSchoolId.value = null;
  emit('close');
};
</script>
