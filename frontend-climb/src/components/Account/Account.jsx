import { useState, useEffect } from "react";

import "./Account.scss";
import Auth from "../../api/Auth";

function Account() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(Auth.getCurrentUser());
  }, []);

  console.log(user);
  return (
    <div id="account" className="container">
      <h1>Account</h1>
      <h2>Hello {user.name.charAt(0).toUpperCase() + user.name.slice(1)}</h2>
    </div>
  );
}

export default Account;
