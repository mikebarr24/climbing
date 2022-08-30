import axios from "axios";

const baseUrl = "http://localhost:8080/api";

const get = async (endpoint) => {
  return await axios.get(baseUrl + endpoint);
};

const post = async (endpoint, data) => {
  return await axios.post(baseUrl + endpoint, data);
};

const exportObject = { get, post };
export default exportObject;
