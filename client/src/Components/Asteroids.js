import { useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

const Asteroid = () => {
  const [apiKey, setApiKey] = useState();
  const [loading, setLoading] = useState(true);
  const [imperial, setImperial] = useState(false);
  const [listAsteroids, setListAsteroids] = useState([]);

  const tmpDate = new Date();
  const day =
    tmpDate.getDate() < 10
      ? `0${tmpDate.getDate().toString()}`
      : tmpDate.getDate();
  const month =
    tmpDate.getMonth() + 1 < 10
      ? `0${(tmpDate.getMonth() + 1).toString()}`
      : tmpDate.getDMonth() + 1;
  const year = tmpDate.getFullYear();

  const date = `${year}-${month}-${day}`;

  useEffect(() => {
    getKey();
    asteroids();
  }, [apiKey]);

  const getKey = async () => {
    const query = await fetch("/api");
    const res = await query.json();
    setApiKey(res.apiKey);
  };

  const asteroids = async () => {
    if (apiKey !== undefined) {
      try {
        setLoading(true);
        const query = await fetch(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${apiKey}`
        );
        const res = await query.json();
        setListAsteroids(res.near_earth_objects[date]);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const listMapped = listAsteroids.map((element) => (
    <li className="asteroid-card" key={"asteroid-" + element.name}>
      <h1 className="title-objects">Name: {element.name}</h1>
      <p>
        Magnitude: <strong>{element.absolute_magnitude_h}</strong>
      </p>
      <p>
        Estimated Diameter: Min:{" "}
        <strong>
          {imperial
            ? Math.round(
                element.estimated_diameter.feet.estimated_diameter_min * 100
              ) / 100
            : Math.round(
                element.estimated_diameter.meters.estimated_diameter_min * 100
              ) / 100}
          {imperial ? "ft" : "m"}
        </strong>{" "}
        - Max:{" "}
        <strong>
          {imperial
            ? Math.round(
                element.estimated_diameter.feet.estimated_diameter_max * 100
              ) / 100
            : Math.round(
                element.estimated_diameter.meters.estimated_diameter_max * 100
              ) / 100}
          {imperial ? "ft" : "m"}
        </strong>
      </p>
      <p>
        Closest Approach Date:{" "}
        <strong>
          {element.close_approach_data[0].close_approach_date_full} UTC
        </strong>
      </p>
      <p>
        {" "}
        Will miss the earth by:{" "}
        <strong>
          {imperial
            ? Math.round(
                element.close_approach_data[0].miss_distance.kilometers
              )
            : Math.round(element.close_approach_data[0].miss_distance.miles)}
          {imperial ? "miles" : "kms"}
        </strong>
      </p>
      <p>
        Relative velocity:{" "}
        <strong>
          {imperial
            ? Math.round(
                (element.close_approach_data[0].relative_velocity
                  .miles_per_hour *
                  100) /
                  100
              )
            : Math.round(
                element.close_approach_data[0].relative_velocity
                  .kilometers_per_hour
              )}
          {imperial
            ? "miles/hr"
            : `km/hr (${
                Math.round(
                  element.close_approach_data[0].relative_velocity
                    .kilometers_per_second * 100
                ) / 100
              }km/s)`}
        </strong>
      </p>
      <p>
        Potentially dangerous if impact:{" "}
        {element.is_potentially_hazardous_asteroid ? (
          <strong>Yes</strong>
        ) : (
          "No"
        )}
      </p>
    </li>
  ));
  return (
    <div className="wrapper-asteroid">
      {loading ? 
       <div className="loader"></div> : (
        <main className="asteroid-page">
          <h1 className="title">Near Earth Objects</h1>
          <ToggleSwitch setImperial={setImperial}></ToggleSwitch>  
          <ul className="asteroid-list-cards">{listMapped}</ul>
        </main>
      ) }
    </div>
  );
};

export default Asteroid;
