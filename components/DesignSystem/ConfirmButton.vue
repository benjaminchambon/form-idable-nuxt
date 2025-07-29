<template>
  <button
    :class="[
      'h-[48px] pt-4 pr-6 pb-4 pl-6 gap-2 rotate-0 rounded-[1000px] inline-flex items-center justify-center',
      disabled
        ? 'w-[664px] opacity-50 border border-current cursor-not-allowed'
        : 'w-full bg-black text-white',
    ]"
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
  (e: "confirm"): void;
}

const props = withDefaults(defineProps<Props>(), {
  buttonText: "Confirmer",
  disabled: false,
});

const emit = defineEmits<Emits>();

const onConfirm = () => {
  if (!props.disabled) {
    emit("confirm");
  }
};
</script>
