import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { drinks } from "../data/drinks";
import { desserts } from "../data/desserts";

function Menu() {
  const [activeTab, setActiveTab] = useState("coffee");
  const navigate = useNavigate();

  const renderItems = () => {
    if (activeTab === "coffee") {
      return drinks.map((drink) => (
        <button
          key={drink.name}
          onClick={() => navigate(`/menu/${drink.path}`)}
        >
        <img src={drink.image} alt={drink.name}/>
        <div>{drink.name}<br />{drink.basePrice.toLocaleString()} 원</div>
        </button>
      ));
    } else {
      return desserts.map((dessert) => (
        <button
          key={dessert.name}
          onClick={() => navigate(`/menu/${dessert.name}`)}
        >
          {dessert.name} <br />
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

      {/* 아이템 리스트 */}
      <div>{renderItems()}</div>
    </div>
  );
}

export default Menu;
