import type { ApiResponse } from '../../types/api';

export function apiResponse<T>(data: T, message = ''): ApiResponse<T> {
  return {
    data,
    message,
  };
}
