import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";

const SpaceWeather = () => {
  //const [apiKey, setApiKey] = useState();

  const [date, setDate] = useState("yyyy-MM-dd"); //defaut date for API
  const [dateTitle, setDateTitle] = useState(" in the last 30 days"); //defaut to last 30days
  const [selectInt, setSelectInt] = useState(0);
  const [results, setResults] = useState([]);

  //loading and search booleans to display different items
  const [searchFound, setSearchFound] = useState(true);
  const [loading, setLoading] = useState(true);

  const typeArray = ["FLR", "GST", "CME", "IPS"];
  const title = [
    "Solar flares",
    "Geomagnetic storms",
    "Coronal Mass Ejections (CME)",
    "Interplanetary Shocks",
  ];
  //once a value is selected save it in current value for individual searches
  const [currentValue, setCurrentValue] = useState("FLR"); //defaut to flares
  useEffect(() => {
    fetchWeather(typeArray[0]);
  }, []);

  const fetchWeather = async (type) => {
    setLoading(true);
    const query = {
      method: "GET",
      url: `/api/space-weather`,
      params: {
        type: `${type}?`,
        startDate: date,
        endDate: date,
      },
    };
    axios
      .request(query)
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setResults(response.data);
        resultWeather(results);
        setSearchFound(true);
        if (response.data === "") {
          setSearchFound(false);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatDate = (date) => {
    let letString = date.replace(/[Z]/g, "");
    letString = letString.replace(/[T]/g, " ");
    return letString;
  };
  // Displays the different lists that are chosen by the users
  const resultWeather = (weatherType) => {
    if (weatherType.length === 0) {
      return;
    }

    if (weatherType[0].flrID !== undefined) {
      return (
        <main className="results-weather">
          <h1 className="title">Solar flares {dateTitle}</h1>
          <span className="number-results">
            Results: <strong>{weatherType.length}</strong>
          </span>
          <ul className="list-weather list-flares">
            {weatherType.map((el) => (
              <li key={el.flrID}>
                <p>Begin time: {formatDate(el.beginTime)} UTC</p>
                <p>End time: {formatDate(el.endTime)} UTC</p>
                <p>Peak time: {formatDate(el.peakTime)} UTC</p>
                <p>Class type: {el.classType}</p>
              </li>
            ))}
          </ul>
        </main>
      );
    }
    if (weatherType[0].gstID !== undefined)
      return (
        <main className="results-weather">
          <h1 className="title">Geomagnetic storms {dateTitle}</h1>
          <span className="number-results">
            Results: <strong>{weatherType.length}</strong>
          </span>
          <ul className="list-weather list-storms">
            {weatherType.map((el) => (
              <li key={el.gstID}>
                <p>Start time: {formatDate(el.startTime)} UTC</p>
                <p>
                  Observed time: {formatDate(el.allKpIndex[0].observedTime)} UTC
                </p>
                <p>KP index: {el.allKpIndex[0].kpIndex}</p>
              </li>
            ))}
          </ul>
        </main>
      );

    // Coronal Mass Ejection
    if (
      weatherType[0].catalog !== undefined &&
      weatherType[0].eventTime === undefined
    ) {
      return (
        <main className="results-weather">
          <h1 className="title">Coronal Mass Ejections (CME) {dateTitle}</h1>
          <span className="number-results">
            Results: <strong>{weatherType.length}</strong>
          </span>
          <ul className="list-weather list-coronal">
            {weatherType.map((el) => {
              if (el.cmeAnalyses !== null)
                return (
                  <li key={el.activityID}>
                    <p>Start time: {formatDate(el.startTime)} UTC</p>
                    <p>Latitude: {el.cmeAnalyses[0].latitude}</p>
                    <p>Longitude: {el.cmeAnalyses[0].longitude}</p>
                    <p>Type: {el.cmeAnalyses[0].type}</p>
                    <p>Speed: {el.cmeAnalyses[0].speed} km/s</p>
                    <p>Notes: {el.note}</p>
                  </li>
                );
              else return null;
            })}
          </ul>
        </main>
      );
    }

    //Interplanetary shock
    if (
      weatherType[0].catalog !== undefined &&
      weatherType[0].eventTime !== undefined
    )
      return (
        <main className="results-weather">
          <h1 className="title">Interplanetary shocks {dateTitle}</h1>
          <span className="number-results">
            Results: <strong>{weatherType.length}</strong>
          </span>
          <ul className="list-weather list-shocks">
            {weatherType.map((el) => (
              <li key={el.activityID}>
                <p>Event time: {formatDate(el.eventTime)} UTC</p>
                <p>Location of observation: {el.location}</p>
              </li>
            ))}
          </ul>
        </main>
      );
  };

  return (
    <div className="weather-main">
      <ul className="list-btn-weather">
        <li>
          <button
            className="btn"
            onClick={() => {
              fetchWeather(typeArray[0]);
              setCurrentValue(typeArray[0]);
              setSelectInt(0);
            }}>
            Solar flares
          </button>
        </li>
        <li>
          <button
            className="btn"
            onClick={() => {
              fetchWeather(typeArray[1]);
              setCurrentValue(typeArray[1]);
              setSelectInt(1);
            }}>
            Geomagnetic storms
          </button>
        </li>
        <li>
          <button
            className="btn"
            onClick={() => {
              fetchWeather(typeArray[2]);
              setCurrentValue(typeArray[2]);
              setSelectInt(2);
            }}>
            Coronal Mass Ejections
          </button>
        </li>
        <li>
          <button
            className="btn"
            onClick={() => {
              fetchWeather(typeArray[3]);
              setCurrentValue(typeArray[3]);
              setSelectInt(3);
            }}>
            Interplanetary Shocks
          </button>
        </li>
      </ul>

      {loading ? (
        <div className="loader"></div>
      ) : searchFound ? (
        <div className="wrapper-results-weather">
          <SearchBar
            date={date}
            setDate={setDate}
            fetchWeather={fetchWeather}
            setDateTitle={setDateTitle}
            currentValue={currentValue}
          />
          {resultWeather(results)}
        </div>
      ) : (
        <div>
          <SearchBar
            date={date}
            setDate={setDate}
            fetchWeather={fetchWeather}
            setDateTitle={setDateTitle}
            currentValue={currentValue}
          />
          <h1 className="title">{title[selectInt]}</h1>
          <h4 className="text-no-result">
            {" "}
            No results found for{" "}
            {date === "yyyy-MM-dd" ? "the last 30 days." : "the selected date."}
          </h4>
        </div>
      )}
    </div>
  );
};

export default SpaceWeather;
