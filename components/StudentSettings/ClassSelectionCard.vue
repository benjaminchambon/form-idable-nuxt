<template>
  <div
    class="flex flex-col w-[343px] max-w-[720px] gap-6 rounded-2xl p-4 bg-white sm:w-[696px] lg:w-[720px] rotate-0 opacity-100"
    v-if="!isConfirmed"
  >
    <div class="flex items-center justify-between">
      <h3
        class="font-bold text-[16px] leading-[20px] align-middle font-dm-sans"
      >
        {{ title }}
      </h3>
      <button
        class="text-gray-400 hover:text-gray-600 cursor-pointer"
        @click="onClose"
        v-if="showCloseButton"
      >
        <img src="~/assets/icons/cross.svg" />
      </button>
    </div>

    <div v-if="loading" class="mb-6">
      <div class="flex flex-col items-center justify-center py-8">
        <div class="flex items-center space-x-3 mb-4">
          <Loader2 :size="24" class="text-gray-400 animate-spin" />
          <span class="text-gray-600 font-medium"
            >Chargement des classes...</span
          >
        </div>

        <div class="flex space-x-3 w-full justify-center">
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
    </div>

    <GradeSelector
      v-else
      :gradeLevels="gradeLevels"
      :selectedGrade="selectedGrade"
      @update:selectedGrade="$emit('update:selectedGrade', $event)"
      @gradeSelected="$emit('gradeSelected', $event)"
    />

    <div class="w-[100%] h-px opacity-20 bg-black"></div>

    <BacTypeSelector
      :bacTypes="bacTypes"
      :selectedBacType="selectedBacType"
      :title="bacTypeTitle"
      @update:selectedBacType="$emit('update:selectedBacType', $event)"
      @bacTypeSelected="$emit('bacTypeSelected', $event)"
    />

    <ConfirmButton
      :buttonText="confirmButtonText"
      :disabled="!canConfirm || loading"
      @confirm="handleConfirm"
    />
  </div>

  <div
    v-else
    class="flex justify-between items-start w-[343px] sm:w-[696px] lg:w-[720px] h-[76px] max-w-[720px] gap-6 p-4 rounded-[16px] rotate-0 opacity-100 bg-white"
  >
    <div>
      <h4
        class="font-normal text-sm leading-[1.4] tracking-normal align-middle font-dm-sans text-[#646A81]"
      >
        Classe
      </h4>
      <p
        class="font-semibold text-base leading-[1.4] tracking-normal align-middle font-dm-sans"
      >
        {{ summaryText }}
      </p>
    </div>
    <button
      class="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
      @click="handleEdit"
    >
      <img src="~/assets/icons/edit.svg" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Grade, BacType } from "../../types/highSchools/enum";
import { X, Edit, Loader2 } from "lucide-vue-next";
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
  loading?: boolean;
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
  loading: false,
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
