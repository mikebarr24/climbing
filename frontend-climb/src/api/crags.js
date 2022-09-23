import http from "./http";

const getAllCrags = async () => {
  const res = await http.get("/crags/all");
  return res;
};

const getCrag = async (path) => {
  const res = await http.get("/crags/" + path);
  return res;
};

const setCrag = async (cragInfo) => {
  const res = await http.post("/crags/addcrag", cragInfo);
  return res;
};
const setSector = async (sectorInfo) => {
  const res = await http.post("/crags/addsector", sectorInfo);
  return res;
};

const exportObject = { getAllCrags, getCrag, setCrag, setSector };

export default exportObject;
