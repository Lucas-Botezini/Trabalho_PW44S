package br.edu.utfpr.pb.pw44s.server.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class WebConfig {
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    // Novo bean para o RestTemplate que fará a comunicação com a Api de busca do CEP
    @Bean
    public RestTemplate restTemplate() {return  new RestTemplate(); }
}