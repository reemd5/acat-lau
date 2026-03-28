import api from "./axios";

export const getCoordinatorDashboardStats = (semester) => {
  return api.get("/coordinator-dashboard-stats", {
    params: semester ? { semester } : {},
  });
};

export const getCoordinatorImprovements = () => {
  return api.get("/coordinator-improvements");
};

export const getCoordinatorComparison = () => {
  return api.get("/coordinator-comparison");
};
