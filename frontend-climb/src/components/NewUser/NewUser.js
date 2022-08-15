import React from "react";
import "./NewUser.scss";

function NewUser() {
  const initialState = {
    name: "",
    email: "",
    password: "",
    passwordVerify: "",
  };
  const [form, setForm] = React.useState(initialState);

  const changeHandle = (event) => {
    setForm((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandle = (event) => {
    event.preventDefault();
    console.log(form);
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
          name="passwordVerfiy"
          onChange={changeHandle}
          value={form.passwordVerfiy}
        />
        <input type="submit" value="Create Account" className="form-button" />
      </form>
    </div>
  );
}

export default NewUser;
