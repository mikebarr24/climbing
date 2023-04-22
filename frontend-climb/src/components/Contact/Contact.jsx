import { useRef, useState } from "react";
import "./Contact.scss";
import sendMessage from "../../api/email";
//import Message from "../common/Message";

function Contact() {
  const formName = useRef();
  const formEmail = useRef();
  const formMessage = useRef();
  //const [returnMessage, setReturnMessage] = useState(null);

  async function submitHandle(e) {
    e.preventDefault();
    const myMessage = {
      name: formName.current.value,
      email: formEmail.current.value,
      message: formMessage.current.value,
    };
    //setReturnMessage("Sending...");
    const { data } = await sendMessage(myMessage);

    //setReturnMessage(data.success);
  }

  return (
    <div id="contact" className="container standard-text">
      <h2>Contact</h2>
      <p>
        If you have any questions or requests, please don't hesitate to get in
        touch with me. Complete the following form below.
      </p>
      <form className="form-standard" onSubmit={submitHandle}>
        <input
          type="text"
          className="form-field"
          placeholder="Name"
          ref={formName}
        />
        <input
          type="text"
          className="form-field"
          placeholder="Email"
          ref={formEmail}
        />
        <textarea
          className="form-text"
          placeholder="Message"
          rows="5"
          ref={formMessage}
        />
        <input type="submit" className="form-button" />
      </form>
      {/* Needs Fixed */}
      {/* <Message message={returnMessage} /> */}
    </div>
  );
}

export default Contact;
