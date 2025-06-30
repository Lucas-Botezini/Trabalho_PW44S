import type { IGame, IResponse } from "@/commons/types";
import { createGenericService } from "./generic-service";
import { api } from "@/lib/axios";

const gameURL = "/game";
const GameService = {
   ...createGenericService<IGame>(gameURL),

   findByGenre: async (genreId: number): Promise<IResponse<IGame[]>> => {
      try {
         const response = await api.get(`${gameURL}/genre/${genreId}`);
         return { 
            status: response.status, 
            data: response.data, 
            success: true 
         };
      } catch (err: any) {
         return {
            status: err.response?.status || 500,
            success: false,
            message: "Erro ao buscar os jogos.",
            data: undefined,
         };
      }
   }
}


export default GameService;