import { useEffect, useState } from "react";
import ToggleSwitch from "./ToggleSwitch";

const Asteroid = (props) => {
  const { apiKey } = props;
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
    asteroids();
  }, []);

  const asteroids = async () => {
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
  };

  const listMapped = listAsteroids.map((element) => (
    <li className="asteroid-card" key={"asteroid-" + element.name}>
      <p>Name: {element.name}</p>
      <p>Magnitude: {element.absolute_magnitude_h}</p>
      <p>
        Estimated Diameter: Min:
        {imperial
          ? Math.round(
              element.estimated_diameter.feet.estimated_diameter_min * 100
            ) / 100
          : Math.round(
              element.estimated_diameter.meters.estimated_diameter_min * 100
            ) / 100}
        {imperial ? "ft" : "m"} - Max:
        {imperial
          ? Math.round(
              element.estimated_diameter.feet.estimated_diameter_max * 100
            ) / 100
          : Math.round(
              element.estimated_diameter.meters.estimated_diameter_max * 100
            ) / 100}
        {imperial ? "ft" : "m"}
      </p>
      <p>
        Closest Approach Date{" "}
        {element.close_approach_data[0].close_approach_date_full}
      </p>
      <p>
        {" "}
        Will miss the earth by:{" "}
        {imperial
          ? Math.round(element.close_approach_data[0].miss_distance.kilometers)
          : Math.round(element.close_approach_data[0].miss_distance.miles)}
        {imperial ? "miles" : "kms"}
      </p>
      <p>
        Relative velocity:{" "}
        {imperial
          ? Math.round(
              (element.close_approach_data[0].relative_velocity.miles_per_hour *
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
      </p>
      <p>
        Potentially dangerous if impact:{" "}
        {element.is_potentially_hazardous_asteroid ? "Yes" : "No"}
      </p>
    </li>
  ));
  return (
    <div className="wrapper-asteroid">
      {!loading ? (
        <main className="asteroid-page">
          <ToggleSwitch setImperial={setImperial}></ToggleSwitch>
          <h1 className="title">Near Earth Objects</h1>
          <ul>{listMapped}</ul>
        </main>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
};

export default Asteroid;
