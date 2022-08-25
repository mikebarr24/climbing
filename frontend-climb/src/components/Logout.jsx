import { useEffect } from "react";
import Auth from "../api/Auth";

function Logout() {
  useEffect(() => {
    Auth.logout();
    window.location = "/";
  });
}

export default Logout;
