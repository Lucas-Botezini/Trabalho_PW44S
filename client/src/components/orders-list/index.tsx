import { type IOrder } from "@/commons/types";
import OrderService from "@/services/order-service";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { ProgressSpinner } from 'primereact/progressspinner'; // Importar ProgressSpinner

interface OrdersModalProps {
    visible: boolean;
    onHide: () => void;
}

export const OrdersModal = ({ visible, onHide }: OrdersModalProps) => {
    const toast = useRef<Toast>(null);

    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // Novo estado para controlar o loading

    const { findAll } = OrderService;

    useEffect(() => {
        if (visible) {
            loadOrders();
        }
    }, [visible]);

    const loadOrders = async () => {
        setLoading(true);
        const response = await findAll();
        setLoading(false);

        if (response.status === 200) {
            setOrders(Array.isArray(response.data) ? response.data : []);
        } else {
            toast.current?.show({
                severity: "error",
                summary: "Erro",
                detail: "Não foi possível carregar os pedidos.",
                life: 3000,
            });
        }
    };

    const formatCurrency = (value?: number) => {
        return value?.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        }) || 'R$ 0,00'; // Fallback para caso o valor seja undefined
    };

    const formatDateTime = (dateString?: string) => {
        if (!dateString) return "Data inválida";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return "Data inválida";
        }
    };


    const paymentMethodBodyTemplate = (order: IOrder) => {
        switch (order.paymentMethod) {
            case "CREDIT_CARD":
                return "Cartão de Crédito";
            case "DEBIT_CARD":
                return "Cartão de Débito";
            case "PIX":
                return "PIX";
            case "BOLETO":
                return "Boleto";
            default:
                return order.paymentMethod;
        }
    };

    // --- HEADER E FOOTER DA MODAL ---

    const header = (
        <div className="flex flex-wrap items-center justify-between gap-2 p-4 border-b border-surface-200 dark:border-surface-700">
            <span className="text-3xl text-900 font-bold">Meus Pedidos</span>
        </div>
    );

    const footer = (
        <div className="flex w-full justify-start">
            <Button
                label="Fechar"
                onClick={onHide}
                type="button"
                icon="pi pi-times"
                className="p-button p-component p-button-text"
            />
        </div>
    );

    const groupOrdersByDate = (ordersList: IOrder[]) => {
        const grouped: { [key: string]: IOrder[] } = {};
        ordersList.forEach(order => {
            const dateOnly = order.date?.split('T')[0] ?? "Data inválida";
            if (!grouped[dateOnly]) {
                grouped[dateOnly] = [];
            }
            grouped[dateOnly].push(order);
        });
        return grouped;
    };

    const groupedOrders = groupOrdersByDate(orders);
    const sortedDates = Object.keys(groupedOrders).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    return (
        <div>
            <Toast ref={toast} />
            <Dialog
                visible={visible}
                modal
                onHide={onHide}
                header={header}
                footer={footer}
                style={{ width: "85vw", maxWidth: '1200px' }}
                breakpoints={{ '960px': '85vw', '641px': '100vw' }} // Responsividade
                className="p-dialog-rounded p-dialog-shadow"
                contentClassName="p-4"
            >
                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration=".8s" />
                        <p className="ml-4 text-lg">Carregando seus pedidos...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center p-8 text-lg">
                        <i className="pi pi-box text-5xl mb-4 opacity-50"></i>
                        <p>Ainda não realizou nenhum pedido.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {sortedDates.map(date => (
                            <div key={date} className="dark:bg-surface-800 rounded-xl shadow-lg p-6 border border-surface-200 dark:border-surface-700">
                                <div className="space-y-6">
                                    {groupedOrders[date].map(order => (
                                        <>
                                            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-blue-500">
                                                Data: {order.date ? formatDateTime(order.date) : "Data não disponível"}
                                            </h2>
                                            <div key={order.id} className="border border-surface-100 dark:border-surface-700 rounded-lg p-4 bg-surface-50 dark:bg-surface-800 shadow-sm">
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 mb-3 border-b border-surface-100 dark:border-surface-700">
                                                    <div>
                                                        <p className="text-md font-bold">Total: {formatCurrency(order.totalPrice)}</p>
                                                        <p className="text-sm">
                                                            Método de Pagamento: {paymentMethodBodyTemplate(order)} {/* Passar o objeto order */}
                                                        </p>
                                                        <p className="text-sm">Endereço: {order.address.street}, {order.address.city} - {order.address.state}</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-md font-semibold mb-2">Itens:</h4>
                                                    <ul className="space-y-2">
                                                        {order.orderItems.map((item, itemIndex) => (
                                                            <li key={itemIndex} className="flex items-center justify-between text-sm py-1 border-b border-surface-100 dark:border-surface-700 last:border-b-0">
                                                                <div className="flex items-center">
                                                                    <img
                                                                        src={item.game.image}
                                                                        alt={item.game.name}
                                                                        className="w-12 h-12 object-cover rounded mr-3"
                                                                        onError={(e) => (e.currentTarget.src = 'https://placehold.co/64x64/E0F2F7/000000?text=No+Image')}
                                                                    />
                                                                    <span>{item.game.name} (x{item.amount})</span>
                                                                </div>
                                                                <span className="font-medium">{formatCurrency((item.unitPrice || 0) * item.amount)}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </>

                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Dialog>
        </div>
    );
};