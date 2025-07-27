import { useFetch } from 'nuxt/app';
import { computed } from 'vue';

export const useGrades = () => {
  const { data, pending, error, refresh } = useFetch<string[]>(`/api/grades`, {
    key: `grades`,
    server: true,
    lazy: false,
    default: () => [],
  });

  const grades = computed(() => data?.value ?? []);

  return {
    grades,
    pending,
    error,
    fetchGrades: refresh,
    refresh,
  };
};
