import jwtDecode from "jwt-decode";
import http from "./http";

const tokenKey = "token";
const register = async (user) => {
  const res = await http.post("/users", {
    name: user.name,
    email: user.email,
    password: user.password,
    isAdmin: false,
  });
  return res;
};
const login = async (user) => {
  const { data } = await http.post("/auth/login", {
    email: user.email,
    password: user.password,
  });
  localStorage.setItem(tokenKey, data);
};
const logInWithJwt = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
};
const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return console.log(error);
  }
};
const logout = () => {
  localStorage.removeItem(tokenKey);
};

const getJwtKey = () => {
  return localStorage.getItem(tokenKey);
};

const getUserServer = async () => {
  const res = await http.get("/users/me");
  return res;
};
const updateUser = async (user) => {
  const { data } = await http.put("/users/update", user);
  return data;
};
const checkPassword = async (password) => {
  const passwordJson = {
    user: this.getCurrentUser()._id,
    password: password,
  };
  const { data } = await http.put("/auth/password", passwordJson);
  return data;
};

const updatePassword = async (input) => {
  const { data } = await http.put("/users/password", input);
  return data;
};

http.setJwt(getJwtKey());

const exportFunction = {
  checkPassword,
  updateUser,
  updatePassword,
  getUserServer,
  logout,
  getCurrentUser,
  logInWithJwt,
  login,
  register,
};

export default exportFunction;
