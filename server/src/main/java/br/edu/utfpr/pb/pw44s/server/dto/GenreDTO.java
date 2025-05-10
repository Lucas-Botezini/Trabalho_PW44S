package br.edu.utfpr.pb.pw44s.server.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class GenreDTO {
    private Long id;

    @NotNull
    @Size(min = 2, max = 50)
    private String name;
}
