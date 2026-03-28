import api from "./axios";

/**
 * Get SLOs for a specific course
 * Source: Course_SLOs table
 */
export const getCourseSLOs = (courseId) => {
  return api.get(`/courses/${courseId}/slos`);
};
