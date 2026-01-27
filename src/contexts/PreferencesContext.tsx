import { createContext } from "react";
import type { CartProps } from "../types/cart";
import type { Language, Theme } from "../types/preferences";

export interface PreferencesContextType {
  theme: Theme;
  setTheme: (value: Theme | ((prev: Theme) => Theme)) => void;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (value: Language | ((prev: Language) => Language)) => void;
  cart: CartProps;
  setCart: (value: CartProps | ((prev: CartProps) => CartProps)) => void;
}

export const PreferencesContext = createContext<
  PreferencesContextType | undefined
>(undefined);
