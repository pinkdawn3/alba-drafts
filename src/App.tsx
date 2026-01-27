import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";

import Home from "./components/Home/Home";
const About = lazy(() => import("./components/About/About"));
const Products = lazy(
  () => import("./components/Projects/Shop/Products/Products"),
);
const Cart = lazy(() => import("./components/Projects/Shop/Cart/Cart"));

import { messages as enMessages } from "./locales/en/messages.ts";
import { messages as esMessages } from "./locales/es/messages.ts";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { usePreferences } from "./hooks/usePreferences.tsx";
import { lazy, useMemo } from "react";

i18n.load("en", enMessages);
i18n.load("es", esMessages);

function App() {
  const { language } = usePreferences();

  useMemo(() => {
    i18n.activate(language);
  }, [language]);

  return (
    <>
      <I18nProvider i18n={i18n}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects/shop" element={<Products />} />
            <Route path="/projects/shop/cart" element={<Cart />} />
          </Routes>
        </main>
      </I18nProvider>
    </>
  );
}

export default App;
