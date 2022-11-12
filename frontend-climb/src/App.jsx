import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Crags from "./components/Crags/Crags";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import NewUser from "./components/NewUser/NewUser";
import auth from "./api/auth";
import Crag from "./components/Crag/Crag";
import Logout from "./components/Logout";
import AddMarker from "./components/AddMarker/AddMarker";
import Account from "./components/Account/Account";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  return (
    <div className="App">
      <Nav user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crags" element={<Crags user={user} />}></Route>
        <Route path="/crags/:cragName" element={<Crag user={user} />} />
        <Route path="/crags/addsector" element={<AddMarker />} />
        <Route path="/addcrag" element={<AddMarker />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/newuser" element={<NewUser />} />
        <Route path="/account/:user" element={<Account user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
