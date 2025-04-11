import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 장바구니에 추가 (중복이면 수량만 증가)
  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      const index = prevItems.findIndex(
        (item) =>
          item.name === newItem.name
      );

      if (index > -1) {
        const updatedItems = [...prevItems];
        updatedItems[index].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  // 수량 변경
  const updateQuantity = (index, quantity) => {
    setCartItems((prevItems) => {
      const updated = [...prevItems];
      updated[index].quantity = quantity;
      return updated.filter(item => item.quantity > 0); // 수량 0이면 제거
    });
  };

  // 항목 삭제
  const removeItem = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);