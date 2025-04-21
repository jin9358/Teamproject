// export default Cart;
import { useCart } from '../components/CartContext';
import { useEffect } from 'react';

function Cart({ isFooter = false }) {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();

  useEffect(() => {
    // 휠 이벤트 핸들러
    const handleWheel = (e) => {
      if (e.target.closest('.cart-list')) {
        e.preventDefault();
        const scrollSpeed = 0.5; // 스크롤 속도 조절
        e.target.closest('.cart-list').scrollLeft += e.deltaY * scrollSpeed;
      }
    };

    // 페이지가 새로 고침되면 휠 이벤트 리스너를 추가
    const cartListElement = document.querySelector('.cart-list');
    if (cartListElement) {
      cartListElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    // 컴포넌트 언마운트되거나 새로 고침될 때 이벤트 리스너를 제거
    return () => {
      if (cartListElement) {
        cartListElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [cartItems]); // cartItems가 변경될 때마다 실행

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleDecrease = (index) => {
    const currentQty = cartItems[index].quantity || 1;
    if (currentQty > 1) {
      updateQuantity(index, currentQty - 1);
    } else {
      removeItem(index);
    }
  };

  const handleIncrease = (index) => {
    const currentQty = cartItems[index].quantity || 1;
    updateQuantity(index, currentQty + 1);
  };

  const handleOrderSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            itemId: item.id || item.name,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            type: item.type,
          })),
          totalPrice: total,
        }),
      });

      if (response.ok) {
        alert('🧾 주문이 완료되었습니다!');
        clearCart();
      } else {
        alert('주문 실패 😥');
      }
    } catch (error) {
      console.error('Order error:', error);
      alert('서버 오류 발생');
    }
  };

  return (
    <div style={{ padding: isFooter ? '0 1rem' : '5px 150px' }}>
      <h2 style={{ marginTop: isFooter ? '0.5rem' : '1rem' }}>🛒 장바구니</h2>


      {cartItems.length === 0 ? (
        <p>장바구니가 비어있습니다.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item, index) => (
            <li key={`${item.name}-${item.type}-${index}`} className="cart-item">
              <div>
                <strong>{item.name || 'Unknown Item'}</strong>
                <div>
                  <button onClick={() => handleDecrease(index)}>➖</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => handleIncrease(index)}>➕</button>
                  <button onClick={() => removeItem(index)}>❌</button>
                </div>
                <div>
                  가격: {(item.price || 0).toLocaleString()}원
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && (
        <>
          <hr />
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <h3>
              총 합계: {total.toLocaleString()}원
              <button onClick={handleOrderSubmit}
                style={{
                  display: 'block',
                  margin: '16px auto',
                  padding: '10px 10px'
                }}>
                ✅ 주문하기
              </button>
            </h3>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
