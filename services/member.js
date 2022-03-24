import apiRequest from './request';

const api = apiRequest.init("eschool");
export const memberService = {
  list: async (params) => {
    try {
      const {...response} = await api.get("/member", {params});
      return response.data;
    } catch (e) {
      return false
    }
  },
  detail: async (id) => {
    if (!id) return false;
    try {
      const {...response} = await api.get("/member/" + id);
      return response.data;
    } catch (e) {
      return false;
    }
  },
  create: async (data) => {
    return await api.post("/member/", data);
  },
  update: async (id, data) => {
    return await api.patch(`/member/${id}`, data);
  },
  remove: async (id) => {
    if (!id) return false;
    try {
      await api.delete("/member/" + id);
      return true
    } catch (e) {
      return false;
    }
  },
  listStaff: async (params) => {
    try {
      params = {
        ...params, ...{
          type: 'staff'
        }
      };
      const response = await api.get("/member", {params});
      return response.data;
    } catch (e) {
      return false
    }
  },
  createStaff: async (data) => {
    try {
      const {...response} = await api.post("/member/", data);
      return true;
    } catch (e) {
      return false;
    }
  },
  //teacher
  createTeacher: async (data) => {
    try {
      data = {
        ...data, ...{
          role: 'teacher',
        }
      }
      const res = await api.post("/member/", data);
      return true;
    } catch (e) {
      return false;
    }
  },
  // parents
  listParent: async (params) => {
    try {
      params = {
        ...params, ...{
          type: 'parent'
        }
      };
      const response = await api.get("/member", {params});
      return response.data;
    } catch (e) {
      return false
    }
  },
  createParent: async (data) => {
    try {
      data = {
        ...data, ...{
          role: 'parent',
        }
      }
      const {...response} = await api.post("/member/", data);
      return true;
    } catch (e) {
      return false;
    }
  },
  updateParent: async (id, data) => {
    try {
      const {...response} = await api.patch(`/member/${id}`, data);
      return true;
    } catch (e) {
      return false;
    }
  },
  // students
  listStudent: async (params) => {
    try {
      params = {
        ...params, ...{
          type: 'student'
        }
      };
      const {...response} = await api.get("/member", {params});
      return response.data;
    } catch ({response}) {
      return false
    }
  },
  createStudent: async (data) => {
    try {
      data = {
        ...data, ...{
          role: 'student',
        }
      }
      const {...response} = await api.post("/member/", data);
      return true;
    } catch (e) {
      return false;
    }
  },
  updateStudent: async (id, data) => {
    try {
      const {...response} = await api.patch(`/member/${id}`, data);
      return true;
    } catch (e) {
      return false;
    }
  },
  // manager
  listManagers: async (params) => {
    try {
      params = {
        ...params, ...{
          type: 'manager'
        }
      };
      const {...response} = await api.get("/member", {params});
      return response.data;
    } catch (e) {
      return false
    }
  },
  createManager: async (data) => {
    try {
      data = {
        ...data, ...{
          role: 'manager',
        }
      }
      await api.post("/member/", data);
      return true;
    } catch (e) {
      return false;
    }
  },
  addVaccination: async (id, data) => {
    try {
      const {...response} = await api.post(`/member/${id}/vaccination`, data);
      return true;
    } catch (e) {
      return false;
    }
  },
  addHealthDeclaration: async (id, data) => {
    try {
      const {...response} = await api.post(`/member/${id}/health-declaration`, data);
      return true;
    } catch (e) {
      return false;
    }
  }
}
