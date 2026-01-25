import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { i18n } from "@lingui/core";
import { Trans } from "@lingui/react/macro";
import type { FunctionComponent } from "react";

export const LanguageSelector: FunctionComponent = () => {
  return (
    <>
      <Menu as="div" className="relative inline-block">
        <MenuButton className={"link-style"}>
          <FontAwesomeIcon icon={faLanguage} />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <button
                onClick={() => i18n.activate("en")}
                className="block w-full px-4 py-2 text-left text-sm bg-transparent text-gray-300 data-focus:text-white data-focus:outline-hidden"
              >
                <Trans>English</Trans>
              </button>
            </MenuItem>

            <MenuItem>
              <button
                onClick={() => i18n.activate("es")}
                className="block w-full px-4 py-2 text-left text-sm bg-transparent text-gray-300 data-focus:text-white data-focus:outline-hidden"
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
