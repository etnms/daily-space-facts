import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [toggleButton, setToggleButton] = useState();
  const [navBarLinks, setNavBarLinks] = useState();
  //const toggleButton = document.getElementsByClassName("toggle-button")[0];
  //const navBarLinks = document.getElementsByClassName("navbar-links")[0];

  useEffect(() => {
    setToggleButton(document.getElementsByClassName("toggle-button")[0]);
    setNavBarLinks(document.getElementsByClassName("navbar-links")[0]);
    
      if (navBarLinks !== undefined) {
        toggleButton.addEventListener("click", () => {
          navBarLinks.classList.toggle("active");
        });
      }
    
  }, [toggleButton, navBarLinks]);

  

  return (
    <nav className="navbar">
      <p className="toggle-button">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </p>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/PictureOfTheDay">Picture of the day</Link>
        </li>
        <li>
          <Link to="/Mars">Mars Gallery</Link>
        </li>
        <li>
          <Link to="/NearEarthObjects">Near Earth Objects</Link>
        </li>
        <li>
          <Link to="/SpaceWeather">Space weather</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
