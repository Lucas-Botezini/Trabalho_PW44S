package br.edu.utfpr.pb.pw44s.server.service.impl;

import br.edu.utfpr.pb.pw44s.server.dto.AddressDTO;
import br.edu.utfpr.pb.pw44s.server.model.Address;
import br.edu.utfpr.pb.pw44s.server.repository.AddressRepository;
import br.edu.utfpr.pb.pw44s.server.repository.UserRepository;
import br.edu.utfpr.pb.pw44s.server.service.IAddressService;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.PostMapping;

public class AddressServiceImpl extends CrudServiceImpl<Address, Long> implements IAddressService {
    private final AddressRepository addressRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    public AddressServiceImpl(AddressRepository addressRepository, ModelMapper modelMapper, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
    }

    @Override
    protected JpaRepository<Address, Long> getRepository() {
        return this.addressRepository;
    }

    @PostMapping
    public AddressDTO saveAddressDTO(AddressDTO addressDTO) {
        Address address = modelMapper.map(addressDTO, Address.class);

        address.setUser(userRepository.findById(addressDTO.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not exist with ID: " + addressDTO.getUser().getId()))
        );

        addressRepository.save(address);

        return addressDTO;
    }
}
