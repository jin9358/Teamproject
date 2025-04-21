package com.example.cafekiosk.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true) // 필수 필드 여부 확인 후 설정
    private String name;

    @Column(nullable = true) // 필수 필드 여부 확인 후 설정
    private String path;

    @Column(nullable = false)
    private LocalDateTime orderTime;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> items = new ArrayList<>();

    public Order() {
        this.orderTime = LocalDateTime.now();
    }

    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }

    public void setItems(List<OrderItem> items) {
        this.items.clear(); // 기존 항목 제거
        if (items != null) {
            for (OrderItem item : items) {
                addItem(item);
            }
        }
    }

    public List<OrderItem> getItems() {
        return items;
    }

    // Getter, Setter for name, path, orderTime
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public LocalDateTime getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(LocalDateTime orderTime) {
        this.orderTime = orderTime;
    }
}