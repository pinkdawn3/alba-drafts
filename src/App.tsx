import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import { Products } from "./components/Projects/Shop/Products/Products";
import { Cart } from "./components/Projects/Shop/Cart/Cart";

import { messages as enMessages } from "./locales/en/messages.ts";
import { messages as esMessages } from "./locales/es/messages.ts";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";

i18n.load("en", enMessages);
i18n.load("es", esMessages);
i18n.activate("en");

function App() {
  return (
    <>
      <I18nProvider i18n={i18n}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects/shop" element={<Products />} />
          <Route path="/projects/shop/cart" element={<Cart />} />
        </Routes>
      </I18nProvider>
    </>
  );
}

export default App;
