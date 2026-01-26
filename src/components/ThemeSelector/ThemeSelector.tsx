import { faLightbulb, faMoon } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePreferences } from "../../hooks/usePreferences";

export const ThemeSelector = () => {
  const { theme, toggleTheme } = usePreferences();

  return (
    <>
      <button
        type="button"
        aria-label="toggle between light and dark"
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <FontAwesomeIcon icon={faMoon} />
        ) : (
          <FontAwesomeIcon icon={faLightbulb} />
        )}
      </button>
    </>
  );
};
