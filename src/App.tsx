import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import { Products } from "./components/Projects/Shop/Products/Products";
import { Cart } from "./components/Projects/Shop/Cart/Cart";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects/shop" element={<Products />} />
        <Route path="/projects/shop/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
