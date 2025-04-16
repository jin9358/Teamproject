import americano from '../img/americano.jpg';
import cafeLatte from '../img/cafelatte.jpg';
import vanillaLatte from '../img/vanillalatte.jpg';
import caramelMacchiato from '../img/caramelmacchiato.jpg';
import cappuccino from '../img/cappuccino.jpg';
import affogato from '../img/affogato.jpg';



export const drinks = [
  { name: "아메리카노", path: "americano", basePrice: 3000, image: americano, width: 150, height: 150},
  { name: "카페 라떼", path: "cafe-latte", basePrice: 3500, image:  cafeLatte, width: 150, height: 150},
  { name: "바닐라 라떼", path: "vanilla-latte", basePrice: 3800, image:  vanillaLatte, width: 150, height: 150},
  { name: "캬라멜 마끼아또", path: "caramel-macchiato", basePrice: 4000, image: caramelMacchiato, width: 150, height: 150},
  { name: "카푸치노", path: "cappuccino", basePrice: 3700, image:  cappuccino, width: 150, height: 150},
  { name: "아포 카토", path: "affogato", basePrice: 4500, image: affogato, width: 150, height: 150},
];
