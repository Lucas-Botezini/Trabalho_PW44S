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
import jakarta.persistence.EntityNotFoundException;
import org.bouncycastle.math.raw.Mod;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameServiceImpl extends CrudServiceImpl<Game,Long> implements IGameService {
    private final GameRepository gameRepository;
    private final GenreRepository genreRepository;
    private final GameGenreRepository gameGenreRepository;
    private final ModelMapper modelMapper;

    public GameServiceImpl(GameRepository gameRepository, GenreRepository genreRepository, GameGenreRepository gameGenreRepository, ModelMapper modelMapper) {
        this.gameRepository = gameRepository;
        this.genreRepository = genreRepository;
        this.gameGenreRepository = gameGenreRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    protected JpaRepository<Game, Long> getRepository() { return this.gameRepository; }

    public GameDTO saveGame(GameDTO gameDTO) {

        Game savedGame = gameRepository.save(modelMapper.map(gameDTO, Game.class));

        if(gameDTO.getGenres() != null) {
            for (GenreDTO genreId : gameDTO.getGenres()) {
                genreRepository.findById(genreId.getId()).ifPresent(genre -> {
                    GameGenre gameGenre = GameGenre.builder().game(savedGame).genre(genre).build();
                    gameGenreRepository.save(gameGenre);
                });
            }
        }

        return findOneWithGenre(savedGame.getId());
    }

    public List<GameDTO> findAllWithGenre() {
        List<Game> games = gameRepository.findAll();

        List<GameDTO> gamesDTO = games.stream().map(
                game -> {
                    GameDTO gameDTO = modelMapper.map(game, GameDTO.class);

                    List<GenreDTO> genreDTOs = gameGenreRepository.findByGame(game).stream()
                            .map(gameGenre -> modelMapper.map(gameGenre.getGenre(), GenreDTO.class))
                            .toList();
                    gameDTO.setGenres(genreDTOs);
                    return gameDTO;
                }
        ).toList();

        return gamesDTO;
    }

    public GameDTO findOneWithGenre(Long id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Game not found with id: " + id));

        GameDTO gameDTO = modelMapper.map(game, GameDTO.class);

        List<GenreDTO> genreDTOs = gameGenreRepository.findByGame(game).stream()
                .map(gameGenre -> modelMapper.map(gameGenre.getGenre(), GenreDTO.class))
                .toList();
        gameDTO.setGenres(genreDTOs);

        return gameDTO;
    }

}
