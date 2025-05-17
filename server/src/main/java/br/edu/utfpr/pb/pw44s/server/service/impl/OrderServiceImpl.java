package br.edu.utfpr.pb.pw44s.server.service.impl;

import br.edu.utfpr.pb.pw44s.server.dto.OrderDTO;
import br.edu.utfpr.pb.pw44s.server.dto.OrderItemsDTO;
import br.edu.utfpr.pb.pw44s.server.model.Game;
import br.edu.utfpr.pb.pw44s.server.model.Order;
import br.edu.utfpr.pb.pw44s.server.model.OrderItems;
import br.edu.utfpr.pb.pw44s.server.repository.GameRepository;
import br.edu.utfpr.pb.pw44s.server.repository.OrderRepository;
import br.edu.utfpr.pb.pw44s.server.repository.UserRepository;
import br.edu.utfpr.pb.pw44s.server.service.IOrderItemsService;
import br.edu.utfpr.pb.pw44s.server.service.IOrderService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl extends CrudServiceImpl<Order, Long> implements IOrderService {
    private final OrderRepository orderRepository;
    private final ModelMapper modelMapper;
    private final GameRepository gameRepository;
    private final IOrderItemsService orderItemsService;
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
        dto.setId(null);
        Order order = modelMapper.map(dto, Order.class);
        order.setUser(userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName()));
        order.setDate(LocalDateTime.now());

        List<OrderItems> items = dto.getOrderItems().stream()
                .map(itemDto -> {
                    OrderItems item = new OrderItems();
                    item.setAmount(itemDto.getAmount());

                    Game game = gameRepository.findById(itemDto.getGame().getId())
                            .orElseThrow(() -> new RuntimeException("Game not found with ID: " + itemDto.getGame().getId()));

                    item.setGame(game);
                    item.setUnitPrice(game.getPrice());
                    return item;
                }).toList();

        Order savedOrder = orderRepository.save(order);
        items.forEach(items1 -> {
            items1.setOrder(savedOrder);
            orderItemsService.save(items1);
        });

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

    public OrderDTO findWithId(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with this id: "+ id ));

        OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);
        orderDTO.setOrderItems(findOrderItemsDtoByOrder(order));

        return orderDTO;
    }

    public List<OrderDTO> findAllOrders() {
        return orderRepository.findAll().stream()
                .map(order -> {
                    OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);
                    orderDTO.setOrderItems(findOrderItemsDtoByOrder(order));
                    return orderDTO;
                })
                .collect(Collectors.toList());
    }

    private List<OrderItemsDTO> findOrderItemsDtoByOrder(Order order) {
        return orderItemsService.findOrderItemsWithOrder(order).stream()
                .map(orderItem -> modelMapper.map(orderItem, OrderItemsDTO.class))
                .collect(Collectors.toList());
    }
}
