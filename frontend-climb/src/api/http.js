import axios from "axios";
import Auth from "./auth";

const baseUrl = "/api";

const setJwt = (jwt) => {
  axios.defaults.headers.common["x-auth-token"] = jwt;
};

const get = async (endpoint) => {
  return await axios.get(baseUrl + endpoint);
};

const post = async (endpoint, data) => {
  return await axios.post(baseUrl + endpoint, data);
};
const put = async (endpoint, data) => {
  return await axios.put(baseUrl + endpoint, data);
};

const exportObject = { get, post, put, setJwt };
export default exportObject;
