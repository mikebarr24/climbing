import http from "./http";

const getAllCrags = async () => {
  const res = await http.get("/crags/all");
  return res;
};

const getCrag = async (id) => {
  const res = await http.get("/crags/" + id);
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
const setRoute = async (routeInfo) => {
  const res = await http.post("/crags/addroute", routeInfo);
  return res;
};
const archiveSector = async (cragId, sectorId) => {
  const res = await http.put("/crags/archiveSector", {
    cragId,
    sectorId,
  });
  return res;
};
const archiveCrag = async (cragId) => {
  const res = await http.put("/crags/archiveCrag", {
    cragId,
  });
  return res;
};

const exportObject = {
  getAllCrags,
  getCrag,
  setCrag,
  setSector,
  setRoute,
  archiveSector,
  archiveCrag,
};

export default exportObject;
