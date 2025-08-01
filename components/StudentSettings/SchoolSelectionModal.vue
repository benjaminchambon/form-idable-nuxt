<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
      @click="closeModal"
    >
      <div
        class="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden"
        @click.stop
      >
        <div
          class="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100"
        >
          <h3 class="text-lg font-medium text-gray-900">
            Choisir un établissement
          </h3>
          <button
            class="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            @click="closeModal"
          >
            <X :size="20" />
          </button>
        </div>

        <div v-if="schoolsLoading" class="p-6 text-center">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"
          ></div>
          <p class="text-gray-600">Chargement des établissements...</p>
        </div>

        <div v-else-if="schoolsError" class="p-6 text-center">
          <p class="text-red-600">
            Erreur lors du chargement des établissements
          </p>
        </div>

        <div v-else class="p-5 sm:p-6 max-h-[60vh] overflow-y-auto">
          <div class="space-y-3">
            <button
              v-for="school in schools"
              :key="school.id"
              @click="selectSchool(school)"
              :class="[
                'w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer',
                selectedSchoolId === school.id
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300',
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
                  <Check :size="12" class="text-white" />
                </div>
              </div>
            </button>
          </div>

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
import { ref, watch } from "vue";
import type { HighSchool } from "../../types/highSchools/highSchools";
import { X, Check } from "lucide-vue-next";
import ConfirmButton from "../DesignSystem/ConfirmButton.vue";

interface Props {
  isVisible: boolean;
  schools: HighSchool[];
  schoolsLoading: boolean;
  schoolsError: any;
  currentSchool?: HighSchool | null;
}

interface Emits {
  (e: "close"): void;
  (e: "selectSchool", school: HighSchool): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const selectedSchoolId = ref<string | null>(null);

watch(
  () => props.isVisible,
  (visible) => {
    if (visible && props.currentSchool) {
      selectedSchoolId.value = props.currentSchool.id;
    }
  }
);

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
  const selectedSchool = props.schools.find(
    (school) => school.id === selectedSchoolId.value
  );
  if (selectedSchool) {
    emit("selectSchool", selectedSchool);
    closeModal();
  }
};

const closeModal = () => {
  selectedSchoolId.value = null;
  emit("close");
};
</script>
