import { useContext } from "react";
<<<<<<< HEAD
import { PreferencesContext } from "../contexts/PreferencesContext";
=======
import { PreferencesContext } from "../contexts/Preferences/PreferencesContext";
>>>>>>> book-tracker

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }
  return context;
}
