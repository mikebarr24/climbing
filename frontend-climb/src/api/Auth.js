import axios from "axios";
import jwtDecode from "jwt-decode";

const tokenKey = "token";
class Auth {
  async register(user) {
    const res = await axios.post("http://localhost:8080/api/users", {
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: false,
    });
    return res;
  }
  async login(user) {
    const { data } = await axios.post("http://localhost:8080/api/auth/login", {
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
}

export default new Auth();