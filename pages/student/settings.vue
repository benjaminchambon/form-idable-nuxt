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

      <ClassSelectionCard
        :grade-levels="grades"
        v-model:selectedGrade="selectedGrade"
        v-model:selectedBacType="selectedBacType"
        :grades-loading="gradesLoading"
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
import { ref, watch } from "vue";
import { useSchools } from "../../composables/useSchools";
import { useGrades } from "../../composables/useGrades";
import type { HighSchool } from "../../types/highSchools";

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
  showSchoolModal.value = true;
};

const closeSchoolModal = () => {
  showSchoolModal.value = false;
};

const handleSchoolSelection = (school: HighSchool) => {
  selectedSchool.value = school;
};
</script>
