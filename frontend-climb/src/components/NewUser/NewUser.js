import React from "react";
import "./NewUser.scss";
import newUser from "../../api/newUser";

function NewUser() {
  const initialForm = {
    name: "",
    email: "",
    password: "",
    passwordVerify: "",
  };
  const initialWarnings = {
    passwordMatch: false,
    success: false,
  };

  const [form, setForm] = React.useState(initialForm);
  const [warnings, setWarnings] = React.useState(initialWarnings);

  const changeHandle = (event) => {
    setForm((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandle = (event) => {
    event.preventDefault();
    if (form.password !== form.passwordVerify) {
      setWarnings((state) => ({
        ...state,
        passwordMatch: true,
      }));
    }
    const res = newUser(form);
    setWarnings((state) => ({
      ...state,
      success: true,
    }));
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
      {warnings.passwordMatch && (
        <p className="standard-text warning-text green">
          Passwords don't Match
        </p>
      )}
      {warnings.success && (
        <p className="standard-text warning-text green">Account Created</p>
      )}
    </div>
  );
}

export default NewUser;
