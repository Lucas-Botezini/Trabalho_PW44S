package br.edu.utfpr.pb.pw44s.server.dto;

import br.edu.utfpr.pb.pw44s.server.model.User;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor @AllArgsConstructor
public class UserDTO {
    private Long id;

    @NotNull
    @Size(min = 5, max = 100)
    private String username;

    @NotNull
    @Size(min = 3, max = 50)
    private String nickname;

    @NotNull
    @Size(min = 5, max = 100)
    private String email;

    @NotNull
    @Size(min = 8, max = 200)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",
            message = "{br.edu.utfpr.pb.pw44s.server.senha}")
    private String password;

}
