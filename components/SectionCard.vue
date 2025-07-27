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
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
          ></path>
          <path d="m18.5 2.5 3 3L13 14l-4 1 1-4 8.5-8.5z"></path>
        </svg>
      </button>
    </div>

    <div v-if="$slots.default" class="mt-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
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
