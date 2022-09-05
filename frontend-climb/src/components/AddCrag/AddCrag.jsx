import "./AddCrag.scss";

import React from "react";

function AddCrag() {
  const submitHandle = (e) => {
    e.preventDefault();
  };
  return (
    <div id="addcrag" className="container">
      <h2 className="title-text">Add new Crag</h2>
      <form onSubmit={submitHandle} className="form-standard standard-text">
        <input type="text" placeholder="Crag Name" className="form-field" />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Crag Information"
          className="form-text"
        ></textarea>
        <input type="text" placeholder="lat" readonly className="form-field" />
        <input type="text" placeholder="lng" readonly className="form-field" />
        <input type="submit" className="form-button" />
      </form>
    </div>
  );
}

export default AddCrag;
