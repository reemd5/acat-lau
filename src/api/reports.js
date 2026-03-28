import api from "./axios";

export const getReports = () => {
  return api.get("/reports");
};

export const createReport = (data) => {
  return api.post("/reports", data);
};
