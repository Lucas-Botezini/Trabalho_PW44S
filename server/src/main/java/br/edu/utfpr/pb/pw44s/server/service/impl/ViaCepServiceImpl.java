package br.edu.utfpr.pb.pw44s.server.service.impl;

import br.edu.utfpr.pb.pw44s.server.dto.ViaCepResponseDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate; // Ou WebClient

/**
 * Serviço responsável por interagir com a API ViaCEP para buscar informações de endereço a partir de um CEP.
*/

@Service
public class ViaCepServiceImpl {

    // URL base da API ViaCEP, com um placeholder para o CEP
    private static final String VIACEP_URL = "https://viacep.com.br/ws/{cep}/json";
    // Instância de RestTemplate para fazer requisições HTTP.
    private final RestTemplate restTemplate; // Use WebClient para um design reativo

    public ViaCepServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    //Busca informações de endereço na API ViaCEP com o CEP recebido.
    public ViaCepResponseDTO buscarEnderecoPorCep(String cep) {
        // Remove caracteres não numéricos do CEP
        cep = cep.replaceAll("[^0-9]", "");

        try {
            // Faz o GET para ViaCEP, substituindo o campo {cep} pelo valor fornecido.
            // O resultado JSON da API é automaticamente mapeado para um objeto ViaCepResponseDTO.
            return restTemplate.getForObject(VIACEP_URL, ViaCepResponseDTO.class, cep);
        } catch (Exception e) {
            System.err.println("Erro ao buscar CEP " + cep + ": " + e.getMessage());
            return null;
        }
    }
}