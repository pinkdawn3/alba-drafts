import { BrowserRouter, NavLink, Route, Routes } from "react-router";

function Header() {
  return (
    <BrowserRouter>
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

      <Routes>
        <Route path="/" />
        <Route path="/projects" />
        <Route path="/about" />
      </Routes>
    </BrowserRouter>
  );
}

export default Header;
