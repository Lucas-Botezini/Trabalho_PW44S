import type { IGame } from "@/commons/types"
import { Button } from "primereact/button";
import { Card } from "primereact/card"
import { GenreSubCard } from "../genre-subcard";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useAuth } from "@/context/hooks/use-auth";
import { useCart } from "@/context/hooks/use-cart";
import { useNavigate } from "react-router-dom";

interface IGameCardProps {
   game: IGame;
}

export const GameCard = ({game}: IGameCardProps) => {   
   const toast = useRef<Toast>(null);
   const { authenticated, authenticatedUser } = useAuth();
   const { addToCart, cart } = useCart();
   const navigate = useNavigate();   

   const handleAddToCart = (game: IGame) => {
      if (!authenticated || !authenticatedUser) {
         toast.current?.show({
            severity: 'error',
            summary: 'Atenção',
            detail: 'Você precisa estar logado para adicionar jogos ao carrinho.',
            life: 3000,
         });
         return;
      }

      const gameExists = cart.some(item => item.game.id === game.id); // 👈 verifica se já está no carrinho
      if (gameExists) {
         toast.current?.show({
            severity: 'warn',
            summary: 'Atenção',
            detail: 'Este jogo já está no carrinho. Se desejar, você pode modificar a quantidade a partir do carrinho.',
            life: 3000,
         });
         return;
      }      

      addToCart(game);
      toast.current?.show({
         severity: 'success',
         summary: 'Sucesso',
         detail: 'Jogo adicionado ao carrinho com sucesso.',
         life: 3000,
      });
   };

   return (
      <>
         <Toast ref={toast} />
         <Card
            title={game.name}
            header={
               <img
                  src={game.image}
                  alt={game.name}
                  style={{ width: "100%", height: "300px", objectFit: "cover" }}
                  onClick={() => navigate(`/game/${game.id}`)}
               />
            }
            style={{ width: "100%" }}
            className="min-h-[520px] flex flex-col justify-between"
            footer={
               <div className="mt-auto">
                  <Button 
                     label="Adicionar ao carrinho" 
                     icon="pi pi-shopping-cart" 
                     className="p-button-success w-full" 
                     onClick={() => handleAddToCart(game)}
                  />
               </div>
            }
         >
            <div className="flex flex-col justify-between h-full">
               <div className="flex flex-col w-full h-20">
                  <h2 className="font-bold text-lg" style={{ color: 'oklch(0.792 0.209 151.711)' }}>
                     R$ {game.price}
                  </h2>
                  <div className="mt-2">
                     {game.genres.map((genre) => (
                        <GenreSubCard key={genre.id} genre={genre} />
                     ))}
                  </div>
               </div>
            </div>
         </Card>
      </>
   )
}