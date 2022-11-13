import http from "./http";

const sendMessage = async (message) => {
  const res = await http.post("/contact", message);
  return res;
};

export default sendMessage;
