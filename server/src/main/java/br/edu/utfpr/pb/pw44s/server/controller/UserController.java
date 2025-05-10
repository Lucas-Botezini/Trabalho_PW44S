package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.dto.UserDTO;
import br.edu.utfpr.pb.pw44s.server.model.User;
import br.edu.utfpr.pb.pw44s.server.service.ICrudService;
import br.edu.utfpr.pb.pw44s.server.service.IUserService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController extends CrudController<User, UserDTO, Long>{
    private final IUserService userService;
    private final ModelMapper modelMapper;

    public UserController(IUserService userService, ModelMapper modelMapper) {
        super(User.class, UserDTO.class);
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<User, Long> getService() {
        return this.userService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return this.modelMapper;
    }

}
