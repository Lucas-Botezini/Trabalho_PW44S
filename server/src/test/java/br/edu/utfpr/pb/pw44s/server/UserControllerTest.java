package br.edu.utfpr.pb.pw44s.server;

import br.edu.utfpr.pb.pw44s.server.dto.UserDTO;
import br.edu.utfpr.pb.pw44s.server.model.User;
import br.edu.utfpr.pb.pw44s.server.repository.UserRepository;
import br.edu.utfpr.pb.pw44s.server.shared.GenericResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerTest {

    private static final String API_USERS = "/user/new";

    @Autowired
    TestRestTemplate restTemplate;

    @Autowired
    UserRepository userRepository;

    @BeforeEach
    public void cleanUp() {
        userRepository.deleteAll();
        restTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void postUser_whenUserIsValid_receiveOk() {
        UserDTO user = createValidUser();
        ResponseEntity<Object> response = restTemplate.postForEntity(API_USERS, user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void postUser_whenUserIsValid_userSaved() {
        UserDTO user = createValidUser();
        restTemplate.postForEntity(API_USERS, user, Object.class);
        assertThat(userRepository.count()).isEqualTo(1);
    }

    @Test
    public void postUser_whenUserIsValid_receiveSuccessMessage() {
        UserDTO user = createValidUser();
        ResponseEntity<GenericResponse> response =
                restTemplate.postForEntity(API_USERS, user, GenericResponse.class);
        assertThat(response.getBody().getMessage()).isNotNull();
    }

    @Test
    public void postUser_whenUserIsValid_passwordIsHashedInDatabase() {
        UserDTO user = createValidUser();
        restTemplate.postForEntity(API_USERS, user, String.class);

        List<User> users = userRepository.findAll();
        User userDB = users.get(0);
        assertThat(userDB.getPassword()).isNotEqualTo(user.getPassword());
    }

    @Test
    public void postUser_whenUserHasNullUsername_receiveBadRequest() {
        UserDTO user = createValidUser();
        user.setUsername(null);

        ResponseEntity<Object> response =
                restTemplate.postForEntity(API_USERS, user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    public void postUser_whenUserHasUsernameLessThanRequired_receiveBadRequest() {
        UserDTO user = createValidUser();
        user.setUsername("abc");

        ResponseEntity<Object> response =
                restTemplate.postForEntity(API_USERS, user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    private UserDTO createValidUser() {
        UserDTO user = new UserDTO();
        user.setNickname("test-display");
        user.setEmail("test@gmail.com");
        user.setUsername("test-user");
        user.setPassword("P4ssword");
        return user;
    }
}
