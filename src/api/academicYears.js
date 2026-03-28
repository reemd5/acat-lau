import api from "./axios";

export const getAcademicYears = () => {
  return api.get("/academic-years");
};
