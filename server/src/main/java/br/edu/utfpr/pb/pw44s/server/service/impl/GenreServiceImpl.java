package br.edu.utfpr.pb.pw44s.server.service.impl;

import br.edu.utfpr.pb.pw44s.server.model.Genre;
import br.edu.utfpr.pb.pw44s.server.repository.GenreRepository;
import br.edu.utfpr.pb.pw44s.server.service.IGenreService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class GenreServiceImpl extends CrudServiceImpl<Genre, Long> implements IGenreService {
    private GenreRepository genreRepository;

    public GenreServiceImpl(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    @Override
    protected JpaRepository<Genre, Long> getRepository() { return this.genreRepository; }
}
