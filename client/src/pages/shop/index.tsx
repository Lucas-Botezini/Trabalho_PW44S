import type { IGame } from "@/commons/types";
import GameService from "@/services/game-service";

import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";

import { useCart } from "@/context/hooks/use-cart";
import { ShopCard } from "@/components/shop-card";

import OrderService from "@/services/order-service";
import type { IOrder } from "@/commons/types";

import type { IAddress } from "@/commons/types";

import { FreteService } from "@/services/frete-service";
import type { IFreteResponse } from "@/services/frete-service";

import { useAuth } from "@/context/hooks/use-auth";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { AddessModal } from "../../components/user-addresses-modal";

const paymentOptions = [
  { label: "Cartão de Crédito", value: "CREDIT_CARD" },
  { label: "Cartão de Débito", value: "DEBIT_CARD" },
  { label: "PIX", value: "PIX" },
  { label: "Boleto", value: "BOLETO" },
];

export const ShopPage = () => {
  const { cart, updateItemAmount, removeItem, clearCart } = useCart();
  const { findById } = GameService;

  const toast = useRef<Toast>(null);

  const { save } = OrderService;
  const { authenticatedUser } = useAuth();

  const [games, setGames] = useState<IGame[]>([]);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedOrderAddress, setSelectedOrderAddress] =
    useState<IAddress | null>(null);

  const [paymentMethod, setPaymentMethod] = useState("CREDIT_CARD");

  const [frete, setFrete] = useState<IFreteResponse | null>(null);

  const handleSaveOrder = async () => {
    if (!authenticatedUser) {
      toast.current?.show({
        severity: "warn",
        summary: "Atenção",
        detail: "Você precisa estar logado para enviar um pedido.",
        life: 3000,
      });
      return;
    }

    if (!selectedOrderAddress) {
      toast.current?.show({
        severity: "warn",
        summary: "Atenção",
        detail: "Por favor, selecione um endereço para a entrega.",
        life: 3000,
      });
      return;
    }

    const calculatedTotal = totalItens + valorFrete;

    const order: IOrder = {
      user: authenticatedUser,
      paymentMethod: paymentMethod,
      address: selectedOrderAddress,
      orderItems: cart.map((item) => ({
        game: item.game,
        unitPrice: item.game.price,
        amount: item.amount,
      })),
      totalPrice: calculatedTotal,
    };

    const response = await save(order);

    if (response.success) {
      toast.current?.show({
        severity: "success",
        summary: "Pedido enviado",
        detail: "Seu pedido foi enviado com sucesso!",
        life: 5000,
      });
      setSelectedOrderAddress(null); // Limpa o endereço selecionado
      clearCart(); // Limpa o carrinho após o envio do pedido
      setFrete(null); // Limpa o frete
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Erro ao enviar pedido",
        detail: response.message,
        life: 3000,
      });
    }
  };

  const handleRemove = (id: number) => {
    removeItem(id);
    toast.current?.show({
      severity: "success",
      summary: "Sucesso",
      detail: "Jogo removido do carrinho.",
      life: 3000,
    });
  };

  useEffect(() => {
    loadGames();
  }, [cart]);

  const loadGames = async () => {
    if (!cart.length) {
      toast.current?.show({
        severity: "warn",
        summary: "Atenção",
        detail: "Não há itens no seu carrinho.",
        life: 3000,
      });
      setGames([]);
      return;
    }

    // Promise.all é um método do JavaScript que recebe um array de Promises e retorna uma única    Promise que:
    // Resolve quando todas as Promises no array resolvem com sucesso.
    // Rejeita imediatamente se qualquer uma das Promises for rejeitada.
    const responses = await Promise.all(
      cart.map((item) => findById(item.game.id))
    );

    const validGames = responses
      .filter((res) => res.success && res.data)
      .map((res) => res.data as IGame);

    setGames(validGames);
  };

  const getAmount = (gameId: number) => {
    return cart.find((item) => item.game.id === gameId)?.amount ?? 1;
  };

  // Seleção do endereço a partir da modal
  const handleAddressSelected = async (address: IAddress) => {
    setSelectedOrderAddress(address);
    setShowAddressModal(false); // Fecha o modal após a seleção
    toast.current?.show({
      severity: "info",
      summary: "Endereço selecionado",
      detail: `Endereço para entrega: ${address.street}, ${address.city}`,
      life: 3000,
    });

    const resultadoFrete = await FreteService.calcularFrete(address.cep);

    if (resultadoFrete) {
      setFrete(resultadoFrete);
    } else {
      toast.current?.show({
        severity: "warn",
        summary: "Frete não disponível",
        detail: "Não foi possível calcular o frete para este CEP.",
        life: 3000,
      });
      setFrete(null);
    }
  };

  const totalItens = cart.reduce((acc, item) => acc + item.game.price * item.amount, 0);
  const valorFrete = frete ? parseFloat(frete.valor.replace("R$", "").replace(",", ".")) : 0;
  const totalGeral = (totalItens + valorFrete).toFixed(2);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 md:p-6 lg:p-8">
      <Toast ref={toast} />
      <>
        {/* Lista de jogos no carrinho */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2 mt-2">
          {cart.length === 0 ? (
            <div className="col-span-3 text-center p-4">
              <p className="">
                Seu carrinho está vazio. Adicione jogos para começar!
              </p>
            </div>
          ) : (
            <>
              {games.map((game) => (
                <ShopCard
                  key={game.id}
                  game={game}
                  amount={getAmount(game.id)}
                  onChangeAmount={(newAmount) =>
                    updateItemAmount(game.id, newAmount)
                  }
                  onRemove={() => handleRemove(game.id)}
                />
              ))}
            </>
          )}
        </div>

        {/* Resumo do carrinho */}
        <div
          className="col-span-1 rounded-lg mt-6 flex flex-col shadow-lg font-semibold"
          style={{
            backgroundColor: "var(--surface-card)",
            height: "fit-content",
          }}
        >
          <h2 className="text-lg font-bold m-4">Resumo do Carrinho</h2>
          <div className="flex justify-between items-center m-4">
            <p>Valor total dos itens:</p>
            <span>
              R${" "}
              {cart
                .reduce((acc, item) => acc + item.game.price * item.amount, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center m-4 ">
            <p>Quantidade total:</p>
            <span>
              {cart.reduce((acc, item) => acc + item.amount, 0)} itens
            </span>
          </div>
          <div className="m-4">
            <label htmlFor="paymentMethod" className="font-bold block mb-2">
              Método de Pagamento:
            </label>
            <Dropdown
              id="paymentMethod"
              value={paymentMethod}
              options={paymentOptions}
              onChange={(e) => setPaymentMethod(e.value)}
              placeholder="Selecione um método de pagamento"
              className="w-full"
            />
          </div>
          <div className="m-4">
            <label className="font-bold block mb-2">
              Endereço de Entrega:
            </label>
            <div className="p-inputgroup">
              <InputText // Mostra o endereço se ele estiver preenchido
                value={
                  selectedOrderAddress
                    ? `${selectedOrderAddress.street}, ${selectedOrderAddress.city} - ${selectedOrderAddress.state}`
                    : "Nenhum endereço selecionado"
                }
                readOnly
                placeholder="Selecione seu endereço"
                className="flex-grow"
              />
              <Button
                icon="pi pi-map-marker"
                className="p-button-secondary"
                onClick={() => setShowAddressModal(true)}
                aria-label="Selecionar Endereço"
              />
              
            </div>
          </div>

          {frete && (
            <>
              <div className="flex justify-between items-center m-4">
                <p>Frete:</p>
                <span>{frete.valor} ({frete.prazoEntrega})</span>
              </div>
              <div className="flex justify-between items-center m-4 text-green-700 font-bold">
                <p>Total com frete:</p>
                <span>R$ {totalGeral}</span>
              </div>
            </>
          )}

          <div className="mt-4">
            <button
              className="w-full p-button p-button-success flex justify-center shadow-lg transition-colors hover:bg-green-600"
              onClick={() => handleSaveOrder()}
            >
              Enviar pedido
            </button>
          </div>
        </div>
      </>
      <AddessModal
        visible={showAddressModal}
        onHide={() => setShowAddressModal(false)}
        isSelectionMode={true} // Indica que está no carrinho assim fazendo aparecer o botão de seleção
        onSelectAddress={handleAddressSelected} // Passa a função de callback
      />
    </div>
  );
};
