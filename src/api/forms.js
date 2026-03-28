
import api from "./axios";

export const getTotalForms = () => {
    return api.get("/total-forms");
}
export const getDetails =  (current_semester) => {
    return api.get("/forms", {
        params: { semester: current_semester }
    });
}

