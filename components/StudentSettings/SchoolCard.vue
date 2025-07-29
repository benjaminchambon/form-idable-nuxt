<template>
  <div
    class="school-card-container relative flex flex-col sm:flex-row items-start justify-between w-[343px] max-w-[720px] h-[136px] sm:w-[696px] lg:w-[720px] sm:h-[80px] p-4 gap-6 rounded-[24px] overflow-hidden"
  >
    <div class="flex flex-col gap-2 relative z-10">
      <label
        class="font-dm-sans font-bold text-[20px] leading-[24px] tracking-[-0.02em] align-middle text-white"
      >
        {{ schoolName }}
      </label>
      <div class="flex gap-[8px]">
        <div class="flex items-center gap-[4px]">
          <img
            src="~/assets/icons/map-pin.svg"
            alt="Localisation"
            class="w-3 h-3 flex-shrink-0"
          />
          <label
            class="font-dm-sans font-normal text-[14px] leading-[16px] tracking-normal align-middle text-white/90"
          >
            Lille
          </label>
        </div>
        <div class="flex items-center gap-[4px]">
          <img
            src="~/assets/icons/building.svg"
            alt="Localisation"
            class="w-3 h-3 flex-shrink-0"
          />
          <label
            class="font-dm-sans font-normal text-[14px] leading-[16px] tracking-normal align-middle text-white/90"
          >
            Lycée Public
          </label>
        </div>
      </div>
    </div>

    <button
      class="w-[79px] h-[32px] px-3 py-2 rounded-full bg-white text-black font-dm-sans font-medium text-[14px] leading-[16px] tracking-normal text-center align-middle shadow hover:bg-gray-50 transition-colors relative z-10"
      @click="onModify"
    >
      {{ modifyButtonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  schoolName: string;
  modifyButtonText?: string;
}

interface Emits {
  (e: "modify"): void;
}

const props = withDefaults(defineProps<Props>(), {
  modifyButtonText: "Modifier",
});

const emit = defineEmits<Emits>();

const onModify = () => {
  emit("modify");
};
</script>

<style scoped>
.school-card-container {
  position: relative;
}

.school-card-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, #fb923c, #f472b6, #a855f7);
  border-radius: 24px;
  filter: blur(2px); /* Ajustez la valeur selon vos besoins */
  z-index: 1;
}

/* Alternative avec backdrop-filter si vous préférez */
.school-card-container-backdrop {
  position: relative;
  backdrop-filter: blur(10px);
}

.school-card-container-backdrop::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to right,
    rgba(251, 146, 60, 0.8),
    rgba(244, 114, 182, 0.8),
    rgba(168, 85, 247, 0.8)
  );
  border-radius: 24px;
  z-index: 1;
}
</style>
