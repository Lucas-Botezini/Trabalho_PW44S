import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import AddressService from "@/services/address-service";
import type { IAddress } from "@/commons/types";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { NewAddessModal } from "../new-address-modal";

interface AddressModalProps {
  visible: boolean;
  onHide: () => void;
  isSelectionMode?: boolean; // Validação para aparecer o botão de selecionar somente quando é a partir do shop
  onSelectAddress?: (address: IAddress) => void;
}

export const AddessModal = ({visible, onHide, isSelectionMode = false, onSelectAddress}: AddressModalProps) => {
  const toast = useRef<Toast>(null);
  
  const [addresses, setAddress] = useState<IAddress[]>([]);
  const { findAll } = AddressService;

  const [newAddressVisible, setNewAddressVisible] = useState(false);

  useEffect(() => {
    if (visible) { // Carrega endereços apenas quando o modal é aberto
      loadAddresses();
    }
  }, [visible]);

  const loadAddresses = async () => {
    const response = await findAll();

    if (response.status === 200) {
      setAddress(Array.isArray(response.data) ? 
          response.data : 
          []
        );
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Não foi possível carregar os endereços.",
        life: 3000,
      });
    }
  }

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
        <span className="text-xl text-900 font-bold">Meus Endereços</span>
    </div>
  );

  const footer = (
    <div className="flex w-full justify-between">
      <Button
        label="Fechar"
        onClick={onHide}
        type="button"
        icon="pi pi-times"
        className="p-button p-component p-button-text"
      />
      <Button
        label="Adicionar Endereço"
        type="button"
        icon="pi pi-plus"
        onClick={() => setNewAddressVisible(true)}
      />
    </div>
  );

  // Template para a coluna de seleção
  const actionBodyTemplate = (rowData: IAddress) => {
    // Só renderiza o botão se isSelectionMode for true e onSelectAddress for fornecido
    if (isSelectionMode && onSelectAddress) {
        return (
            <Button 
                icon="pi pi-check" 
                label="Selecionar" 
                className="p-button-sm" 
                onClick={() => onSelectAddress(rowData)} // Chama onSelectAddress diretamente
            />
        );
    }
    return null; // Não renderiza nada se não estiver no modo de seleção
  };

  return (
    <div>
      <Toast ref={toast} />
      <Dialog
        visible={visible}
        modal
        onHide={onHide}
        header={header}
        footer={footer}
        style={{ width: '75vw' }}
      > 
        <DataTable 
          value={addresses} 
          // header={header} 
          // footer={footer}
          dataKey="id" 
          emptyMessage="Nenhum endereço cadastrado"
          tableStyle={{ minWidth: '60rem' }}
        >
          {isSelectionMode && <Column body={actionBodyTemplate} header="Selecionar"></Column>}
          <Column field="cep" header="CEP"></Column>
          <Column field="city" header="Cidade"></Column>
          <Column field="state" header="Estado"></Column>
          <Column field="street" header="Rua"></Column>
          <Column field="complement" header="Complemento"></Column>
        </DataTable>
      </Dialog>
      <NewAddessModal visible={newAddressVisible} onHide={() => {
        setNewAddressVisible(false);
        loadAddresses();
      }}/>
    </div>
  );
};