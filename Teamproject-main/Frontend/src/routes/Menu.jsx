import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../components/CartContext";
import { getDrinks, getDesserts } from "../api/menuApi";
import "../css/menu.css";
import Footer from "./footer";

function Menu() {
  const [activeTab, setActiveTab] = useState("coffee");
  const [message, setMessage] = useState(""); // 피드백 메시지 상태
  const { addToCart, cartItems } = useCart();
  const BACKEND_URL = "http://localhost:8080";

  // 음료 데이터 가져오기
  const {
    data: drinks,
    isLoading: drinksLoading,
    error: drinksError,
  } = useQuery({
    queryKey: ["drinks"],
    queryFn: getDrinks,
  });

  // 디저트 데이터 가져오기
  const {
    data: desserts,
    isLoading: dessertsLoading,
    error: dessertsError,
  } = useQuery({
    queryKey: ["desserts"],
    queryFn: getDesserts,
  });

  // cartItems 변경 시 로그 추가
  useEffect(() => {
  }, [cartItems]);

  // 상품 클릭 시 장바구니에 추가
  const handleAddToCart = useCallback((item, type) => {
    const cartItem = {
      name: item.name || 'Unknown Item',
      price: item.basePrice || item.price || item.cost || item.value || 0,
      type: type.toUpperCase(), // DRINK 또는 DESSERT
    };
    addToCart(cartItem);

    // 피드백 메시지
    setMessage(`${item.name}(이)가 장바구니에 담겼습니다!`);
    setTimeout(() => setMessage(""), 1000);
  }, [addToCart]);

  const renderItems = () => {
    const items = activeTab === "coffee" ? drinks : desserts;
    if (!items) {
      return null;
    }
    return (
      <div className="menu-grid">
        {items.map((item) => (
          <button
            key={item.name || `temp-name-${Date.now()}`} // name을 key로 사용
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(item, activeTab === "coffee" ? "DRINK" : "DESSERT");
            }}
            className="menu-card"
          >
            <img
              src={`${BACKEND_URL}${item.image}`}
              alt={item.name || 'Unknown Item'}
              loading="lazy"
              className="card-image"
            />
            <p>
              {item.name || 'Unknown Item'}
              <br />
              {(item.basePrice || item.price || item.cost || item.value || 0).toLocaleString()} 원
            </p>
          </button>
        ))}
      </div>
    );
  };

  if (drinksLoading || dessertsLoading) {
    return <span>Loading 중...⚙</span>;
  }

  if (drinksError || dessertsError) {
    return <span>데이터 가져오기 중 오류 발생🔴: {drinksError?.message || dessertsError?.message}</span>;
  }

  return (
    <div>
      <div>
        <div className="radio-input">
          <label>
            <input type="radio" id="value-1" name="value-radio" value="value-1" onClick={() => setActiveTab("coffee")}/>
            <span>
              coffee☕
            </span>
          </label>
          <label>
            <input type="radio" id="value-2" name="value-radio" value="value-2" onClick={() => setActiveTab("dessert")}/>
            <span>
              dessert🍰
            </span>
          </label>
          <span className="selection"></span>
        </div>
      </div>

      {/* 피드백 메시지 */}
      {message && (
        <div className="message">
          {message}
        </div>
      )}

      <div>{renderItems()}</div>
      <Footer />
    </div>
  );
}

export default Menu;