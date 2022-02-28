import { useEffect, useState } from "react";

const SearchBar = (props) => {
  const { date, setDate, setDateTitle, currentValue, fetchWeather } = props;

  const [reset, setReset] = useState(false);
  useEffect(() => {
    document.querySelector('input[name="datesearch"]').value = date;

    if (reset === true) {
      fetchWeather(currentValue);
      setReset(false);
    }
  }, [date, reset]);

  const handleEvent = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDateTitle(`on ${date}`);
    fetchWeather(currentValue);
  };

  const submitDefault = () => {
    setDate("yyyy-MM-dd");
    setDateTitle("in the last 30 days");
    setReset(true);
  };

  return (
    <div className="search-bar-wrapper">
      <form className="search-bar" onSubmit={(e) => handleSubmit(e)}>
        <h3>Looking for a specific date?</h3>
        <input type="date" name="datesearch" onChange={(e) => handleEvent(e)} />
        <input type="submit" value="Search" className="btn btn-submit" />
      </form>
      <button className="btn btn-submit" onClick={() => submitDefault()}>
        Last 30 days
      </button>
    </div>
  );
};

export default SearchBar;
