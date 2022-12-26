import { useRef } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./AddRouteForm.scss";
import crag from "../../../api/crags";
import BackArrow from "../../common/BackArrow";

function AddRouteForm({
  close,
  windowState,
  currentCrag,
  currentSector,
  addRouteClick,
}) {
  const routeName = useRef();
  const routeGrade = useRef();
  const routeDescription = useRef();
  const routeRating = useRef();

  const submitHandle = async (e) => {
    e.preventDefault();
    const routeData = {
      routeName: routeName.current.value,
      routeGrade: routeGrade.current.value,
      routeDescription: routeDescription.current.value,
      routeRating: routeRating.current.value,
      currentCrag: currentCrag._id,
      currentSector: currentSector._id,
    };
    try {
      await crag.setRoute(routeData);
      addRouteClick();
      close();
    } catch (error) {
      console.log(error);
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
        <input
          type="text"
          ref={routeGrade}
          className="form-field"
          placeholder="Route Grade"
        />
        <input
          type="text"
          ref={routeRating}
          className="form-field"
          placeholder="Route Rating"
        />

        <textarea
          ref={routeDescription}
          id=""
          cols="30"
          rows="5"
          className="form-text"
          placeholder="Route Information"
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
