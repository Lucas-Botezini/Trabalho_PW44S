package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.dto.GameDTO;
import br.edu.utfpr.pb.pw44s.server.model.Game;
import br.edu.utfpr.pb.pw44s.server.service.ICrudService;
import br.edu.utfpr.pb.pw44s.server.service.IGameService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("game")
public class GameController extends CrudController<Game, GameDTO, Long> {
    private final IGameService gameService;
    private final ModelMapper modelMapper;

    public GameController(IGameService gameService, ModelMapper modelMapper) {
        super(Game.class, GameDTO.class);
        this.gameService = gameService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Game, Long> getService() {
        return this.gameService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return this.modelMapper;
    }

    @Override
    public ResponseEntity<GameDTO> create(GameDTO entity) {
        return ResponseEntity.ok(gameService.saveGame(entity));
    }

    @Override
    public ResponseEntity<List<GameDTO>> findAll() {
        return ResponseEntity.ok(gameService.findAllWithGenre());
    }

    @Override
    public ResponseEntity<GameDTO> findOne(Long id) {
        GameDTO gameDTO = gameService.findOneWithGenre(id);

        return ResponseEntity.ok(gameDTO);
    }

}
