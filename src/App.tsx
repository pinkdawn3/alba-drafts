import { lazy, useMemo } from "react";
import { Route, Routes } from "react-router";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";

const About = lazy(() => import("./components/About/About"));
const Cart = lazy(() => import("./components/Projects/Shop/Cart/Cart"));
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
const Products = lazy(
  () => import("./components/Projects/Shop/Products/Products"),
);
const TaskManager = lazy(
  () => import("./components/Projects/TaskManager/TaskManager.tsx"),
);

import { messages as enMessages } from "./locales/en/messages.ts";
import { messages as esMessages } from "./locales/es/messages.ts";

import { usePreferences } from "./hooks/usePreferences.tsx";
import { Toaster } from "react-hot-toast";

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
        <Toaster position="top-right" reverseOrder={false} />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects/shop" element={<Products />} />
          <Route path="/projects/shop/cart" element={<Cart />} />
          <Route path="/projects/taskManager" element={<TaskManager />} />
        </Routes>
      </I18nProvider>
    </>
  );
}

export default App;
