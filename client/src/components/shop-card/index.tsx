import type { IGame } from "@/commons/types"
import { Card } from "primereact/card";
import { InputNumber } from 'primereact/inputnumber';

interface ShopCardProps {
   game: IGame;
   amount: number;
   onChangeAmount: (newAmount: number) => void;
   onRemove: () => void;
}

export const ShopCard = ({ game, amount, onChangeAmount, onRemove }: ShopCardProps) => (
   <Card className="mt-4 shadow-lg no-card-body-padding overflow-hidden flex flex-col">
   <div className="w-full flex flex-col md:flex-row gap-2 p-2 sm:p-4">
      {/* Imagem à esquerda - Largura aumentada para ocupar mais espaço */}
      <div className="w-full md:w-5/12 lg:w-1/2 h-48 md:h-full rounded-md overflow-hidden flex-shrink-0">
         <img
         src={game.image || "https://via.placeholder.com/150"}
         alt={game.name}
         className="w-full h-full object-cover rounded-md"
         />
      </div>

      {/* Conteúdo à direita - Largura ajustada para compensar o aumento da imagem */}
      <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col justify-between p-2">
         {/* Nome e preço do jogo */}
         <div className="mt-2 md:mt-0">
         <h2 className="text-xl font-semibold">{game.name}</h2>
         <h2 className="font-bold text-lg">
            <div style={{ color: 'oklch(0.792 0.209 151.711)' }}>
               R$ {game.price.toFixed(2)}
            </div>
         </h2>
         </div>

         {/* Delete and update quantidade de jogos */}
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-2">
         <div className="flex gap-2 w-full sm:w-auto">
            <i onClick={onRemove} className="pi pi-trash p-button p-button-danger delete-button"></i>

            <InputNumber
               inputId="quantidade"
               value={amount}
               onValueChange={(e) => onChangeAmount(e.value ?? 1)}
               showButtons
               buttonLayout="horizontal"
               inputClassName="disabled"
               step={1}
               min={1}
               decrementButtonClassName="p-button-danger"
               incrementButtonClassName="p-button-success"
               incrementButtonIcon="pi pi-plus"
               decrementButtonIcon="pi pi-minus"
            />
         </div>
         </div>
      </div>
   </div>
   <hr className="border-t border-gray-200 w-full mt-1 " />
   <div className="w-full flex justify-between items-center mt-1 px-4 pb-2 text-sm sm:text-base">
      <h1 className="text-lg font-semibold">Subtotal:</h1>
      <span className="text-lg font-bold" style={{ color: 'oklch(0.792 0.209 151.711)' }}>
         R$ {(game.price * amount).toFixed(2)}
      </span>
   </div>
   </Card>
);