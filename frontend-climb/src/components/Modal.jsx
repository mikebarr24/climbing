import { useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";
import Button from "./Button/Button";
import { AiOutlineCloudUpload } from "react-icons/ai";

function Modal({ open, sector, close }) {
  const initForm = {
    routeName: "",
    routeGrade: "",
    routeInformation: "",
  };
  const [openAdd, setOpenAdd] = useState(false);
  const [form, setForm] = useState(initForm);

  const OVERLAY = {
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  };

  const changeHandle = (e) => {
    setForm((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY} />
      <div className="crag-modal standard-text">
        <button onClick={close} className="close-button">
          X
        </button>
        <h2>Sector - {sector.sectorName}</h2>
        <div className="sector-photo">Photo of Sector here</div>
        <h3>Sector Info</h3>
        <p>{sector.information}</p>
        <div className="crag--route-header">
          <h3>Routes</h3>
          <Button
            name={openAdd === false ? "Add Route" : "Close Form"}
            onClick={() => setOpenAdd(!openAdd)}
          />
        </div>
        {openAdd && (
          <div className="modal--add-route-form">
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
        )}
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
