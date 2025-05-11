package br.edu.utfpr.pb.pw44s.server.repository;

import br.edu.utfpr.pb.pw44s.server.model.Game;
import br.edu.utfpr.pb.pw44s.server.model.GameGenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameGenreRepository extends JpaRepository<GameGenre, Long> {
    void deleteAllByGame(Game game);
}
