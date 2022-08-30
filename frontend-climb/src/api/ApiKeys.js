import http from "./http";

class ApiKeys {
  async mapsApi() {
    const api = await http.get("/keys/maps");
    return api;
  }
}
export default new ApiKeys();
