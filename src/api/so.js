import api from "./axios";

export const getSOs = () => {
  return api.get("/sos");
}

export const getPCs = () => {
  return api.get("/pcs");
}

export const getPCsBySO = (soId) => {
  return api.get(`/pcs?so_id=${soId}`);
}