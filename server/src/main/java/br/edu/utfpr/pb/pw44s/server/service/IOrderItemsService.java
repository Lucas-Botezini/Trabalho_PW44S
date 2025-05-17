package br.edu.utfpr.pb.pw44s.server.service;

import br.edu.utfpr.pb.pw44s.server.model.Order;
import br.edu.utfpr.pb.pw44s.server.model.OrderItems;

import java.util.List;

public interface IOrderItemsService extends ICrudService<OrderItems, Long> {
    List<OrderItems> findOrderItemsWithOrder(Order order);
}
