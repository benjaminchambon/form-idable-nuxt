import { computed } from "vue";
import type { StudentSettings } from "~/types/studentSettings";
import { useFetch } from "nuxt/app";
import type { ApiResponse } from "~/types/api";

export const useStudentSettings = () => {
  const { data, pending, error, refresh } = useFetch<
    ApiResponse<StudentSettings>
  >(`/api/student-settings`, {
    key: `student-settings`,
    server: false,
    lazy: false,
    default: () => undefined,
  });

  const studentSettings = computed(() => data.value?.data);

  return {
    studentSettings,
    pending,
    error,
    fetchStudentSettings: refresh,
    refresh,
  };
};
