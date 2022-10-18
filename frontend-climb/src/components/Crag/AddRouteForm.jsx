import { useState } from "react";
import { AiOutlineCloudUpload, AiOutlineArrowLeft } from "react-icons/ai";

import "./AddRouteForm.scss";

function AddRouteForm({ close }) {
  const initForm = {
    routeName: "",
    routeGrade: "",
    routeInformation: "",
  };
  const [form, setForm] = useState(initForm);

  const changeHandle = (e) => {
    setForm((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="modal--add-route-form container">
      <div className="add-route-form--title-text text-white">
        <span className="add-route-form--back-arrow" onClick={close}>
          <AiOutlineArrowLeft />
        </span>
        <h2 className="add-route-form--title text-white">Add Route</h2>
      </div>
      <form className="form-standard modal--form">
        <input
          name="routeName"
          type="text"
          className="form-field"
          placeholder="Route Name"
          onChange={changeHandle}
          value={form.routeName}
        />
        <input
          name="routeGrade"
          type="text"
          className="form-field"
          placeholder="Route Grade"
          onChange={changeHandle}
          value={form.routeGrade}
        />

        <textarea
          name="routeInformation"
          id=""
          cols="30"
          rows="7"
          className="form-text"
          onChange={changeHandle}
          placeholder="Route Information"
          value={form.routeInformation}
        ></textarea>
        <label className="custom-file-upload">
          <input type="file" className="form-file" />
          <span className="modal--upload-cloud">
            <AiOutlineCloudUpload />
          </span>
          Upload Photo
        </label>
        <input
          type="submit"
          className="modal--add-route-button form-button"
          value="Add Route"
        />
      </form>
    </div>
  );
}

export default AddRouteForm;
