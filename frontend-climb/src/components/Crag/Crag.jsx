import "./Crag.scss";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import crags from "../../api/crags";
import Button from "../Button/Button";

function Crag() {
  const params = useParams();
  const navigate = useNavigate();
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
      <Button name="Back to Map" onClick={() => navigate("/crags")} />
      {crag && (
        <div className="crag-wrapper">
          <h2 className="title-text">
            {crag.cragName.charAt(0).toUpperCase() + crag.cragName.slice(1)}
          </h2>
        </div>
      )}
      <h2 className="title-text"></h2>
      {error && <ErrorMessage errorMessage={error} />}
    </div>
  );
}

export default Crag;
