import { NavLink } from "react-router";

function Header() {
  return (
    <nav className="py-5 px-5 shadow-xl space-x-5 font-bold">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/projects">Projects</NavLink>
      <NavLink to="/about">About me</NavLink>
    </nav>
  );
}

export default Header;
