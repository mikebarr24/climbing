import axios from "axios";

class ApiKeys {
  async mapsApi() {
    const api = await axios.get("http://localhost:8080/api/keys/maps");
    return api;
  }
}
export default new ApiKeys();
