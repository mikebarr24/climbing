import { VscAccount } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import Button from "../Button/Button";
import "./Account.scss";
const profileImage = require("../../media/images/profile-temp-small.jpg");

function Account({ user }) {
  return (
    <div id="account" className="container">
      <div className="background"></div>
      <h2 className="account--name-heading">{user && user.name}</h2>
      <div className="account--info-wrapper standard-text">
        <div className="account--image-wrapper">
          <span className="account--pencil">
            <MdOutlineEdit />
          </span>
          <img
            src={profileImage}
            className="account--image"
            alt="default profile"
          />
        </div>
        <div className="account--info-box">
          <span className="account--icon">
            <VscAccount />
          </span>
          {user && user.name}
        </div>
        <div className="account--info-box">
          <span className="account--icon">
            <AiOutlineMail />
          </span>
          {user && user.email}
        </div>
        <div className="account--info-box">
          <span className="account--icon">
            <RiLockPasswordLine />
          </span>
          Password
        </div>
      </div>
      <Button name="Edit Profile" className="account--edit-btn" />
    </div>
  );
}

export default Account;
