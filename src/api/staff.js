import api from "./axios";


export const createStaff = (staffData) => {
    return api.post("/users", staffData);
    
}

export const gettStaffById = (id) => {
    return api.get(`/users/${id}`);
}

export const updateStaff = (id, staffData) => {
    return api.put(`/users/${id}`, staffData);
}

export const deleteStaff = (id) => {
    return api.delete(`/users/${id}`);
}

export const getStaff = () => {
   return api.get("/users"); 
}