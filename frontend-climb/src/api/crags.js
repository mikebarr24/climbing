import http from "./http";

const getCrags = async () => {
  const res = await http.get("/crags");
  return res;
};

export { getCrags };
