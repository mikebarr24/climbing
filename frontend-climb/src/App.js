import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Crags from "./components/Crags/Crags";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import NewUser from "./components/NewUser/NewUser";
import Auth from "./api/Auth";
import Crag from "./components/Crag/Crag";
import Logout from "./components/Logout";
import AddMarker from "./components/AddMarker/AddMarker";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(Auth.getCurrentUser());
  }, []);

  return (
    <div className="App">
      <Nav user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crags" element={<Crags />} />
        <Route path="/crags/addsector" element={<AddMarker />} />
        <Route path="/addcrag" element={<AddMarker />} />
        <Route path="/crags/:cragName" element={<Crag />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/newuser" element={<NewUser />} />
      </Routes>
    </div>
  );
}

export default App;
