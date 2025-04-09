import { useState } from "react";

const useKiosk = () => {
    const [cartItems, setCartItems] = useState([]);

    const changeCartItem = (pid, amount) => {
        const updated = cartItems
            .map(item => {
                if (item.product.pid === parseInt(pid)) {
                    const newQty = item.qty + amount;
                    if (newQty <= 0) return null; // 제거할 항목
                    return { ...item, qty: newQty };
                }
                return item;
            })
            .filter(item => item !== null);
        setCartItems(updated);
    };

    const addToCart = (product) => {
        const exists = cartItems.some(item => item.product.pid === product.pid);

        if (exists) {
            const updated = cartItems.map(item =>
                item.product.pid === product.pid
                    ? { ...item, qty: item.qty + 1 }
                    : item
            );
            setCartItems(updated);
        } else {
            setCartItems([...cartItems, { product, qty: 1 }]);
        }
    };

    return { cartItems, changeCartItem, addToCart };
};

export default useKiosk;