import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  const grades = ['Seconde', 'Première', 'Terminale'];
  return {
    grades,
  };
});
