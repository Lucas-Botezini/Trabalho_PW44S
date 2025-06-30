package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.dto.AddressDTO;
import br.edu.utfpr.pb.pw44s.server.dto.FreteResponseDTO;
import br.edu.utfpr.pb.pw44s.server.dto.ViaCepResponseDTO;
import br.edu.utfpr.pb.pw44s.server.model.Address;
import br.edu.utfpr.pb.pw44s.server.service.IAddressService;
import br.edu.utfpr.pb.pw44s.server.service.ICrudService;
import br.edu.utfpr.pb.pw44s.server.service.impl.FreteServiceImpl;
import br.edu.utfpr.pb.pw44s.server.service.impl.ViaCepServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("address")
public class AddressController extends CrudController<Address, AddressDTO, Long> {
    private final IAddressService addressService;
    private final ModelMapper modelMapper;
    private final ViaCepServiceImpl viaCepService;
    private final FreteServiceImpl freteService;

    public AddressController(IAddressService addressService, ModelMapper modelMapper, ViaCepServiceImpl viaCepService, FreteServiceImpl freteService) {
        super(Address.class, AddressDTO.class);
        this.addressService = addressService;
        this.modelMapper = modelMapper;
        this.viaCepService = viaCepService;
        this.freteService = freteService;
    }

    @Override
    protected ICrudService<Address, Long> getService() {
        return this.addressService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return this.modelMapper;
    }

    @Override
    public ResponseEntity<AddressDTO> create(AddressDTO entity) {
        return ResponseEntity.ok(addressService.saveAddress(entity));
    }

    @GetMapping("/busca-cep/{cep}")
    public ResponseEntity<ViaCepResponseDTO> getAddressByCep(@PathVariable String cep) {
        ViaCepResponseDTO address = viaCepService.buscarEnderecoPorCep(cep);
        if (address != null) {
            return ResponseEntity.ok(address);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("calcular-frete/{cepDestino}")
    public ResponseEntity<FreteResponseDTO> calcularFrete(@PathVariable String cepDestino) {
        FreteResponseDTO response = freteService.calcularFrete(cepDestino);
        return ResponseEntity.ok(response);
    }

}
