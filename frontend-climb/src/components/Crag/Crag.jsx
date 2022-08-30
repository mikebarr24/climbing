import "./Crag.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import crags from "../../api/crags";

function Crag() {
  const params = useParams();
  const [crag, setCrag] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getCrag = async () => {
      try {
        const { data } = await crags.getCrag(params.cragName);
        setCrag(data);
      } catch (error) {
        setError(error.response.data);
      }
    };
    getCrag();
  }, [params.cragName]);
  return (
    <div id="crag" className="container">
      <button className="standard-button">Back to Map</button>
      <h2 className="title-text">{crag && crag.cragName}</h2>
      {error && <ErrorMessage errorMessage={error} />}
    </div>
  );
}

export default Crag;