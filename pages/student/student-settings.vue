<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-medium text-gray-900">Edumapper</h1>
    </div>

    <div class="max-w-2xl mx-auto space-y-6">
      <!-- School Card -->
      <div
        class="relative bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 rounded-2xl p-6 text-white"
      >
        <div>
          <h2 class="text-xl font-semibold mb-2">Lycée Gaston Berger</h2>
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
          class="absolute top-6 right-6 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm"
        >
          Modifier
        </button>
      </div>

      <!-- Grade Selection -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-medium text-gray-900">En quelle classe es-tu ?</h3>
          <button class="text-gray-400 hover:text-gray-600">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Grade Level Selection -->
        <div class="mb-6">
          <div class="flex space-x-3">
            <button
              v-for="level in gradeLevels"
              :key="level"
              @click="setSelectedGrade(level)"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                selectedGrade === level
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              ]"
            >
              {{ level }}
            </button>
          </div>
        </div>

        <!-- Bac Type Selection -->
        <div class="mb-8">
          <h4 class="text-sm font-medium text-gray-900 mb-3">Type de bac</h4>
          <div class="flex space-x-3">
            <button
              v-for="type in bacTypes"
              :key="type"
              @click="setSelectedBacType(type)"
              :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                selectedBacType === type
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              ]"
            >
              {{ type }}
            </button>
          </div>
        </div>

        <!-- Confirm Button -->
        <button
          class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
          @click="confirmSelection"
        >
          Confirmer
        </button>
      </div>

      <!-- Spécialités Section -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-medium text-gray-900">Spécialités</h3>
            <p class="text-sm text-gray-500 mt-1">À compléter</p>
          </div>
          <button class="text-gray-400 hover:text-gray-600">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="m18.5 2.5 3 3L13 14l-4 1 1-4 8.5-8.5z"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Notes Section -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-medium text-gray-900">Notes</h3>
            <p class="text-sm text-gray-500 mt-1">À compléter</p>
          </div>
          <button class="text-gray-400 hover:text-gray-600">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="m18.5 2.5 3 3L13 14l-4 1 1-4 8.5-8.5z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSchools, useGrades } from '../../composables';

const { schools, pending: schoolsLoading, error: schoolsError } = useSchools();
const { grades, pending: gradesLoading, error: gradesError } = useGrades();

const selectedGrade = ref<string | null>(null);
const selectedBacType = ref<string | null>(null);

const gradeLevels = ['Seconde', 'Première', 'Terminale'];
const bacTypes = ['Général', 'Technologique', 'Professionnel'];

const setSelectedGrade = (grade: string) => {
  selectedGrade.value = grade;
};

const setSelectedBacType = (type: string) => {
  selectedBacType.value = type;
};

const confirmSelection = () => {
  console.log('Selection confirmed:', {
    grade: selectedGrade.value,
    bacType: selectedBacType.value,
  });
  // Here you would typically save the selection or navigate to the next step
};
</script>
