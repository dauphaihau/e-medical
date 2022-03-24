import apiRequest from "../request";

const api = apiRequest.init("eschool");
export const schoolYearService = {
  list: async (params) => {
    try {
      const response = await api.get('/organization/schoolyear/', {params: {...params}});
      return response.data;
    } catch (e) {
      return false;
    }
  },
  detail: async (id) => {
    try {
      const response = await api.get(`/organization/schoolyear/${id}`);
      return response.data;
    } catch (e) {
      return false;
    }
  },
  create: async (data) => {
    try {
      await api.post("/organization/schoolyear", data);
      return true;
    } catch (e) {
      return JSON.parse(e.request?.response)
    }
  },
  delete: async (id) => {
    return await api.delete(
      `/organization/schoolyear/${id}`,
    );
  },
  update: async (id, dataUpdate) => {
    try {
      await api.patch(`/organization/schoolyear/${id}`, dataUpdate);
      return true;
    } catch (e) {
      return false;
    }
  },
}
