import { useEffect, useRef, useState, FC } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";

function Map(props) {
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);
  return <Wrapper></Wrapper>;
}

export default Map;
