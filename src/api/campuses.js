import api from "./axios";

export const getCampuses = () => {
  return api.get("/campuses");
};
