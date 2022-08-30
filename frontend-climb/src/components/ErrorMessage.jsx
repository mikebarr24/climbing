import React from "react";

function ErrorMessage(props) {
  if (props.errorMessage) {
    return <h2>{props.errorMessage}</h2>;
  }
}

export default ErrorMessage;
