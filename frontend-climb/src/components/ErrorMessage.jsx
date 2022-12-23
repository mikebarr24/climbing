import React from "react";

function ErrorMessage({ errorMessage }) {
  const STYLES = {
    color: "red",
    textAlign: "center",
  };
  return <h2 style={STYLES}>{errorMessage}</h2>;
}

export default ErrorMessage;
