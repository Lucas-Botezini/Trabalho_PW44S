import { useEffect, useRef, useState } from "react";
import type { IGame } from "@/commons/types";
import GameService from "@/services/game-service";
import { Toast } from "primereact/toast";
import { GameCard } from "@/components/game-card";

export const GameListPage = () => {
   const [data, setData] = useState<IGame[]>([]);
   const { findAll } = GameService;
   const toast = useRef<Toast>(null);

   useEffect(() => {
      loadData();
   }, []);

   const loadData = async () => {
      const response = await findAll();

      if (response.status === 200) {
         setData(Array.isArray(response.data) ? response.data : []);
      } else {
         toast.current?.show({
            severity: "error",
            summary: "Erro",
            detail: "Não foi possível carregar a lista de jogos.",
            life: 3000,
         });
      }
   };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-10">
      {data.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};