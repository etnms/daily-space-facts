const Home = () => {
  return (
    <div className="homepage">
      <h1 className="title">Daily Space Facts</h1>
      <p className="homepage-p">
        Daily Space Facts is a web application that gives access you space-related
        information and pictures.
      </p>
      <p className="homepage-p">
        You can start by navigating to the daily picture tab: each day a new
        picture is provided, as well as a description.
      </p>
      <p className="homepage-p">The information you can find on this website comes directly from NASA.</p>
      <img
        className="nasa-logo"
        alt="nasa-logo"
        src="https://www.nasa.gov/sites/all/themes/custom/nasatwo/images/nasa-logo.svg"></img>
    </div>
  );
};

export default Home;
