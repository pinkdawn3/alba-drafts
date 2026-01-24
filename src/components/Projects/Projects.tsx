import { NavLink } from "react-router";
import { Shop } from "./Shop/Shop";

function Projects() {
  return (
    <main>
      <nav>
        <NavLink to="/projects/shop" className={"links-header"}>
          Tienda
        </NavLink>
      </nav>
      <p>Aquí van los proyectos que hago.</p>

      <Shop />
    </main>
  );
}

export default Projects;
