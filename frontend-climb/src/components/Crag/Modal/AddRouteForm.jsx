import { useRef, useState } from "react";
import "./AddRouteForm.scss";
import crag from "../../../api/crags";
import BackArrow from "../../common/BackArrow";
import FileUpload from "../../common/FileUpload";
import Message from "../../common/Message";

function AddRouteForm({
  close,
  windowState,
  currentCrag,
  currentSector,
  setSector,
}) {
  const routeName = useRef();
  const routeGrade = useRef();
  const routeDescription = useRef();
  const routeRating = useRef();
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(null);

  const submitHandle = async (e) => {
    e.preventDefault();
    setMessage({ message: "Uploading" });
    const formData = new FormData();
    formData.append("file", image);
    formData.append("routeName", routeName.current.value);
    formData.append("routeGrade", routeGrade.current.value);
    formData.append("routeDescription", routeDescription.current.value);
    formData.append("routeRating", routeRating.current.value);
    formData.append("currentCrag", currentCrag);
    formData.append("currentSector", currentSector);
    try {
      const { data } = await crag.setRoute(formData);
      setSector(data);
      close();
    } catch (error) {
      setMessage({ message: error.response.data, type: "error" });
    }
  };

  return (
    <div
      className={`modal--add-route-form container ${windowState ? "open" : ""}`}
    >
      <BackArrow className="add-route-form--back-arrow" onClick={close} />
      <div className="add-route-form--title-text text-white">
        <h2 className="add-route-form--title text-white">Add Route</h2>
      </div>
      <form className="form-standard modal--form" onSubmit={submitHandle}>
        <input
          type="text"
          ref={routeName}
          className="form-field"
          placeholder="Route Name"
        />
        <select className="form-field" ref={routeGrade}>
          <option>Select Grade</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <select className="form-field" ref={routeRating}>
          <option>Select Rating</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <textarea
          ref={routeDescription}
          id=""
          cols="30"
          rows="5"
          className="form-text"
          placeholder="Route Information"
        ></textarea>
        <FileUpload setImage={setImage} image={image} />
        <input
          type="submit"
          className="modal--add-route-button form-button"
          value="Add Route"
        />
      </form>
      {message && <Message message={message} />}
    </div>
  );
}

export default AddRouteForm;
