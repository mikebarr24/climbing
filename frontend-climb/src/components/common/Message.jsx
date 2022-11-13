import React from "react";

function Message({ message }) {
  console.log(message);
  const STYLES = {
    textAlign: "center",
    color: "green",
  };
  return <h2 style={STYLES}>{message}</h2>;
}

export default Message;
