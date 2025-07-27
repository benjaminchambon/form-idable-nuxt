import { BacType, Grade } from "../highSchools/enum";
import { HighSchool } from "../highSchools/highSchools";

export type StudentSettings = {
  id: string;
  studentId: string;
  highSchool: HighSchool;
  grade: Grade;
  bacType: BacType;
};
