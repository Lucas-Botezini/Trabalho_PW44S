import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { IGame } from "@/commons/types";
import { useAuth } from "./hooks/use-auth";

interface CartItem {
   game: IGame;
   amount: number;
}

interface CartContextType {
   cart: CartItem[];
   addToCart: (game: IGame) => void;
   updateItemAmount: (gameId: number, newAmount: number) => void;
   // incrementItem: (id: number) => void;
   // decrementItem: (id: number) => void;
   removeItem: (id: number) => void;
   clearCart: () => void;
}

// Cria o contexto. Inicialmente, é undefined até ser usado por um Provider.
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
   const { authenticatedUser } = useAuth();
   // É o estado local que armazena os jogos no carrinho.  
   const [cart, setCart] = useState<CartItem[]>([]);

   const cartKey = `cart:${authenticatedUser?.username}`;

   //Executa quando authenticatedUser mudar.
   //Busca o carrinho salvo no localStorage e atualiza o estado local.
   useEffect(() => {
      if (authenticatedUser) {
         const stored = localStorage.getItem(cartKey);
         if (stored) {
            setCart(JSON.parse(stored));
         }
      }
   }, [authenticatedUser]);


   const saveCart = (newCart: CartItem[]) => {
      setCart(newCart);
      localStorage.setItem(cartKey, JSON.stringify(newCart));
   };

   const addToCart = (game: IGame) => {
      const existing = cart.find(item => item.game.id === game.id);
      if (existing) return; // evita duplicatas

      const newCart = [...cart, { game, amount: 1 }];
      saveCart(newCart);
   };

   const updateItemAmount = (gameId: number, newAmount: number) => {
      const newCart = cart.map((item) =>
         item.game.id === gameId ? { ...item, amount: newAmount } : item
      );
      saveCart(newCart);
   };

   const removeItem = (id: number) => {
      const newCart = cart.filter(item => item.game.id !== id);
      saveCart(newCart);
   };

   const clearCart = () => {
      saveCart([]);
   };

   return (
      <CartContext.Provider
      value={{ cart, addToCart, updateItemAmount, removeItem, clearCart }}
      >
      {children}
      </CartContext.Provider>
   );
};

export { CartContext };