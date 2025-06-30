import { api } from "@/lib/axios";
import type { IResponse } from "@/commons/types";

export function createGenericService<T = object>(url: string) {
  const save = async (data: T): Promise<IResponse<T>> => {
    try {
      const response = await api.post(url, data);
      return {
        status: 200,
        success: true,
        message: "Item salvo com sucesso!",
        data: response.data,
      };
    } catch (err: any) {
      return {
        status: err.response?.status || 500,
        success: false,
        message: "Falha ao salvar o item",
        data: err.response?.data,
      };
    }
  };

  const findAll = async (): Promise<IResponse<T[]>> => {
    try {
      const response = await api.get(url);
      return {
        status: 200,
        success: true,
        message: "Lista carregada com sucesso!",
        data: response.data,
      };
    } catch (err: any) {
      return {
        status: err.response?.status || 500,
        success: false,
        message: "Falha ao carregar a lista",
        data: err.response?.data,
      };
    }
  };

  const remove = async (id: number): Promise<IResponse<{}>> => {
    try {
      const response = await api.delete(`${url}/${id}`);
      return {
        status: 200,
        success: true,
        message: "Item removido com sucesso!",
        data: response.data,
      };
    } catch (err: any) {
      return {
        status: err.response?.status || 500,
        success: false,
        message: "Falha ao remover o item",
        data: err.response?.data,
      };
    }
  };

  const findById = async (id: number): Promise<IResponse<T>> => {
    try {
      const response = await api.get(`${url}/${id}`);
      return {
        status: 200,
        success: true,
        message: "Item carregado com sucesso!",
        data: response.data,
      };
    } catch (err: any) {
      return {
        status: err.response?.status || 500,
        success: false,
        message: "Falha ao carregar o item",
        data: err.response?.data,
      };
    }
  };

  return {
    save,
    findAll,
    remove,
    findById,
  };
}
