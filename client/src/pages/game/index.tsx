import type { IGame } from "@/commons/types"
import GameService from "@/services/game-service"

import { Toast } from "primereact/toast"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "primereact/button" // Importe Button para o botão de adicionar ao carrinho
import { useAuth } from "@/context/hooks/use-auth"; // Importe useAuth
import { useCart } from "@/context/hooks/use-cart"; // Importe useCart
import { GenreSubCard } from "@/components/genre-subcard"; // Importe GenreSubCard

export const GamePage = () => {
    const [gameOnPage, setGameOnPage] = useState<IGame | undefined>(undefined);
    const { findById } = GameService;
    const { gameId } = useParams<{ gameId: string }>();
    const toast = useRef<Toast>(null);

    const { authenticated, authenticatedUser } = useAuth(); // Hooks de autenticação
    const { addToCart, cart } = useCart(); // Hooks do carrinho

    const loadGame = async (id: number) => {
        const response = await findById(id);

        if (response.status === 200) {
            setGameOnPage(response.data);
        } else {
            toast.current?.show({
                severity: "error",
                summary: "Erro",
                detail: `Não foi possível carregar o jogo com ID "${id}".`,
                life: 3000,
            });
            setGameOnPage(undefined);
        }
    }

    useEffect(() => {
        if (gameId) {
            const gameIdNumber = parseInt(gameId);
            if (!isNaN(gameIdNumber)) {
                loadGame(gameIdNumber);
            } else {
                toast.current?.show({
                    severity: "error",
                    summary: "Erro",
                    detail: "Erro ao abrir a página do jogo. ID inválido.",
                    life: 3000,
                });
                setGameOnPage(undefined);
            }
        } else {
            // Se não houver gameId na URL (ex: acessou /game sem ID)
            toast.current?.show({
                severity: "warn",
                summary: "Aviso",
                detail: "Nenhum ID de jogo fornecido.",
                life: 3000,
            });
            setGameOnPage(undefined);
        }
    }, [gameId]); // Dependência em gameId garante que a busca seja refeita se o ID mudar na URL

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

        const gameExists = cart.some(item => item.game.id === game.id);
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

    // return (
    //     <div
    //         className="game-page-container p-4 min-h-screen flex items-center justify-center bg-gray-100" // Adicionado para centralizar e dar fundo
    //         style={{
    //             fontFamily: 'Inter, sans-serif', // Adicionado para garantir a fonte
    //         }}
    //     >
    //         <Toast ref={toast} />

    //         {gameOnPage ? (
    //             <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row transform transition-all duration-300">
    //                 {/* Coluna da Imagem */}
    //                 <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-50">
    //                     <img
    //                         src={gameOnPage.image}
    //                         alt={gameOnPage.name}
    //                         className="w-full max-w-lg rounded-lg shadow-lg object-cover"
    //                         style={{ aspectRatio: '16/9' }}
    //                         onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x450/999999/FFFFFF?text=Imagem+Indisponível'; }}
    //                     />
    //                 </div>

    //                 {/* Coluna dos Detalhes do Jogo */}
    //                 <div className="md:w-1/2 p-8 flex flex-col justify-between">
    //                     <div>
    //                         <h1 className="text-4xl font-bold text-gray-800 mb-4">{gameOnPage.name}</h1>
    //                         <p className="text-xl font-semibold text-green-600 mb-4">
    //                             R$ {gameOnPage.price.toFixed(2).replace('.', ',')} {/* Formata o preço */}
    //                         </p>
    //                         <p className="text-gray-700 leading-relaxed mb-6 text-base">
    //                             {gameOnPage.description || "Nenhuma descrição disponível para este jogo."}
    //                         </p>

    //                         <div className="flex flex-wrap items-center gap-2 mb-6">
    //                             <span className="font-semibold text-gray-800 mr-2">Gêneros:</span>
    //                             {gameOnPage.genres.length > 0 ? (
    //                                 gameOnPage.genres.map((genre) => (
    //                                     <GenreSubCard key={genre.id} genre={genre} />
    //                                 ))
    //                             ) : (
    //                                 <span className="text-gray-500">Nenhum gênero especificado.</span>
    //                             )}
    //                         </div>
    //                     </div>

    //                     <div className="mt-8 flex flex-col gap-4">
    //                         <Button
    //                             label="Adicionar ao carrinho"
    //                             icon="pi pi-shopping-cart"
    //                             className="p-button-success w-full py-3 text-lg"
    //                             onClick={() => handleAddToCart(gameOnPage)}
    //                         />
    //                     </div>
    //                 </div>
    //             </div>
    //         ) : (
    //             <div className="flex justify-center items-center h-[calc(100vh-100px)] text-gray-600 text-xl">
    //                 <p>Carregando jogo ou jogo não encontrado...</p>
    //             </div>
    //         )}
    //     </div>
    // );

    return (
      <div 
         className="game-page-container p-4"
         style={{ 
            backgroundColor: "var(--surface-card)",
         }}
      > {/* Container principal para a página */}
         <Toast ref={toast} />

         {gameOnPage ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Coluna da Imagem */}
                  <div className="game-image-section flex justify-center items-center">
                     <img
                           src={gameOnPage.image}
                           alt={gameOnPage.name}
                           className="w-full max-w-lg rounded-lg shadow-lg"
                           style={{ objectFit: 'cover', aspectRatio: '16/9' }}
                     />
                  </div>

                  {/* Coluna dos Detalhes do Jogo */}
                  <div className="game-details-section flex flex-col justify-between">
                     <div>
                           <h1 className="text-4xl font-bold mb-4">{gameOnPage.name}</h1>
                           <p className="text-xl font-semibold text-green-500 mb-4">
                              R$ {gameOnPage.price.toFixed(2).replace('.', ',')} {/* Formata o preço */}
                           </p>
                           <p className="mb-6">
                              {gameOnPage.description || "Nenhuma descrição disponível para este jogo."}
                           </p>

                           <div className="flex flex-wrap gap-2 mb-6">
                              <span className="font-semibold mr-2">Gêneros:</span>
                              {gameOnPage.genres.length > 0 ? (
                                 gameOnPage.genres.map((genre) => (
                                       <GenreSubCard key={genre.id} genre={genre} />
                                 ))
                              ) : (
                                 <span className="text-gray-500">Nenhum gênero especificado.</span>
                              )}
                           </div>

                     </div>

                     <div className="mt-8">
                           <Button
                              label="Adicionar ao carrinho"
                              icon="pi pi-shopping-cart"
                              className="p-button-success w-full py-3 text-lg"
                              onClick={() => handleAddToCart(gameOnPage)}
                           />
                     </div>
                  </div>
               </div>
         ) : (
               <div className="flex justify-center items-center h-[calc(100vh-100px)] text-gray-600 text-xl">
                  <p>Carregando jogo ou jogo não encontrado...</p>
               </div>
         )}
      </div>
    );
}