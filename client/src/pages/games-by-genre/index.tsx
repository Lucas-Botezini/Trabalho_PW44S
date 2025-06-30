import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"; // Usado para que seja possível acessar os parâmetros da requisição
import type { IGame } from "@/commons/types";
import GameService from "@/services/game-service";
import { Toast } from "primereact/toast";
import { GameCard } from "@/components/game-card";
import GenreService from "@/services/genre-service";

export const GameByGenrePage = () => {
   const [games, setGames] = useState<IGame[]>([]);

   const { genreId } = useParams<{ genreId: string }>(); // Obtem o nome do genero a partir da URL
   
   const [genreName, setGenreName] = useState<string>(''); // Para exibir o nome do gênero
   const { findById } = GenreService;
   const { findByGenre } = GameService; // Método para fazer a busca dos jogos a partir do gênero fornecido


   const toast = useRef<Toast>(null);

   useEffect(() => {
      if (genreId) {
         // Como ao pegar o parâmetro da URL a princípio ele é uma string, é feito um parse para number e após isso é feita a lódigo de carregamento a partir de que esse número é um número
         const genreIdNumber = parseInt(genreId);
         if (!isNaN(genreIdNumber)) {
            loadGamesByGenreId(genreIdNumber);
            searchGenreName(genreIdNumber);
         } else {
            toast.current?.show({
               severity: "error",
               summary: "Erro",
               detail: "ID de gênero inválido na URL.",
               life: 3000,
            });
         }
      }
  }, [genreId]); // Recarrega os jogos sempre que o genreId mudar

   const searchGenreName = async (genreIdNumber: number) => {
      try {
         const response = await findById(genreIdNumber); 
         if (response.status === 200 && response.data) {
            setGenreName(response.data.name);
         } else {
            setGenreName(`ID ${genreIdNumber}`);
            toast.current?.show({
               severity: "warn",
               summary: "Aviso",
               detail: `Não foi possível carregar o nome para o gênero com ID ${genreIdNumber}.`,
               life: 3000,
            });
         }
      } catch (error) {
         console.error("Erro ao buscar o nome do gênero:", error);
         setGenreName(`ID ${genreIdNumber}`); // Fallback em caso de erro na requisição
      }

   }

   const loadGamesByGenreId = async (id: number) => {
      const response = await findByGenre(id);

      if (response.status === 200) {
         setGames(Array.isArray(response.data) ? response.data : []);
      } else {
         toast.current?.show({
            severity: "error",
            summary: "Erro",
            detail: `Não foi possível carregar os jogos para o gênero com ID "${id}".`,
            life: 3000,
         });
      }
   };

   return (
      <div className="container mx-auto px-4 mt-20">
      <Toast ref={toast} />
      <h2 className="text-3xl font-bold mb-6 text-center">
         Listando jogos com o genêro: {genreName}
      </h2>
      {games.length > 0 ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game) => (
               <GameCard key={game.id} game={game} />
            ))}
         </div>
      ) : (
         <p className="text-center text-lg">Nenhum jogo encontrado para este gênero.</p>
      )}
      </div>
   );

}