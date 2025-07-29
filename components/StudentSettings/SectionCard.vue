<template>
  <div
    class="w-[343px] max-w-[720px] gap-6 rounded-[16px] p-4 border border-white bg-[rgba(255,255,255,0.6)] sm:w-[696px] sm:h-[80px] lg:w-[720px] lg:h-[76px] rotate-0 opacity-100"
  >
    <div class="flex items-start justify-between">
      <div class="flex flex-col gap-[4px]">
        <h3
          class="font-['DM_Sans'] font-semibold text-[16px] leading-[1.4] align-middle"
        >
          {{ title }}
        </h3>
        <p
          class="text-[#646A81] font-['DM_Sans'] font-normal text-[14px] leading-[1.4] align-middle"
        >
          {{ subtitle }}
        </p>
      </div>
      <button
        class="[self-start] cursor-pointer"
        @click="onEdit"
        v-if="showEditButton"
      >
        <img src="~/assets/icons/edit.svg" />
      </button>
    </div>

    <div v-if="$slots.default" class="mt-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit } from "lucide-vue-next";

interface Props {
  title: string;
  subtitle?: string;
  showEditButton?: boolean;
}

interface Emits {
  (e: "edit"): void;
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: "À compléter",
  showEditButton: true,
});

const emit = defineEmits<Emits>();

const onEdit = () => {
  emit("edit");
};
</script>
