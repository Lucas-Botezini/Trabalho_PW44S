package br.edu.utfpr.pb.pw44s.server.service;

import br.edu.utfpr.pb.pw44s.server.dto.GameDTO;
import br.edu.utfpr.pb.pw44s.server.model.Game;
import org.modelmapper.ModelMapper;

public interface IGameService extends ICrudService<Game, Long>{
    Game saveGame(GameDTO gameDTO, ModelMapper modelMapper);
}
