import { BrowserRouter, NavLink, Route, Routes } from "react-router";
import About from "../About/About";
import Home from "../Home/Home";

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
        <Route path="/" element={<Home />} />
        <Route path="/projects" />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Header;
