import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { i18n } from "@lingui/core";
import { Trans } from "@lingui/react/macro";
import type { FunctionComponent } from "react";
import { usePreferences } from "../../hooks/usePreferences";
import type { Language } from "../../types/preferences";

export const LanguageSelector: FunctionComponent = () => {
  const { setLanguage } = usePreferences();

  const handleLanguage = (lan: Language) => {
    i18n.activate(lan);
    setLanguage(lan);
  };

  return (
    <>
      <Menu as="div" className="relative inline-block">
        <MenuButton className={"link-style"}>
          <FontAwesomeIcon icon={faLanguage} />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-primary transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <button
                onClick={() => handleLanguage("en")}
                className="block w-full px-4 py-2 text-left text-sm bg-primary text-gray-200 data-focus:text-white"
              >
                <Trans>English</Trans>
              </button>
            </MenuItem>

            <MenuItem>
              <button
                onClick={() => handleLanguage("es")}
                className="block w-full px-4 py-2 text-left text-sm bg-primary text-gray-200 data-focus:text-white"
              >
                <Trans id="language_selector">Spanish</Trans>
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </>
  );
};
