import { useEffect, useState } from "react";

const Mars = () => {
  const [apiKey, setApiKey] = useState();
  const [begin, setBegin] = useState(true);
  const [rdn, setRdn] = useState(Math.floor(Math.random() * 856));
  const [image, setImage] = useState({
    url: "",
    cameraFullName: "",
    cameraName: "",
    datePicture: "",
    roverName: "",
    roverLaunchDate: "",
    roverLandingDate: "",
    status: "",
  });

  useEffect(() => {
    getKey();
    fetchUrl(rdn);
  }, [rdn, apiKey]);

  const getKey = async () => {
    const query = await fetch("/api");
    const res = await query.json();
    setApiKey(res.apiKey);
  };

  const fetchUrl = async () => {
    setImage({ url: "" });
    if (apiKey !== undefined) {
      const query = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`
      );
      const res = await query.json();
      setImage({
        url: res.photos[rdn].img_src,
        cameraFullName: res.photos[rdn].camera.full_name,
        cameraName: res.photos[rdn].camera.name,
        datePicture: res.photos[rdn].earth_date,
        roverName: res.photos[rdn].rover.name,
        roverLaunchDate: res.photos[rdn].rover.launch_date,
        roverLandingDate: res.photos[rdn].rover.landing_date,
        status: res.photos[rdn].rover.status,
      });
    }
  };

  const generateRdmImage = () => {
    setRdn(Math.floor(Math.random() * 856));
  };

  return begin ? (
    <div className="mars-rover-gallery-start">
      <h1 className="title">Start exploring pictures from Mars!</h1>
      <p id="mars-begin-info">
        Click on the start button to start displaying random images from Mars.
      </p>
      <button className="btn btn-next-img" onClick={() => setBegin(false)}>
        Start
      </button>
      <p id="mars-picture-info">
        (You might find that some pictures may be small, but that is their
        actual size!)
      </p>
    </div>
  ) : image.url ? (
    <div className="mars-rover-gallery">
      <img className="img-mars" src={image.url} alt="random from rover"></img>
      <div className="wrapper-text">
        <p>
          Image taken by {image.roverName} using the {image.cameraFullName}(
          {image.cameraName})
        </p>
        <p>Date: {image.datePicture}</p>
        <h2>Rover information</h2>
        <p>Name: {image.roverName}</p>
        <p>Launching date: {image.roverLaunchDate}</p>
        <p>Landing date: {image.roverLandingDate}</p>
        <p>Status: {image.status}</p>
        <button className="btn btn-next-img" onClick={() => generateRdmImage()}>
          Next
        </button>
      </div>
    </div>
  ) : (
    <div className="loader"></div>
  );
};

export default Mars;
