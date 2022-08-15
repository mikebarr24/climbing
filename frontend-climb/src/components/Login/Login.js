import React from "react";
import { Link } from "react-router-dom";
import "./Login.scss";

function Login() {
  const initForm = {
    email: "",
    password: "",
  };
  const [form, setForm] = React.useState(initForm);

  const handleChange = (event) => {
    setForm((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
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
    </div>
  );
}

export default Login;
