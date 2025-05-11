package br.edu.utfpr.pb.pw44s.server.service.impl;

import br.edu.utfpr.pb.pw44s.server.dto.GameDTO;
import br.edu.utfpr.pb.pw44s.server.dto.GenreDTO;
import br.edu.utfpr.pb.pw44s.server.model.Game;
import br.edu.utfpr.pb.pw44s.server.model.GameGenre;
import br.edu.utfpr.pb.pw44s.server.model.Genre;
import br.edu.utfpr.pb.pw44s.server.repository.GameGenreRepository;
import br.edu.utfpr.pb.pw44s.server.repository.GameRepository;
import br.edu.utfpr.pb.pw44s.server.repository.GenreRepository;
import br.edu.utfpr.pb.pw44s.server.service.IGameService;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameServiceImpl extends CrudServiceImpl<Game,Long> implements IGameService {
    private final GameRepository gameRepository;
    private final GenreRepository genreRepository;
    private final GameGenreRepository gameGenreRepository;

    public GameServiceImpl(GameRepository gameRepository, GenreRepository genreRepository, GameGenreRepository gameGenreRepository) {
        this.gameRepository = gameRepository;
        this.genreRepository = genreRepository;
        this.gameGenreRepository = gameGenreRepository;
    }

    @Override
    protected JpaRepository<Game, Long> getRepository() { return this.gameRepository; }

    public Game saveGame(GameDTO gameDTO, ModelMapper modelMapper) {

         Game savedGame = gameRepository.save(modelMapper.map(gameDTO, Game.class));

        // Limpa vínculos anteriores (se estiver atualizando)
        gameGenreRepository.deleteAllByGame(savedGame);

        if(gameDTO.getGenres() != null) {
            for (GenreDTO genreId : gameDTO.getGenres()) {
                genreRepository.findById(genreId.getId()).ifPresent(genre -> {
                    GameGenre gameGenre = GameGenre.builder().game(savedGame).genre(genre).build();
                    gameGenreRepository.save(gameGenre);
                });
            }
        }

        return savedGame;
    }
}
