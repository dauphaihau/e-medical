import apiRequest from "../request";
import _ from "lodash";

const api = apiRequest.init("eschool");
export const classroomService = {
  listGroup: async (params) => {
    if (!params) return [];
    try {
      const {...response} = await api.get('/organization/classroom/', {params: {...params, type: 'group'}});
      return response.data;
    } catch (e) {
      return false
    }
  },
  createGroup: async (data) => {
    try {
      const {...response} = await api.post("/organization/classroom", data);
      return true;
    } catch (e) {
      return false;
    }
  },
  updateGroup: async (id, data) => {
    try {
      const {...response} = await api.patch(`/organization/classroom/${id}`, data);
      return true;
    } catch (e) {
      return false;
    }
  },
  detailGroup: async (id) => {
    try {
      const {...response} = await api.get("/organization/classroom/" + id);
      return response.data;
    } catch (e) {
      return false;
    }
  },
  deleteGroup: async (id) => {
    try {
      const {...response} = await api.delete(`/organization/classroom/${id}`);
      return true;
    } catch (e) {
      return false;
    }

  },
  list: async (params) => {
    try {
      const {...response} = await api.get('/organization/classroom/', {params: {...params}});
      return response.data;
    } catch (e) {
      return false
    }
  },
  create: async (data) => {
    try {
      const {...response} = await api.post("/organization/classroom", data);
      return true;
    } catch (e) {
      return false;
    }
  },
  delete: async (id) => {
    try {
      const {...response} = await api.delete(`/organization/classroom/${id}`);
      return true;
    } catch (e) {
      return false;
    }
  },
  update: async (id, data) => {
    try {
      const {...response} = await api.patch(`/organization/classroom/${id}`, data);
      return true;
    } catch (e) {
      return false;
    }
  },
  detail: async (id) => {
    try {
      const {...response} = await api.get("/organization/classroom/" + id);
      return response.data;
    } catch (e) {
      return false;
    }
  },
}
