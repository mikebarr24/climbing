import React from "react";
import ApiKeys from "../../api/ApiKeys";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

function Map(props) {
  const [api, setApi] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await ApiKeys.mapsApi();
      setApi(data);
    };
    getData();
  }, []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <GoogleMap zoom={7} center={{ lat: 54, lng: -6 }}></GoogleMap>;
}

export default Map;
