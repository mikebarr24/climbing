import React from "react";
import "./NewUser.scss";
import Auth from "../../api/Auth";

function NewUser() {
  const initialForm = {
    name: "",
    email: "",
    password: "",
    passwordVerify: "",
  };

  const [form, setForm] = React.useState(initialForm);
  const [warnings, setWarnings] = React.useState(null);

  const changeHandle = (event) => {
    setForm((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandle = async (event) => {
    event.preventDefault();
    if (form.password !== form.passwordVerify) {
      setWarnings("Passwords don't match. Please try again.");
      return;
    }
    try {
      const res = await Auth.register(form);
      Auth.logInWithJwt(res.headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      setWarnings(error.response.data);
    }
  };

  return (
    <div id="new-user" className="container">
      <h1 className="title-text">NewUser</h1>
      <form className="form-standard standard-text" onSubmit={submitHandle}>
        <input
          type="text"
          className="form-field"
          placeholder="Name"
          name="name"
          onChange={changeHandle}
          value={form.name}
        />
        <input
          type="email"
          className="form-field"
          placeholder="Email"
          name="email"
          onChange={changeHandle}
          value={form.email}
        />
        <input
          type="password"
          className="form-field"
          placeholder="Create Password"
          name="password"
          onChange={changeHandle}
          value={form.password}
        />
        <input
          type="password"
          className="form-field"
          placeholder="Verify Password"
          name="passwordVerify"
          onChange={changeHandle}
          value={form.passwordVerify}
        />
        <input type="submit" value="Create Account" className="form-button" />
      </form>
      {warnings && <p className="standard-text form-error">{warnings}</p>}
    </div>
  );
}

export default NewUser;
