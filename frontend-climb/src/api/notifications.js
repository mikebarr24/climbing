import http from "./http";

const getNotifications = async () => {
  return await http.get(`/users/me`);
};

export default getNotifications;
