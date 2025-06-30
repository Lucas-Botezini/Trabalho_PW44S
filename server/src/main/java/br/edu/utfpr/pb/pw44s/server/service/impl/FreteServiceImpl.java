package br.edu.utfpr.pb.pw44s.server.service.impl;

import br.edu.utfpr.pb.pw44s.server.dto.FreteResponseDTO;
import org.springframework.stereotype.Service;

@Service
public class FreteServiceImpl {

    public FreteResponseDTO calcularFrete(String cepDestino) {
        FreteResponseDTO dto = new FreteResponseDTO();

        cepDestino = cepDestino.replaceAll("[^0-9]", "");

        if (cepDestino.startsWith("85")) { // Paraná (ex: Pato Branco)
            dto.setValor("R$ 12,00");
            dto.setPrazoEntrega("2 dias úteis");
        } else if (cepDestino.startsWith("80") || cepDestino.startsWith("81")) {
            dto.setValor("R$ 14,00");
            dto.setPrazoEntrega("2 a 3 dias úteis");
        } else if (cepDestino.startsWith("01") || cepDestino.startsWith("02")) {
            dto.setValor("R$ 18,00");
            dto.setPrazoEntrega("4 dias úteis");
        } else if (cepDestino.startsWith("70")) {
            dto.setValor("R$ 25,00");
            dto.setPrazoEntrega("6 dias úteis");
        } else {
            dto.setValor("R$ 28,00");
            dto.setPrazoEntrega("7 dias úteis");
        }

        return dto;
    }
}