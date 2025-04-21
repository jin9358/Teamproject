import axios from 'axios';
import { useCart } from '../context/CartContext';

const OrderButton = () => {
  const { cart, clearCart } = useCart();

  const handleOrder = async () => {
    const orderData = {
      items: cart.map(item => ({
        itemType: item.type, // "drink" 또는 "dessert"
        itemId: item.id,
        quantity: item.quantity,
      }))
    };

    try {
      const res = await axios.post('http://localhost:8080/api/order', orderData);
      alert(res.data); // "주문이 완료되었습니다!" 출력
      clearCart(); // 장바구니 비우기
    } catch (err) {
      console.error("주문 실패:", err);
      alert("주문에 실패했습니다.");
    }
  };

  return <button onClick={handleOrder}>🧾 주문하기</button>;
};
