import { useRef } from "react";
import { AiOutlineCloudUpload, AiOutlineArrowLeft } from "react-icons/ai";
import crag from "../../api/crags";
import "./AddRouteForm.scss";

function AddRouteForm({ close, windowState, currentCrag, currentSector }) {
  const routeName = useRef();
  const routeGrade = useRef();
  const routeInformation = useRef();

  const submitHandle = async (e) => {
    e.preventDefault();
    const routeData = {
      routeName: routeName.current.value,
      routeGrade: routeGrade.current.value,
      routeInformation: routeInformation.current.value,
      currentCrag: currentCrag._id,
      currentSector: currentSector._id,
    };
    try {
      const res = await crag.setRoute(routeData);
    } catch (error) {
      console.log(error);
    }
    console.log(routeData);
  };

  return (
    <div
      className={`modal--add-route-form container ${windowState ? "open" : ""}`}
    >
      <div className="add-route-form--title-text text-white">
        <span className="add-route-form--back-arrow" onClick={close}>
          <AiOutlineArrowLeft />
        </span>
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

        <textarea
          ref={routeInformation}
          id=""
          cols="30"
          rows="7"
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
