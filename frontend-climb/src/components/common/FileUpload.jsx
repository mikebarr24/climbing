import { AiOutlineCloudUpload } from "react-icons/ai";
import "./FileUpload.scss";

function FileUpload({ setImage, image }) {
  const changeHandle = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <>
      <label className="custom-file-upload">
        <input type="file" className="form-file" onChange={changeHandle} />
        <span className="upload-cloud">
          <AiOutlineCloudUpload />
        </span>
        Upload Photo
      </label>
      {image && <p>{image.name}</p>}
    </>
  );
}

export default FileUpload;
