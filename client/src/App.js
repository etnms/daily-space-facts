import NavBar from "./Components/Nav";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ImageDay from "./Components/ImageDay";
import Home from "./Components/Home";
import Asteroid from "./Components/Asteroids";
import SpaceWeather from "./Components/SpaceWeather";
import Mars from "./Components/Mars";

const App = () => {

  return (
    <div className="App">
      <h1 className="brand">DSF - Daily Space Facts</h1>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/PictureOfTheDay" element={<ImageDay />} />
          <Route path="/Mars" element={<Mars />} />
          <Route path="/NearEarthObjects" element={<Asteroid />} />
          <Route path="/SpaceWeather" element={<SpaceWeather />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
