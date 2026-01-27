import { NavLink, useNavigate } from "react-router";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Trans } from "@lingui/react/macro";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import { ThemeSelector } from "../ThemeSelector/ThemeSelector";

function Header() {
  const navigate = useNavigate();

  const navigateToDemo = async (route: string) => {
    await navigate(`/projects/${route}`);
  };

  return (
    <header className="flex justify-between shadow-xl bg-background text-primary ">
      <nav className="py-5 px-5  space-x-5 font-bold">
        <NavLink to="/">
          <Trans>Home</Trans>
        </NavLink>

        <Menu as="div" className="relative inline-block">
          <MenuButton className={"link-style"}>
            <Trans>Projects</Trans>
          </MenuButton>

          <MenuItems
            transition
            className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-primary transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <button
                  type="button"
                  aria-label="Button for the Shop demo"
                  onClick={() => navigateToDemo("shop")}
                  className="block w-full px-4 py-2 text-left text-sm bg-primary text-gray-200 data-focus:text-white"
                >
                  <Trans>Shop</Trans>
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  type="button"
                  aria-label="Button for the Task Manager demo"
                  onClick={() => navigateToDemo("taskManager")}
                  className="block w-full px-4 py-2 text-left text-sm bg-primary text-gray-200 data-focus:text-white"
                >
                  <Trans>Task Manager</Trans>
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>

        <NavLink to="/about">
          <Trans>About me</Trans>
        </NavLink>
      </nav>

      <div className="py-5 px-10 space-x-2 font-bold">
        <ThemeSelector />
        <LanguageSelector />
      </div>
    </header>
  );
}

export default Header;
