import { defineEventHandler } from "h3";
import type { StudentSettings } from "../../../types/studentSettings/studentSettings";
import type { HighSchool } from "../../../types/highSchools/highSchools";
import { Grade, BacType } from "../../../types/highSchools/enum";
import { highSchools } from "../../../server/mock/highSchools";
import { apiError } from "../../../server/utils/apiError";
import { ApiResponse } from "../../../types/api/api";

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export default defineEventHandler(
  async (event): Promise<ApiResponse<StudentSettings>> => {
    try {
      const randomStudentSettings: StudentSettings = {
        id: generateRandomId(),
        studentId: generateRandomId(),
        highSchool: getRandomElement<HighSchool>(highSchools),
        grade: getRandomElement<Grade>(Object.values(Grade)),
        bacType: getRandomElement<BacType>(Object.values(BacType)),
      };

      return {
        data: randomStudentSettings,
        message: "Random student settings generated successfully",
      };
    } catch (err) {
      console.error("API error /api/student-settings :", err);
      throw apiError(500, "Unable to generate student settings.");
    }
  }
);
