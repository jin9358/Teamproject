import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Menu from "./routes/Menu";
import DrinkDetail from "./components/DrinkDetail";
import DessertDetail from "./components/DessertDetail";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:drinkName" element={<DrinkDetail />} />
          <Route path="/dessert/:dessertName" element={<DessertDetail />} />
        </Routes>
      </Router>
  );
}

export default App;