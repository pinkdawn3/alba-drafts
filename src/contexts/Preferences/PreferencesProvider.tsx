import useLocalStorageState from "use-local-storage-state";
import { PreferencesContext } from "./PreferencesContext";
import { useEffect, type ReactNode } from "react";
import type { CartProps } from "../../types/cart";
import type { Language, Theme } from "../../types/preferences";

interface PreferencesProviderProps {
  children: ReactNode;
}

export function PreferencesProvider({ children }: PreferencesProviderProps) {
  const browserTheme: Theme = window.matchMedia("(prefers-color-scheme: dark)")
    .matches
    ? "dark"
    : "light";

  const [theme, setTheme] = useLocalStorageState<Theme>("theme", {
    defaultValue: browserTheme,
  });

  const [language, setLanguage] = useLocalStorageState<Language>("language", {
    defaultValue: "en",
  });

  const [cart, setCart] = useLocalStorageState<CartProps>("cart", {
    defaultValue: {},
  });

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);

  const value = {
    theme,
    setTheme,
    toggleTheme,
    language,
    setLanguage,
    cart,
    setCart,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}
