import { useState } from "react";
import "./PasswordChange.scss";

function PasswordChange(props) {
  const initPassword = {
    originalPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };
  const [password, setPassword] = useState(initPassword);

  const changeHandle = (e) => {
    setPassword((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandle = (e) => {
    e.preventDefault();
    if (password.newPassword !== password.repeatNewPassword) {
      props.password("Passwords Don't Match");
    }
  };

  return (
    <div id="password" className="container">
      <form
        className="form-standard account--password-form"
        onSubmit={submitHandle}
      >
        <input
          name="originalPassword"
          onChange={changeHandle}
          type="password"
          className="form-field"
          placeholder="*Current Password"
          value={password.originalPassword}
          required
        />
        <input
          name="newPassword"
          onChange={changeHandle}
          value={password.newPassword}
          type="password"
          className="form-field"
          placeholder="*New Password"
          required
        />
        <input
          name="repeatNewPassword"
          value={password.repeatNewPassword}
          onChange={changeHandle}
          type="password"
          className="form-field"
          placeholder="*Renter New Password"
          required
        />
        <input type="submit" value="Change Password" className="form-button" />
      </form>
    </div>
  );
}

export default PasswordChange;
