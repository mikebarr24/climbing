import axios from "axios";
import Auth from "./Auth";

const baseUrl = "http://localhost:8080/api";

axios.defaults.headers.common["x-auth-token"] = Auth.getJwtKey();

const get = async (endpoint) => {
  return await axios.get(baseUrl + endpoint);
};

const post = async (endpoint, data) => {
  return await axios.post(baseUrl + endpoint, data);
};
const put = async (endpoint, data) => {
  return await axios.put(baseUrl + endpoint, data);
};

const exportObject = { get, post, put };
export default exportObject;
