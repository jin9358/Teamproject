package com.example.cafekiosk.server;

import com.example.cafekiosk.model.Order;
import com.example.cafekiosk.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Transactional
    public Order createOrder(Order order) {
        if (order.getItems() != null) {
            order.setItems(order.getItems());
        }
        return orderRepository.save(order);
    }
}