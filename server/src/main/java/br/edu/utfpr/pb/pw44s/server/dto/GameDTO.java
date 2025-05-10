package br.edu.utfpr.pb.pw44s.server.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor @AllArgsConstructor
public class GameDTO {
    private Long id;

    @NotNull
    @Size(min = 1, max = 100)
    private String name;

    @Size(max = 200)
    private String description;

    @NotNull
    private BigDecimal price;

    private String image;

    private List<GenreDTO> genres;

}
