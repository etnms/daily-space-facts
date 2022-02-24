import { useEffect} from "react";

const SearchBar = (props) => {
  const { date, setDate, setDateTitle, currentValue, fetchWeather } = props;

  useEffect(() => {
    document.querySelector('input[name="datesearch"]').value = date;
  }, [date]);

  const handleEvent = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDateTitle(`on ${date}`);
    fetchWeather(currentValue);
  };

  return (
    <form className="search-bar" onSubmit={(e) => handleSubmit(e)}>
      <h3>Looking for a specific date?</h3>
      <input type="date" name="datesearch" onChange={(e) => handleEvent(e)} />
      <input type="submit" value="Search" className="btn btn-submit" />
    </form>
  );
};

export default SearchBar;
