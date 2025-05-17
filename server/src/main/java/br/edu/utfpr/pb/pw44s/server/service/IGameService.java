package br.edu.utfpr.pb.pw44s.server.service;

import br.edu.utfpr.pb.pw44s.server.dto.GameDTO;
import br.edu.utfpr.pb.pw44s.server.model.Game;

import java.util.List;

public interface IGameService extends ICrudService<Game, Long>{
    GameDTO saveGame(GameDTO gameDTO);
    List<GameDTO> findAllWithGenre();
    GameDTO findOneWithGenre(Long id);
}
