<template>
  <div class="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
    <div v-if="!isConfirmed">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
        <button
          class="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
          @click="onClose"
          v-if="showCloseButton"
        >
          <X :size="20" />
        </button>
      </div>

      <div v-if="gradesLoading" class="mb-6">
        <div class="flex space-x-3">
          <div
            class="px-6 py-3 rounded-full bg-gray-200 animate-pulse w-24 h-10"
          ></div>
          <div
            class="px-6 py-3 rounded-full bg-gray-200 animate-pulse w-24 h-10"
          ></div>
          <div
            class="px-6 py-3 rounded-full bg-gray-200 animate-pulse w-24 h-10"
          ></div>
        </div>
      </div>

      <GradeSelector
        v-else
        :gradeLevels="gradeLevels"
        :selectedGrade="selectedGrade"
        @update:selectedGrade="$emit('update:selectedGrade', $event)"
        @gradeSelected="$emit('gradeSelected', $event)"
      />

      <BacTypeSelector
        :bacTypes="bacTypes"
        :selectedBacType="selectedBacType"
        :title="bacTypeTitle"
        @update:selectedBacType="$emit('update:selectedBacType', $event)"
        @bacTypeSelected="$emit('bacTypeSelected', $event)"
      />

      <ConfirmButton
        :buttonText="confirmButtonText"
        :disabled="!canConfirm || gradesLoading"
        @confirm="handleConfirm"
      />
    </div>

    <div v-else class="flex items-center justify-between">
      <div>
        <h4 class="text-sm font-medium text-gray-900 mb-1">Classe</h4>
        <p class="text-lg font-medium text-gray-900">{{ summaryText }}</p>
      </div>
      <button
        class="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
        @click="handleEdit"
      >
        <Edit :size="20" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Grade, BacType } from "../../types/highSchools/enum";
import { X, Edit } from "lucide-vue-next";
import BacTypeSelector from "./BacTypeSelector.vue";
import GradeSelector from "./GradeSelector.vue";
import ConfirmButton from "../DesignSystem/ConfirmButton.vue";

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
  (e: "update:selectedGrade", value: string): void;
  (e: "update:selectedBacType", value: string): void;
  (e: "gradeSelected", value: string): void;
  (e: "bacTypeSelected", value: string): void;
  (e: "confirm"): void;
  (e: "close"): void;
}

const props = withDefaults(defineProps<Props>(), {
  title: "En quelle classe es-tu ?",
  gradeLevels: () => Object.values(Grade),
  bacTypes: () => Object.values(BacType),
  selectedGrade: null,
  selectedBacType: null,
  bacTypeTitle: "Type de bac",
  confirmButtonText: "Confirmer",
  showCloseButton: true,
  gradesLoading: false,
});

const emit = defineEmits<Emits>();

const isConfirmed = ref(false);

const canConfirm = computed(() => {
  return props.selectedGrade !== null && props.selectedBacType !== null;
});

const summaryText = computed(() => {
  if (props.selectedGrade && props.selectedBacType) {
    return `${props.selectedGrade} ${props.selectedBacType}`;
  }
  return "Non sélectionné";
});

const handleConfirm = () => {
  isConfirmed.value = true;
  emit("confirm");
};

const handleEdit = () => {
  isConfirmed.value = false;
};

const onClose = () => {
  isConfirmed.value = true;
  emit("close");
};
</script>
