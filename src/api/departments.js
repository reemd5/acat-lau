import api from "./axios";

export const getDepartments = () => {
  return api.get("/departments");
};
