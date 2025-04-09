import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { drinks } from "../data/drinks";
import { SIZE_PRICE, SHOT_PRICE, SYRUP_PRICE } from "../data/prices";

function DrinkDetail() {
  const { drinkName } = useParams();

  const drink = drinks.find(d => d.path === drinkName);
  const [temperature, setTemperature] = useState("Ice");
  const [size, setSize] = useState("Short");
  const [shot, setShot] = useState("기본");
  const [syrup, setSyrup] = useState("기본");
  const [totalPrice, setTotalPrice] = useState(drink.basePrice);

  useEffect(() => {
    const newPrice =
      drink.basePrice +
      SIZE_PRICE[size] +
      SHOT_PRICE[shot] +
      SYRUP_PRICE[syrup];
    setTotalPrice(newPrice);
  }, [size, shot, syrup, drink.basePrice]);

  return (
    <div>
      <h2>{drink.name} 옵션 선택</h2>

      <div>
        <h4>온도</h4>
        <button onClick={() => setTemperature("Ice")}>Ice</button>
        <button onClick={() => setTemperature("Hot")}>Hot</button>
      </div>

      <div>
        <h4>사이즈</h4>
        {Object.keys(SIZE_PRICE).map(option => (
          <button key={option} onClick={() => setSize(option)}>
            {option}
            {<div>+{SIZE_PRICE[option]}</div>}
          </button>
        ))}
      </div>

      <div>
        <h4>샷</h4>
        {Object.keys(SHOT_PRICE).map(option => (
          <button key={option} onClick={() => setShot(option)}>
            {option}
            {<div>+{SHOT_PRICE[option]}</div>}
          </button>
        ))}
      </div>

      <div>
        <h4>시럽</h4>
        {Object.keys(SYRUP_PRICE).map(option => (
          <button key={option} onClick={() => setSyrup(option)}>
            {option}
            {<div>+{SYRUP_PRICE[option]}</div>}
          </button>
        ))}
      </div>

      <h3>총 가격: {totalPrice.toLocaleString()}원</h3>
      <button>🛒 장바구니에 담기</button>
    </div>
  );
}

export default DrinkDetail;
