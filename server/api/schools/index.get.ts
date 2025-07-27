import { defineEventHandler } from 'h3';
import type { HighSchool } from '../../../types/highSchools';
import { highSchools } from '../../../server/mock/highSchools';
import { apiError } from '../../../server/utils/apiError';
import { ApiResponse } from '../../../types/api';

export default defineEventHandler(async (event): Promise<ApiResponse<HighSchool[]>> => {
  try {
    return {
      data: highSchools,
      message: 'Liste des écoles récupérée avec succès',
    };
  } catch (err) {
    console.error('Erreur API /api/highSchools :', err);
    throw apiError(500, 'Impossible de récupérer les écoles');
  }
});
