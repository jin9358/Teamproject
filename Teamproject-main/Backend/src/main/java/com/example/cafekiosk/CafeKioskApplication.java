package com.example.cafekiosk;

import com.example.cafekiosk.model.Dessert;
import com.example.cafekiosk.model.Drink;
import com.example.cafekiosk.repository.DessertRepository;
import com.example.cafekiosk.repository.DrinkRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CafeKioskApplication implements CommandLineRunner{
    private static final Logger LOGGER = LoggerFactory.getLogger(CafeKioskApplication.class);
    private final DrinkRepository drinkRepository;
    private final DessertRepository dessertRepository;

    public CafeKioskApplication(DrinkRepository drinkRepository, DessertRepository dessertRepository) {
        this.drinkRepository = drinkRepository;
        this.dessertRepository = dessertRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(CafeKioskApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        drinkRepository.save(new Drink("아메리카노", "americano", 3000, "/images/Americano.jpg"));
        drinkRepository.save(new Drink("카페 라떼", "cafe-latte", 3500, "/images/cafelatte.jpg"));
        drinkRepository.save(new Drink("바닐라 라떼", "vanilla-latte", 3800, "/images/vanillalatte.jpg"));
        drinkRepository.save(new Drink("캬라멜 마끼아또", "caramel-macchiato", 4000, "/images/caramelmacchiato.jpg"));
        drinkRepository.save(new Drink("카푸치노", "cappuccino", 3700, "/images/cappuccino.jpg"));
        drinkRepository.save(new Drink("테스트", "cappuccino", 3700, "/images/cappuccino.jpg"));
        drinkRepository.save(new Drink("테스트1", "cappuccino", 3700, "/images/cappuccino.jpg"));
        drinkRepository.save(new Drink("테스트2", "cappuccino", 3700, "/images/cappuccino.jpg"));
        drinkRepository.save(new Drink("테스트3", "cappuccino", 3700, "/images/cappuccino.jpg"));
        drinkRepository.save(new Drink("테스트4", "cappuccino", 3700, "/images/cappuccino.jpg"));

        dessertRepository.save(new Dessert("초콜릿 케이크", 4300, "/images/chocolatecake.jpg"));
        dessertRepository.save(new Dessert("치즈 케이크", 4000, "/images/cheesecake.jpg"));
        dessertRepository.save(new Dessert("당근 케이크", 3800, "/images/carrotcake.jpg"));
        dessertRepository.save(new Dessert("마카롱", 2000, "/images/macaroon.jpg"));
        dessertRepository.save(new Dessert("테스트", 2000, "/images/macaroon.jpg"));
        dessertRepository.save(new Dessert("테스트1", 2000, "/images/macaroon.jpg"));
        dessertRepository.save(new Dessert("테스트2", 2000, "/images/macaroon.jpg"));
        dessertRepository.save(new Dessert("테스트3", 2000, "/images/macaroon.jpg"));
        dessertRepository.save(new Dessert("테스트4", 2000, "/images/macaroon.jpg"));

        for (Drink drink : drinkRepository.findAll()) {
            LOGGER.info("Drink: name={}, path={}, price={}",
                    drink.getName(), drink.getPath(), drink.getBasePrice());
        }
        for (Dessert dessert : dessertRepository.findAll()) {
            LOGGER.info("Dessert: name={}, price={}",
                    dessert.getName(), dessert.getPrice());
        }
    }
}
