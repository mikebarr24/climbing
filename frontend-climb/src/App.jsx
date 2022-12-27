import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Crags from "./components/Crags/Crags";
import ApiKeys from "./api/ApiKeys";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import NewUser from "./components/NewUser/NewUser";
import auth from "./api/auth";
import Crag from "./components/Crag/Crag";
import Logout from "./components/Logout";
import AddMarker from "./components/AddMarker/AddMarker";
import Account from "./components/Account/Account";
import Contact from "./components/Contact/Contact";

function App() {
  const [user, setUser] = useState(null);
  const [mapApi, setMapApi] = useState(null);

  //Set Google Map Api
  useEffect(() => {
    const getApi = async () => {
      const { data } = await ApiKeys.mapsApi();
      setMapApi(data);
    };
    getApi();
  }, []);

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);
  if (!mapApi) return <h1>Loading</h1>;
  return (
    <div className="App">
      <Nav user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/crags"
          element={<Crags user={user} api={mapApi} />}
        ></Route>
        <Route
          path="/crags/:cragName"
          element={<Crag user={user} api={mapApi} />}
        />
        <Route path="/crags/add" element={<AddMarker />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/newuser" element={<NewUser />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account/:user" element={<Account user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
