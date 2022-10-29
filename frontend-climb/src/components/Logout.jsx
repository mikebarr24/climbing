import { useEffect } from "react";
import auth from "../api/auth";

function Logout() {
  useEffect(() => {
    auth.logout();
    window.location = "/";
  });
}

export default Logout;
