package com.example.cafekiosk.model;

import jakarta.persistence.*;
import lombok.Setter;

@Entity
public class OrderItem {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String path;
    private int quantity;

    @Setter
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
}