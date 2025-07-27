import { useFetch } from 'nuxt/app';
import { computed } from 'vue';

interface GradesApiResponse {
  grades: string[];
}

export const useGrades = () => {
  const { data, pending, error, refresh } = useFetch<GradesApiResponse>(`/api/grades`, {
    key: `grades`,
    server: false,
    lazy: false,
    default: () => ({ grades: [] }),
  });

  const grades = computed(() => data?.value?.grades ?? []);

  return {
    grades,
    pending,
    error,
    fetchGrades: refresh,
    refresh,
  };
};
