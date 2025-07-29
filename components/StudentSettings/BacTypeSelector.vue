<template>
  <div>
    <h4
      class="font-['DM_Sans'] font-medium text-[14px] leading-[16px] align-middle mb-[16px]"
    >
      {{ title }}
    </h4>
    <div class="flex flex-wrap gap-3">
      <button
        v-for="type in bacTypes"
        :key="type"
        @click="selectBacType(type)"
        :class="[
          'pt-2 pr-4 pb-2 pl-4 h-[36px] rotate-0 opacity-100 rounded-[24px]',
          selectedBacType === type
            ? 'outline outline-1 outline-black text-center align-middle font-medium text-[16px] leading-[20px] font-[\'DM_Sans\'] px-4 py-2'
            : 'bg-[#F7F3F0] text-center align-middle font-medium text-[16px] leading-[20px] font-[\'DM_Sans\']',
        ]"
      >
        {{ type }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BacType } from "../../types/highSchools/enum";

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
