package br.edu.utfpr.pb.pw44s.server.service;

import br.edu.utfpr.pb.pw44s.server.dto.OrderDTO;
import br.edu.utfpr.pb.pw44s.server.model.Order;

public interface IOrderService extends ICrudService<Order, Long> {
    public OrderDTO createOrderWithItems(OrderDTO dto);
}
