import api from "./axios";

export const getAssignments = () => {
    return api.get("/assignments");
}

export const getAssignmentById = (id) => {
    return api.get(`/assignments/${id}`);
}

export const deleteAssignmentById = (id) => {
    return api.delete(`/assignments/${id}`);
}

export const updateAssignmentById = (id, data) => {
    return api.patch(`/assignments/${id}`, data);
}

export const addAssignment = (data) => {
    return api.post(`/assignments`, data);
}

export const getAssignmentsByCourseAndSO = (courseId, soId) => {
    return api.get(`/assignments?course_id=${courseId}&so_id=${soId}`);
}