package br.edu.utfpr.pb.pw44s.server;

import br.edu.utfpr.pb.pw44s.server.dto.AddressDTO;
import br.edu.utfpr.pb.pw44s.server.dto.UserDTO;
import br.edu.utfpr.pb.pw44s.server.repository.AddressRepository;
import br.edu.utfpr.pb.pw44s.server.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class AddressControllerTest {

    private static final String API_ADDRESS = "/addresss";
    private static final String API_USERS = "/user/new";

    @Autowired
    TestRestTemplate restTemplate;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AddressRepository addressRepository;

    @BeforeEach
    public void cleanUp() {
        addressRepository.deleteAll();
        userRepository.deleteAll();
        restTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void postAddress_withLoggedUser() {
        // Descrever teste
        UserDTO user = createValidUser();
        ResponseEntity<Object> responseUser = restTemplate.postForEntity(API_USERS, user, Object.class);

        AddressDTO address = createValidAddress();
        ResponseEntity<Object> responseAddress = restTemplate.postForEntity(API_ADDRESS, address, Object.class);
        assertThat(responseAddress.getStatusCode()).isEqualTo(HttpStatus.OK);

    }

    @Test
    public void postAddress_withNotLoggedUser() {
        // Descrever teste
        UserDTO user = createValidUser();
        ResponseEntity<Object> responseUser = restTemplate.postForEntity(API_USERS, user, Object.class);

        AddressDTO address = createValidAddress();
        ResponseEntity<Object> responseAddress = restTemplate.postForEntity(API_ADDRESS, address, Object.class);
        assertThat(responseAddress.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);

    }

    @Test
    public void getAddress_withLoggedUser() {
        // Descrever teste
    }

    @Test
    public void getAddress_withDesloggedUser() {
        // Descrever teste
    }

    private AddressDTO createValidAddress() {
        AddressDTO address = new AddressDTO();
        address.setStreet("Rua das Flores");
        address.setComplement("Apartamento 202");
        address.setCep("12345-678");
        address.setCity("Curitiba");
        address.setState("Paraná");
        return address;
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
