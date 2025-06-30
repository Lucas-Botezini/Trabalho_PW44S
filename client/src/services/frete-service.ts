import { api } from "@/lib/axios";

export interface IFreteResponse {
  valor: string;
  prazoEntrega: string;
}

export const FreteService = {
  async calcularFrete(cepDestino: string): Promise<IFreteResponse | null> {
    try {
      const response = await api.get(`address/calcular-frete/${cepDestino}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao calcular frete:", error);
      return null;
    }
  },
};
