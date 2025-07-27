import { defineEventHandler } from "h3";
import { Grade } from "../../../types/highSchools/enum";

export default defineEventHandler(() => {
  const grades = Object.values(Grade);
  return {
    grades,
  };
});
