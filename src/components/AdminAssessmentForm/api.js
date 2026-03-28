import axios from "axios";

export const api = {
  getLatestForm: async (programId) => {
    const res = await axios.get(
      `/api/assessment-forms?program=${programId}`
    );
    return res.data;
  },

  getFormRows: async (formId) => {
    const res = await axios.get(
      `/api/assessment-forms/${formId}/rows`
    );
    return res.data;
  },

  updateFormRow: async (formId, rowId, payload) => {
    await axios.put(
      `/api/assessment-forms/${formId}/rows/${rowId}`,
      payload
    );
  },

  createFormRow: async (formId) => {
    const res = await axios.post(
      `/api/assessment-forms/${formId}/rows`
    );
    return res.data;
  },
};
