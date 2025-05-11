package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.dto.OrderDTO;
import br.edu.utfpr.pb.pw44s.server.dto.OrderItemsDTO;
import br.edu.utfpr.pb.pw44s.server.model.Order;
import br.edu.utfpr.pb.pw44s.server.model.OrderItems;
import br.edu.utfpr.pb.pw44s.server.repository.GameRepository;
import br.edu.utfpr.pb.pw44s.server.service.ICrudService;
import br.edu.utfpr.pb.pw44s.server.service.IOrderItemsService;
import br.edu.utfpr.pb.pw44s.server.service.IOrderService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("order")
public class OrderController extends CrudController<Order, OrderDTO, Long> {
    private final IOrderService orderService;
    private final ModelMapper modelMapper;

    public OrderController(IOrderService orderService, ModelMapper modelMapper) {
        super(Order.class, OrderDTO.class);
        this.orderService = orderService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Order, Long> getService() {
        return this.orderService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return this.modelMapper;
    }

    @PostMapping
    public ResponseEntity<OrderDTO> create(OrderDTO dto) {
        OrderDTO savedOrder = orderService.createOrderWithItems(dto);
        return ResponseEntity.ok(savedOrder);

    }
}
