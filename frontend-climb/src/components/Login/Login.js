import React from "react";
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
      <h2>Log in to your Account</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="login-field"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          required
        />
        <input
          type="password"
          name="password"
          className="login-field"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          required
        />
        <button className="login-submit" value="Login">
          Login
        </button>
        <a href="/" className="login-new">
          Create New Accout
        </a>
        <a href="/" className="login-forgot-password">
          Forgot Password?
        </a>
      </form>
    </div>
  );
}

export default Login;
