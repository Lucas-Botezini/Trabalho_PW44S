package br.edu.utfpr.pb.pw44s.server.repository;

import br.edu.utfpr.pb.pw44s.server.model.Game;
import br.edu.utfpr.pb.pw44s.server.model.GameGenre;
import br.edu.utfpr.pb.pw44s.server.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameGenreRepository extends JpaRepository<GameGenre, Long> {
    List<GameGenre> findByGame(Game game);
    List<GameGenre> findByGenre(Genre genre);
}
