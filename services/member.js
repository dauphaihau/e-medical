import apiRequest from './request';

const api = apiRequest.init("eschool");
export const memberService = {
  list: async (params) => {
    try {
      const {...response} = await api.get("/member", {params});
      return {...response.data, status: true};
    } 
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403 ? 'Bạn không đủ quyền thực hiện thao tác này' : 'Vui lòng thử lại!',
        statusCode: response.data.statusCode
      };
    }
  },
  detail: async (id) => {
    if (!id) return false;
    try {
      const response = await api.get("/member/" + id);
      return {
        status: true, 
        data: response.data
      };
    } 
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403 ? 'Bạn không đủ quyền thực hiện thao tác này' : 'Vui lòng thử lại!',
        statusCode: response.data.statusCode
      };
    }
  },
  create: async (data) => {
    try {
      await api.post("/member/", data);
      return {
        status:true,
        message: 'Thêm thành công',
      }
    }
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403? 'Bạn không đủ quyền thực hiện thao tác này' : 'Thêm không thành công!',
        statusCode: response.data.statusCode
      };
    }
  },
  update: async (id, data) => {
    try {
      await api.patch(`/member/${id}`, data);
      return {
        status: true, 
        message: 'Cập nhật thành công'
      };
    }
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403? 'Bạn không đủ quyền thực hiện thao tác này' : 'Cập nhật không thành công!',
        statusCode: response.data.statusCode
      };
    }
  },
  remove: async (id) => {
    if (!id) return false;
    try {
      await api.delete("/member/" + id);
      return {
        status: true, 
        message: 'Xóa thành công'
      };
    }
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403? 'Bạn không đủ quyền thực hiện thao tác này' : 'Xóa không thành công!',
        statusCode: response.data.statusCode
      };
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
      return {...response.data, status: true};
    } 
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403 ? 'Bạn không đủ quyền thực hiện thao tác này' : 'Vui lòng thử lại!',
        statusCode: response.data.statusCode
      };
    }
  },
  createStaff: async (data) => {
    try {
      await api.post("/member/", data);
      return {
        status:true,
        message: 'Thêm thành công',
      }
    }
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403? 'Bạn không đủ quyền thực hiện thao tác này' : 'Thêm không thành công!',
        statusCode: response.data.statusCode
      };
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
      await api.post("/member/", data);
      return {
        status:true,
        message: 'Thêm thành công',
      }
    }
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403? 'Bạn không đủ quyền thực hiện thao tác này' : 'Thêm không thành công!',
        statusCode: response.data.statusCode
      };
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
      return {...response.data, status: true};
    }
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403 ? 'Bạn không đủ quyền thực hiện thao tác này' : 'Vui lòng thử lại!',
        statusCode: response.data.statusCode
      };
    }
  },
  createParent: async (data) => {
    try {
      data = {
        ...data, ...{
          role: 'parent',
        }
      }
      await api.post("/member/", data);
      return {
        status:true,
        message: 'Thêm thành công',
      }
    }
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403? 'Bạn không đủ quyền thực hiện thao tác này' : 'Thêm không thành công!',
        statusCode: response.data.statusCode
      };
    }
  },
  updateParent: async (id, data) => {

    try {
      await api.patch(`/member/${id}`, data);
      return {
        status: true, 
        message: 'Cập nhật thành công'
      };
    }
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403? 'Bạn không đủ quyền thực hiện thao tác này' : 'Cập nhật không thành công!',
        statusCode: response.data.statusCode
      };
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
      return {...response.data, status: true};
    }
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403 ? 'Bạn không đủ quyền thực hiện thao tác này' : 'Vui lòng thử lại!',
        statusCode: response.data.statusCode
      };
    }
  },
  createStudent: async (data) => {
    try {
      data = {
        ...data, ...{
          role: 'student',
        }
      }
      await api.post("/member/", data);
      return {
        status:true,
        message: 'Thêm thành công',
      }
    }
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403? 'Bạn không đủ quyền thực hiện thao tác này' : 'Thêm không thành công!',
        statusCode: response.data.statusCode
      };
    }
  },
  updateStudent: async (id, data) => {
    try {
      await api.patch(`/member/${id}`, data);
      return {
        status: true, 
        message: 'Cập nhật thành công'
      };
    }
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403? 'Bạn không đủ quyền thực hiện thao tác này' : 'Cập nhật không thành công!',
        statusCode: response.data.statusCode
      };
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
      return {...response.data, status: true};
    }
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403 ? 'Bạn không đủ quyền thực hiện thao tác này' : 'Vui lòng thử lại!',
        statusCode: response.data.statusCode
      };
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
      return {
        status:true,
        message: 'Thêm thành công',
      }
    }
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403? 'Bạn không đủ quyền thực hiện thao tác này' : 'Thêm không thành công!',
        statusCode: response.data.statusCode
      };
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
