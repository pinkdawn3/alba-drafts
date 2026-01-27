import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

import { useMemo } from "react";
import { usePreferences } from "./hooks/usePreferences.tsx";

import { About } from "./components/About/About.tsx";
import { Cart } from "./components/Projects/Shop/Cart/Cart";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Products } from "./components/Projects/Shop/Products/Products";
//import { TaskManager } from "./components/Projects/TaskManager/TaskManager.tsx";

import { messages as enMessages } from "./locales/en/messages.ts";
import { messages as esMessages } from "./locales/es/messages.ts";

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
          {/* <Route path="/projects/taskManager" element={<TaskManager />} /> */}
        </Routes>
      </I18nProvider>
    </>
  );
}

export default App;
