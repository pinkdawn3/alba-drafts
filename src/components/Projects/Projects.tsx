import { NavLink } from "react-router";
import { Products } from "./Shop/Products/Products";

function Projects() {
  return (
    <main>
      <nav className="px-10 py-5 font-semibold">
        <NavLink to="/projects/shop">Tienda</NavLink>
      </nav>
      <Products />
    </main>
  );
}

export default Projects;
