import { NavLink, useNavigate } from "react-router";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

function Header() {
  const navigate = useNavigate();

  const navigateToShop = () => {
    navigate("/projects/shop");
  };
  return (
    <nav className="py-5 px-5 shadow-xl space-x-5 font-bold">
      <NavLink to="/">Home</NavLink>

      <Menu as="div" className="relative inline-block">
        <MenuButton className={"link-style"}>Projects</MenuButton>

        <MenuItems
          transition
          className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <button
                onClick={navigateToShop}
                className="block w-full px-4 py-2 text-left text-sm bg-transparent text-gray-300 data-focus:text-white data-focus:outline-hidden"
              >
                Shop
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>

      <NavLink to="/about">About me</NavLink>
    </nav>
  );
}

export default Header;
