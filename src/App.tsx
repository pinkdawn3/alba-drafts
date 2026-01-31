import { lazy, useMemo } from "react";
import { Route, Routes } from "react-router";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
const About = lazy(() => import("./pages/About.tsx"));
const Cart = lazy(() => import("./components/Projects/Shop/Cart/Cart"));
import Header from "./components/Header/Header";
import Home from "./pages/Home.tsx";
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
import BookDashboard from "./components/Projects/BookTracker/BookDashboard.tsx";

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
          <Route path="/projects/task-manager" element={<TaskManager />} />
          <Route path="/projects/book-tracker" element={<BookDashboard />} />
        </Routes>
      </I18nProvider>
    </>
  );
}

export default App;
