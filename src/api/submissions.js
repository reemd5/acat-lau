import api from "./axios";

/**
 * Save or update a single field value (auto-save)
 */
export const saveValue = (submissionId, payload) => {
  return api.post(`/submissions/${submissionId}/values`, payload);
};

/**
 * Submit and lock the FCAR form
 */
export const submitForm = (submissionId) => {
  return api.post(`/submissions/${submissionId}/submit`);
};

/**
 * Load existing saved values for a submission
 */
export const getSubmissionValues = (submissionId) => {
  return api.get(`/submissions/${submissionId}/values`);
};
