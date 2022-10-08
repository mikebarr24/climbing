import { VscAccount } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import Button from "../Button/Button";
import "./Account.scss";
const profileImage = require("../../media/images/profile-temp-small.jpg");

function Account({ user }) {
  return (
    <div id="account" className="container">
      <div className="background"></div>
      <h2 className="account--name-heading">{user && user.name}</h2>
      <div className="account--info-wrapper standard-text">
        <img
          src={profileImage}
          className="account--image"
          alt="default profile"
        />
        <div className="account--info-box">
          <VscAccount />
          {user && user.name}
        </div>
        <div className="account--info-box">
          <AiOutlineMail />
          {user && user.email}
        </div>
        <div className="account--info-box">
          <RiLockPasswordLine />
          Password
        </div>
      </div>
      <Button name="Edit Profile" />
    </div>
  );
}

export default Account;
