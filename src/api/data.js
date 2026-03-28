import api from "./axios";

export const getFormCompletionStats = () => 
    api.get("/instructors-form-completion-stats");