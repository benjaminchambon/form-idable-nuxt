import { defineEventHandler } from "h3";
import type { HighSchool } from "../../../types/highSchools/highSchools";
import { highSchools } from "../../../server/mock/highSchools";
import { apiError } from "../../../server/utils/apiError";
import { ApiResponse } from "../../../types/api/api";

export default defineEventHandler(
  async (event): Promise<ApiResponse<HighSchool[]>> => {
    try {
      return {
        data: highSchools,
        message: "List of schools retrieved successfully",
      };
    } catch (err) {
      console.error("API error /api/highSchools :", err);
      throw apiError(500, "Unable to retrieve the schools.");
    }
  }
);
