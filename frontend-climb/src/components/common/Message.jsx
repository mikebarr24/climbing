import { useState, useEffect } from "react";

function Message({ message }) {
  const [out, setOut] = useState(message);
  useEffect(() => {
    setOut(message);
  }, [message]);
  const STYLES = {
    textAlign: "center",
    color: out.type === "error" ? "red" : "green",
  };
  return <h2 style={STYLES}>{out.message}</h2>;
}

export default Message;
