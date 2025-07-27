import { computed } from "vue";
import type { HighSchool } from "../types/highSchools";
import { useFetch } from "nuxt/app";
import type { ApiResponse } from "../types/api";

export const useSchools = () => {
  const { data, pending, error, refresh } = useFetch<ApiResponse<HighSchool[]>>(
    `/api/schools`,
    {
      key: `schools`,
      server: true,
      lazy: false,
      default: () => ({ data: [] }),
    }
  );

  const schools = computed(() => data.value?.data ?? []);

  return {
    schools,
    pending,
    error,
    fetchSchools: refresh,
    refresh,
  };
};
