import { useEffect, useState } from "react";

const ImageDay = () => {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState({
    url: "",
    explanation: "",
    copyright: "",
    title: "",
  });

  useEffect(() => {
    pictureDay();
  }, []);

  const pictureDay = async () => {
    const query = await fetch("/api/pictureday");
    const res = await query.json();
    setImage({
      url: res.hdurl,
      copyright: res.copyright,
      explanation: res.explanation,
      title: res.title,
    });
    setLoading(false);
  };

  const copyrightParagraph = () => {
    if (image.copyright)
      return <p className="copyright-daily">Copyright: {image.copyright}</p>;
  };

  return (
    <div className="wrapper-picture-day">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <main className="picture-day">
          <img src={image.url} alt="daily-post"></img>
          <h1 className="title-img-day">{image.title}</h1>
          <p className="explanation-daily">{image.explanation}</p>
          {copyrightParagraph()}
        </main>
      )}
    </div>
  );
};

export default ImageDay;
