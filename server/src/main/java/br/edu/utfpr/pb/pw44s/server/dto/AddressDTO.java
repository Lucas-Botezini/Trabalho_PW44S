package br.edu.utfpr.pb.pw44s.server.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor @AllArgsConstructor
public class AddressDTO {
    private Long id;

    @NotNull
    @Size(min = 2, max = 100)
    private String street;

    @Size(max = 200)
    private String complement;

    @NotNull
    @Size(max = 10)
    private String cep;

    @NotNull
    @Size(min = 2, max = 100)
    private String city;

    @NotNull
    @Size(min = 2, max = 100)
    private String state;

}
