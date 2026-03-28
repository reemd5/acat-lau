import api from "./axios";

export const getCurrentSettings = () => {
  return api.get("/settings");
};

export const saveCurrentSettings = (settings) => {
  return api.post("/settings", settings);
};

