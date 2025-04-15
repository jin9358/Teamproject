import { useState } from "react";
import { drinks } from "../data/drinks";
import { desserts } from "../data/desserts";
import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";
import '../css/menu.css'
import Footer from "./footer";

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
    setMessage(`${item.name}(이)가 장바구니에 담겼습니다!`);
    setTimeout(() => setMessage(""), 1000);
  };

  const renderItems = () => {
    if (activeTab === "coffee") {
      return (
        <div className="menu-grid">
          {drinks.map((drink) => (
            <button key={drink.name} onClick={() => handleAddToCart(drink)} className="menu-card">
              <img src={drink.image} alt={drink.name} />
              <p>
                {drink.name}
                <br />
                {drink.basePrice.toLocaleString()}원
              </p>
            </button>
          ))}
        </div>
      );
    } else {
      return (
        <div className="menu-grid">
          {desserts.map((dessert) => (
            <button key={dessert.name} onClick={() => handleAddToCart(dessert)} className="menu-card">
              <img src={dessert.image} alt={dessert.name} />
              <p>
                {dessert.name}
                <br />
                {dessert.price.toLocaleString()}원
              </p>
            </button>
          ))}
        </div>
      );
    }
  };

  return (
    <div >
      <div >
        <div className="tab-container">
        <input type="radio" name="tab" id="tab1" className="tab tab--1" />
          <label className="tab_label" htmlFor="tab1"
            onClick={() => setActiveTab("coffee")}
          >
            ☕ coffee
          </label>
          <input type="radio" name="tab" id="tab2" className="tab tab--2" />
          <label className="tab_label" htmlFor="tab2"
            onClick={() => setActiveTab("dessert")}
          >
            🍰 dessert
          </label>

          <div className="indicator"></div>
        </div>

      </div>

      {/* 피드백 메시지 */}
      {message && (
        <div className="message">
          {message}
        </div>
      )}

      {/* 아이템 리스트 */}
      <div>{renderItems()}</div>

      <Footer />
    </div>
  );
}

export default Menu;