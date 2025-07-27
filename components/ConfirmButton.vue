<template>
  <button
    class="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 px-6 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
    @click="onConfirm"
    :disabled="disabled"
  >
    {{ buttonText }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  buttonText?: string;
  disabled?: boolean;
}

interface Emits {
  (e: 'confirm'): void;
}

const props = withDefaults(defineProps<Props>(), {
  buttonText: 'Confirmer',
  disabled: false,
});

const emit = defineEmits<Emits>();

const onConfirm = () => {
  if (!props.disabled) {
    emit('confirm');
  }
};
</script>
