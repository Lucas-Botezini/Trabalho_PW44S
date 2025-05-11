package br.edu.utfpr.pb.pw44s.server.service.impl;

import br.edu.utfpr.pb.pw44s.server.dto.OrderDTO;
import br.edu.utfpr.pb.pw44s.server.dto.OrderItemsDTO;
import br.edu.utfpr.pb.pw44s.server.model.Game;
import br.edu.utfpr.pb.pw44s.server.model.Order;
import br.edu.utfpr.pb.pw44s.server.model.OrderItems;
import br.edu.utfpr.pb.pw44s.server.repository.GameRepository;
import br.edu.utfpr.pb.pw44s.server.repository.OrderRepository;
import br.edu.utfpr.pb.pw44s.server.repository.UserRepository;
import br.edu.utfpr.pb.pw44s.server.service.IOrderService;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl extends CrudServiceImpl<Order, Long> implements IOrderService {
    private final OrderRepository orderRepository;
    private final ModelMapper modelMapper;
    private final GameRepository gameRepository;
    private final OrderItemsServiceImpl orderItemsService;
    private final UserRepository userRepository;

    public OrderServiceImpl(OrderRepository orderRepository, ModelMapper modelMapper, GameRepository gameRepository, OrderItemsServiceImpl orderItemsService, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.modelMapper = modelMapper;
        this.gameRepository = gameRepository;
        this.orderItemsService = orderItemsService;
        this.userRepository = userRepository;
    }

    @Override
    protected JpaRepository<Order, Long> getRepository() {
        return this.orderRepository;
    }

    @Override
    public OrderDTO createOrderWithItems(OrderDTO dto) {
        Long userId = dto.getUser_id();

        Order order = modelMapper.map(dto, Order.class);

        order.setUser(userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with provided ID:" + userId))
        );

        order.setId(null);
        Order savedOrder = orderRepository.save(order);

        if (savedOrder == null) {
            throw new RuntimeException("Erro ao salvar o pedido.");
        }

        List<OrderItems> items = dto.getOrderItems().stream()
                .map(itemDto -> {
                    OrderItems item = new OrderItems();
                    item.setOrder(savedOrder);
                    item.setAmount(itemDto.getAmount());

                    Game game = gameRepository.findById(itemDto.getGame().getId())
                            .orElseThrow(() -> new RuntimeException("Game not found with ID: " + itemDto.getGame()));

                    item.setGame(game);
                    item.setUnitPrice(game.getPrice());
                    return item;
                }).toList();

        items.forEach(orderItemsService::save);

        BigDecimal total = items.stream()
                .map(i -> i.getUnitPrice().multiply(BigDecimal.valueOf(i.getAmount())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        order.setTotalPrice(total);
        order = orderRepository.save(order);

        dto = modelMapper.map(order, OrderDTO.class);
        List<OrderItemsDTO> itemDTOs = items.stream()
                .map(item -> modelMapper.map(item, OrderItemsDTO.class))
                .toList();

        dto.setOrderItems(itemDTOs);

        return dto;
    }

}
