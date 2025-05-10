package br.edu.utfpr.pb.pw44s.server.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "tb_game_genre")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class GameGenre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "genre_id")
    private Genre genre;

}
