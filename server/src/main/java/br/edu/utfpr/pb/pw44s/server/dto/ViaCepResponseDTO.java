package br.edu.utfpr.pb.pw44s.server.dto;

import lombok.Data;

@Data
public class ViaCepResponseDTO {
    private String cep;
    private String logradouro;
    private String complemento;
    private String bairro;
    private String localidade; // Cidade
    private String uf; // Estado
    private String ibge;
    private String gia;
    private String ddd;
    private String siafi;
}