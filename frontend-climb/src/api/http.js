import axios from "axios";

const uri = "http://localhost:8080/api";

const get = async (endpoint) => {
  return await axios.get(uri + endpoint);
};

export default { get };
