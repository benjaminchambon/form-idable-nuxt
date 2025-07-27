import { BacType, Grade, HighSchool } from "./highSchools";

export type StudentSettings = {
  id: string;
  studentId: string;
  highSchool: HighSchool;
  grade: Grade;
  bacType: BacType;
};
