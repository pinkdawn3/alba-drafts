import { NavLink } from "react-router";

function Header() {
  return (
    <nav className="header">
      <NavLink to="/" className={"links-header"}>
        Home
      </NavLink>
      <NavLink to="/projects" className={"links-header"}>
        Projects
      </NavLink>
      <NavLink to="/about" className={"links-header"}>
        About me
      </NavLink>
    </nav>
  );
}

export default Header;
