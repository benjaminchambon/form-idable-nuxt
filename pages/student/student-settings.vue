<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-6">
    <div class="mb-6 sm:mb-8">
      <h1 class="text-xl sm:text-2xl font-medium text-gray-900">Edumapper</h1>
    </div>

    <div class="max-w-lg mx-auto space-y-4 sm:space-y-6">
      <SchoolCard
        :school-name="selectedSchool?.name || 'Loading...'"
        city="Lille"
        school-type="Lycée Public"
        @modify="handleSchoolModify"
      />

      <ClassSelectionCard
        :grade-levels="grades"
        v-model:selectedGrade="selectedGrade"
        v-model:selectedBacType="selectedBacType"
        @confirm="handleConfirmSelection"
        @close="handleCloseSelection"
      />

      <SectionCard title="Spécialités" />

      <SectionCard title="Notes" />
    </div>

    <!-- School Selection Modal -->
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
import { ref, watch } from 'vue';
import { useSchools, useGrades } from '../../composables';
import type { HighSchool } from '../../types/highSchools';

const { schools, pending: schoolsLoading, error: schoolsError } = useSchools();
const { grades, pending: gradesLoading, error: gradesError } = useGrades();

const selectedGrade = ref<string | null>(null);
const selectedBacType = ref<string | null>(null);
const selectedSchool = ref<HighSchool | null>(null);
const showSchoolModal = ref(false);

// Watch for schools data to load and set the first school as default
watch(
  schools,
  (newSchools) => {
    if (newSchools && newSchools.length > 0 && !selectedSchool.value) {
      selectedSchool.value = newSchools[0];
    }
  },
  { immediate: true }
);

const handleSchoolModify = () => {
  console.log('Modify school clicked', selectedSchool.value);
  showSchoolModal.value = true;
};

const closeSchoolModal = () => {
  showSchoolModal.value = false;
};

const handleSchoolSelection = (school: HighSchool) => {
  selectedSchool.value = school;
  console.log('School selected:', school);
};

const handleConfirmSelection = () => {
  console.log('Selection confirmed:', {
    school: selectedSchool.value,
    grade: selectedGrade.value,
    bacType: selectedBacType.value,
    gradesData: grades.value,
  });
};

const handleCloseSelection = () => {
  console.log('Close selection clicked');
};
</script>
