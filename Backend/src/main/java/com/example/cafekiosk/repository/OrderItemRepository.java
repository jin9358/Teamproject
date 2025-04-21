package com.example.cafekiosk.repository;

import com.example.cafekiosk.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    // 특정 주문에 속한 항목 조회
    List<OrderItem> findByOrderId(Long orderId);
}
