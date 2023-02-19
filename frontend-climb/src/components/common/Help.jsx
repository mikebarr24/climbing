import { IoIosHelpCircle } from "react-icons/io";

function Help({ onClick, className }) {
  const STYLES = {
    fontSize: "5rem",
    display: "flex",
  };
  return (
    <div className={className} style={STYLES} onClick={onClick}>
      <IoIosHelpCircle />
    </div>
  );
}

export default Help;
