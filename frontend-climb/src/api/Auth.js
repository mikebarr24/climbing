import jwtDecode from "jwt-decode";
import http from "./http";

const tokenKey = "token";
class Auth {
  async register(user) {
    const res = await http.post("/users", {
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: false,
    });
    return res;
  }
  async login(user) {
    const { data } = await http.post("/auth/login", {
      email: user.email,
      password: user.password,
    });
    localStorage.setItem(tokenKey, data);
  }
  logInWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
  }
  getCurrentUser() {
    try {
      const jwt = localStorage.getItem(tokenKey);
      return jwtDecode(jwt);
    } catch (error) {
      return null;
    }
  }
  logout() {
    localStorage.removeItem(tokenKey);
  }

  getJwtKey() {
    return localStorage.getItem(tokenKey);
  }

  async getUserServer() {
    const res = await http.get("/users/me");
    return res;
  }
}

export default new Auth();
