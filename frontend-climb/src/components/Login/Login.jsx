import React from "react";
import auth from "../../api/auth";
import { Link } from "react-router-dom";
import "./Login.scss";

function Login() {
  const initForm = {
    email: "",
    password: "",
  };
  const [form, setForm] = React.useState(initForm);
  const [warning, setWarning] = React.useState(null);

  const handleChange = (event) => {
    setForm((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await auth.login(form);
      window.location = "/";
    } catch (error) {
      setWarning(error.response.data);
    }
  };
  return (
    <div id="login" className="container">
      <h2 className="title-text">Log in to your Account</h2>
      <form className="form-standard standard-text" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="form-field"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          required
        />
        <input
          type="password"
          name="password"
          className="form-field"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          required
        />
        <button className="form-button" value="Login">
          Login
        </button>
        <Link to="/newuser">
          <button className="form-button">Create New Accout</button>
        </Link>
        <a href="/" className="login-forgot-password">
          Forgot Password?
        </a>
      </form>
      {warning && <p className="standard-text form-error">{warning}</p>}
    </div>
  );
}

export default Login;
