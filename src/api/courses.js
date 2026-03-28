import api from "./axios";

export const getCourses = () => {
    return api.get("/courses");
}

export const getCourseById = (id) => {
    return api.get(`/courses/${id}`);
}

export const deleteCourseById = (id) => {
    return api.delete(`/courses/${id}`);
}

export const updateCourseById = (id, data) => {
    return api.put(`/courses/${id}`, data);
}

export const addCourse = (data) => {
    return api.post(`/courses`, data);
}