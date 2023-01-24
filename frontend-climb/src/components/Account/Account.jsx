import { VscAccount } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import "./Account.scss";
import AccountModal from "./AccountModal";
import auth from "../../api/auth";
const profileImage = require("../../media/images/profile-temp-small.jpg");

function Account() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const local = async () => {
      const { data } = await auth.getUserServer();
      setUser(data);
    };
    local();
  }, []);
  return (
    <>
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
        <Button className="account--edit-btn" onClick={() => setOpen(!open)}>
          Edit Profile
        </Button>
      </div>
      <AccountModal open={open} close={() => setOpen(false)} user={user} />
    </>
  );
}

export default Account;
