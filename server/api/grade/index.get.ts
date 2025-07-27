import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  const grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const randomIndex = Math.floor(Math.random() * grades.length);
  return {
    grade: grades[randomIndex],
  };
});
