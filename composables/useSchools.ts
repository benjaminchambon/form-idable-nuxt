import { ref, readonly, computed } from 'vue';
import type { HighSchool } from '../types/highSchools';
import { useFetch } from 'nuxt/app';

export const useSchools = () => {
  const { data, pending, error, refresh } = useFetch<HighSchool[]>(`/api/schools`, {
    key: `schools`,
    server: true,
    lazy: false,
    default: () => [],
  });

  const schools = computed(() => data?.value ?? []);

  return {
    schools,
    pending,
    error,
    fetchSchools: refresh,
    refresh,
  };
};
