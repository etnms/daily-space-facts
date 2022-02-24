import { Link} from "react-router-dom";

const NavBar = () =>{
    
    return(
        <nav className="nav">
            <ul className="navbar">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/PictureOfTheDay">Picture of the day</Link></li>
                <li><Link to="/Mars">Mars Gallery</Link></li>
                <li><Link to="/NearEarthObjects">Near Earth Objects</Link></li>
                <li><Link to="/SpaceWeather">Space weather</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar;