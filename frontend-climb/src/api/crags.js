import http from "./http";

const getAllCrags = async () => {
  const res = await http.get("/crags/all");
  return res;
};

const getCrag = async (id) => {
  const res = await http.get("/crags/" + id);
  return res;
};

const getRoutes = async (cragId, sectorId) => {
  const res = await http.put("/crags/crag/routes", {
    cragId,
    sectorId,
  });
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
const archiveSector = async (cragName, sectorName) => {
  const res = await http.put("/crags/archiveSector", {
    cragName,
    sectorName,
  });
  return res;
};
const archiveCrag = async (cragId) => {
  const res = await http.put("/crags/archiveCrag", {
    cragId,
  });
  return res;
};

const archiveRoute = async (routeName, sectorName, cragName) => {
  const res = await http.put("/crags/archiveRoute", {
    routeName,
    sectorName,
    cragName,
  });
  return res;
};

const removeNotification = async (notificationId, userId) => {
  const res = await http.post("/crags/removeNotification", {
    notificationId,
    userId,
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
  archiveRoute,
  removeNotification,
  getRoutes,
};

export default exportObject;
