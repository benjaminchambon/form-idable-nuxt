<template>
  <div class="min-h-screen p-4 sm:p-6">
    <div class="mb-6 sm:mb-8">
      <h1 class="text-xl sm:text-2xl font-medium text-gray-900">Edumapper</h1>
    </div>

    <div class="max-w-lg mx-auto space-y-4 sm:space-y-6">
      <ClientOnly>
        <SchoolCard
          :school-name="selectedSchool?.name || 'Chargement...'"
          city="Lille"
          school-type="Lycée Public"
          @modify="handleSchoolModify"
        />
        <template #fallback>
          <div
            class="relative bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 rounded-2xl p-5 sm:p-6 text-white"
          >
            <div>
              <h2 class="text-xl font-semibold mb-2">Chargement...</h2>
              <div class="flex items-center space-x-4 text-sm opacity-90">
                <div class="flex items-center space-x-1">
                  <div class="w-1 h-1 bg-white rounded-full"></div>
                  <span>Lille</span>
                </div>
                <div class="flex items-center space-x-1">
                  <div class="w-1 h-1 bg-white rounded-full"></div>
                  <span>Lycée Public</span>
                </div>
              </div>
            </div>
            <button
              class="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/20 px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm opacity-50 cursor-not-allowed"
            >
              Modifier
            </button>
          </div>
        </template>
      </ClientOnly>

      <ClientOnly>
        <ClassSelectionCard
          :grade-levels="grades"
          v-model:selectedGrade="selectedGrade"
          v-model:selectedBacType="selectedBacType"
          :grades-loading="gradesLoading"
        />
        <template #fallback>
          <div
            class="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
          >
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-900">Classe</h2>
            </div>
            <div class="space-y-4">
              <div class="animate-pulse bg-gray-200 h-10 rounded-lg"></div>
              <div class="animate-pulse bg-gray-200 h-10 rounded-lg"></div>
            </div>
          </div>
        </template>
      </ClientOnly>

      <SectionCard title="Spécialités" />

      <SectionCard title="Notes" />
    </div>

    <!-- School Selection Modal -->
    <ClientOnly>
      <SchoolSelectionModal
        :is-visible="showSchoolModal"
        :schools="schools"
        :schools-loading="schoolsLoading"
        :schools-error="schoolsError"
        :current-school="selectedSchool"
        @close="closeSchoolModal"
        @select-school="handleSchoolSelection"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSchools } from "../../composables/useSchools";
import { useGrades } from "../../composables/useGrades";
import type { HighSchool } from "../../types/highSchools";
import { useStudentSettings } from "../../composables/useStudentSettings";
import { watchEffect } from "vue";

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
