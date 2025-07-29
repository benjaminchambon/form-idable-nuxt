<template>
  <div class="pb-20 gap-8 lg:gap-10 flex flex-col">
    <div
      class="flex items-center w-[100%] h-[60px] gap-3 p-4 sm:px-6 sm:py-4 lg:px-15 lg:py-4 border-b-2 border-current border-b-[rgba(27,27,27,0.1)] rotate-0 opacity-100"
    >
      <img src="~/assets/icons/logo.svg" />
    </div>

    <div class="pr-6 pl-6 gap-4 flex flex-col items-center justify-center">
      <SchoolCard
        :school-name="selectedSchool?.name || 'Chargement...'"
        @modify="handleSchoolModify"
      />

      <ClassSelectionCard
        :grade-levels="grades"
        v-model:selectedGrade="selectedGrade"
        v-model:selectedBacType="selectedBacType"
        :loading="gradesLoading"
      />

      <SectionCard title="Spécialités" />

      <SectionCard title="Notes" />
    </div>

    <SchoolSelectionModal
      :is-visible="showSchoolModal"
      :schools="schools"
      :schools-loading="schoolsLoading"
      :schools-error="schoolsError"
      :current-school="selectedSchool"
      @close="closeSchoolModal"
      @select-school="handleSchoolSelection"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useSchools } from "../../composables/useSchools";
import { useGrades } from "../../composables/useGrades";
import type { HighSchool } from "../../types/highSchools/highSchools";
import { useStudentSettings } from "../../composables/useStudentSettings";
import SchoolCard from "../../components/StudentSettings/SchoolCard.vue";
import ClassSelectionCard from "../../components/StudentSettings/ClassSelectionCard.vue";
import SchoolSelectionModal from "../../components/StudentSettings/SchoolSelectionModal.vue";
import SectionCard from "../../components/StudentSettings/SectionCard.vue";

const { schools, pending: schoolsLoading, error: schoolsError } = useSchools();
const { grades, pending: gradesLoading, error: gradesError } = useGrades();
const {
  studentSettings,
  pending: studentSettingsLoading,
  error: studentSettingsError,
} = useStudentSettings();

const selectedGrade = ref<string | null>(null);
const selectedBacType = ref<string | null>(null);
const selectedSchool = ref<HighSchool | null>(null);
const showSchoolModal = ref(false);

watchEffect(() => {
  if (!studentSettingsLoading.value && studentSettings.value) {
    if (!selectedSchool.value && schools.value?.length) {
      const match = schools.value.find(
        (s) => s.id === studentSettings.value?.highSchool.id
      );

      selectedSchool.value = match || schools.value[0];
    }

    if (!selectedGrade.value && grades.value?.length) {
      selectedGrade.value = studentSettings.value.grade;
    }

    if (!selectedBacType.value && studentSettings.value.bacType) {
      selectedBacType.value = studentSettings.value.bacType;
    }
  }
});

const handleSchoolModify = () => {
  showSchoolModal.value = true;
};

const closeSchoolModal = () => {
  showSchoolModal.value = false;
};

const handleSchoolSelection = (school: HighSchool) => {
  selectedSchool.value = school;
};
</script>
