<template>
  <div class="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
        <p class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
      </div>
      <button
        class="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
        @click="onEdit"
        v-if="showEditButton"
      >
        <Edit :size="20" />
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
