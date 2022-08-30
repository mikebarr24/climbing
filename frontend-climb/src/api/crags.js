import http from "./http";

const getAllCrags = async () => {
  const res = await http.get("/crags/all");
  return res;
};

const getCrag = async (path) => {
  const res = await http.get("/crags/" + path);
  return res;
};

const exportObject = { getAllCrags, getCrag };

export default exportObject;
