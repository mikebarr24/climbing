import { Routes, Route } from "react-router-dom";
import Crags from "./components/Crags/Crags";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
import NewUser from "./components/NewUser/NewUser";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crags" element={<Crags />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newuser" element={<NewUser />} />
      </Routes>
    </div>
  );
}

export default App;
