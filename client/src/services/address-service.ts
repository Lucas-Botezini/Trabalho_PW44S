import type { IAddress } from "@/commons/types";
import { createGenericService } from "./generic-service";
import { api } from "@/lib/axios";
import type { IResponse } from "@/commons/types";

const addressURL = "/address";

const AddressService = {
    // O operador spread (...) é usado para incluir todos os métodos (save, findAll, remove, findById) já existentes vindos do generic
  ...createGenericService<IAddress>(addressURL),

  // Novo método para buscar endereço por CEP
  buscaEnderecoPorCEP: async (cep: string): Promise<IResponse<IAddress>> => {
    try {
      // Envia o CEP ao backend para fazer a busca e devolver os dados
      const response = await api.get(`${addressURL}/busca-cep/${cep}`);

      // Campos de resposta são inseridos no endereço do front
      const data: IAddress = {
        cep: response.data.cep,
        street: response.data.logradouro,
        complement: response.data.complemento,
        city: response.data.localidade,
        state: response.data.uf,
      };
      return {
        status: 200,
        success: true,
        message: "Endereço encontrado!",
        data: data,
      };
    } catch (err: any) {
      return {
        status: err.response?.status || 500,
        success: false,
        message: "Falha ao buscar CEP. Verifique o número ou preencha manualmente.",
        data: undefined,
      };
    }
  },
};


export default AddressService;