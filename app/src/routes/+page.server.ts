import type { PageServerLoad } from "./$types";
import { getApiService } from "$lib/services/abstract/api";

export const load: PageServerLoad = async ({ }) => {
  const api = getApiService();
  const result = await api.getIdeas();

	return {
		"data": result
	};
};