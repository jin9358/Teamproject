import { useState } from "react";
import { drinks } from "../data/drinks";
import { desserts } from "../data/desserts";
import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";
import '../css/menu.css'

function Menu() {
  const [activeTab, setActiveTab] = useState("coffee");
  const [message, setMessage] = useState(""); // 피드백 메시지 상태
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    const cartItem = {
      name: item.name,
      temperature: "Ice", // 기본값
      size: "Short",      // 기본값
      shot: "기본",
      syrup: "기본",
      price: item.basePrice || item.price,
    };

    addToCart(cartItem);
    // setMessage(`${item.name}가 장바구니에 담겼습니다!`);

    // 2초 후 메시지 사라지게
    setTimeout(() => setMessage(""), 2000);
  };

  const renderItems = () => {
    if (activeTab === "coffee") {
      return drinks.map((drink) => (
          <button key={drink.name} onClick={() => handleAddToCart(drink)} className="menu-card">
            <img src={drink.image} alt={drink.name} />
            <div>
              {drink.name}
              <br />
              {drink.basePrice.toLocaleString()} 원
            </div>
          </button>
      ));
    } else {
      return desserts.map((dessert) => (
        <button key={dessert.name} onClick={() => handleAddToCart(dessert)}>
          {dessert.name}
          <br />
          {dessert.price.toLocaleString()} 원
        </button>
      ));
    }
  };

  return (
    <div style={{ padding: "150px" }}>
      {/* 탭 버튼 */}
      <div>
        <button
          style={{
            backgroundColor: activeTab === "coffee" ? "#5f5f5f" : "#000",
          }}
          onClick={() => setActiveTab("coffee")}
        >
          ☕ coffee
        </button>
        <button
          style={{
            backgroundColor: activeTab === "dessert" ? "#5f5f5f" : "#000",
          }}
          onClick={() => setActiveTab("dessert")}
        >
          🍰 dessert
        </button>
      </div>

      {/* 피드백 메시지 */}
      {message && (
        <div style={{ margin: "10px 0", color: "green", fontWeight: "bold" }}>
          {message}
        </div>
      )}

      {/* 아이템 리스트 */}
      <div>{renderItems()}</div>
    </div>
  );
}

export default Menu;