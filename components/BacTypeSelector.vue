<template>
  <div class="mb-8">
    <h4 class="text-sm font-medium text-gray-900 mb-4">{{ title }}</h4>
    <div class="flex flex-wrap gap-3">
      <button
        v-for="type in bacTypes"
        :key="type"
        @click="selectBacType(type)"
        :class="[
          'px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 min-w-0 flex-shrink-0 cursor-pointer',
          selectedBacType === type
            ? 'bg-gray-900 text-white shadow-lg'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200',
        ]"
      >
        {{ type }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BacType } from "../types/highSchools";

interface Props {
  bacTypes?: string[];
  selectedBacType?: string | null;
  title?: string;
}

interface Emits {
  (e: "update:selectedBacType", value: string): void;
  (e: "bacTypeSelected", value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  bacTypes: () => Object.values(BacType),
  selectedBacType: null,
  title: "Type de bac",
});

const emit = defineEmits<Emits>();

const selectBacType = (type: string) => {
  emit("update:selectedBacType", type);
  emit("bacTypeSelected", type);
};
</script>
