package br.edu.utfpr.pb.pw44s.server.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor @AllArgsConstructor
public class GenreDTO {
    private Long id;

    @NotNull(message = "O nome do gênero é obrigatório.")
    @Size(min = 2, max = 50)
    private String name;
}
