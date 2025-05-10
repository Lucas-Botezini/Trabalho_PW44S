package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.dto.GenreDTO;
import br.edu.utfpr.pb.pw44s.server.model.Genre;
import br.edu.utfpr.pb.pw44s.server.service.ICrudService;
import br.edu.utfpr.pb.pw44s.server.service.IGenreService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("genre")
public class GenreController extends CrudController<Genre, GenreDTO,Long> {
    private final IGenreService genreService;
    private final ModelMapper modelMapper;

    public GenreController(IGenreService genreService, ModelMapper modelMapper) {
        super(Genre.class, GenreDTO.class);
        this.genreService = genreService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Genre, Long> getService() {
        return this.genreService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }
}
