import apiRequest from "../request";

const api = apiRequest.init("eschool");
export const classroomService = {
  listGroup: async (params) => {
    try {
      const {...response} = await api.get('/organization/classroom/', {params: {...params, type: 'group'}});
      return {...response.data, status: true};
    } catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403 ? 'Bạn không đủ quyền thực hiện thao tác này' : 'Vui lòng thử lại!',
        statusCode: response.data.statusCode
      };
    }
  },
  createGroup: async (data) => {
    try {
      await api.post("/organization/classroom", data);
      return {
        status:true,
        message: 'Thêm thành công',
      }
    } catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403? 'Bạn không đủ quyền thực hiện thao tác này' : 'Thêm không thành công!',
        statusCode: response.data.statusCode
      };
    }
  },
  updateGroup: async (id, data) => {
    try {
      await api.patch(`/organization/classroom/${id}`, data);
      return {
        status:true,
        message: 'Cập nhật thành công',
      }
    } catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403? 'Bạn không đủ quyền thực hiện thao tác này' : 'Cập nhật không thành công!',
        statusCode: response.data.statusCode
      };
    }
  },
  detailGroup: async (id) => {
    try {
      const response = await api.get("/organization/classroom/" + id);
      return {
        status: true,
        data: response.data,
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
  deleteGroup: async (id) => {
    try {
      await api.delete(`/organization/classroom/${id}`);
      return {
        status:true,
        message: 'Xóa thành công',
      }
    } 
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403? 'Bạn không đủ quyền thực hiện thao tác này' : 'Xóa không thành công!',
        statusCode: response.data.statusCode
      };
    }
  },
  list: async (params) => {
    try {
      const response = await api.get('/organization/classroom/', {params: {...params}});
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
  create: async (data) => {
    try {
      await api.post("/organization/classroom", data);
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
  delete: async (id) => {
    try {
      await api.delete(`/organization/classroom/${id}`);
      return {
        status:true,
        message: 'Xóa thành công',
      }
    } 
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403? 'Bạn không đủ quyền thực hiện thao tác này' : 'Xóa không thành công!',
        statusCode: response.data.statusCode
      };
    }
  },
  update: async (id, data) => {
    try {
      await api.patch(`/organization/classroom/${id}`, data);
      return {
        status:true,
        message: 'Cập nhật thành công',
      }
    } 
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403? 'Bạn không đủ quyền thực hiện thao tác này' : 'Cập nhật không thành công!',
        statusCode: response.data.statusCode
      };
    }
  },
  detail: async (id) => {
    try {
      const response = await api.get("/organization/classroom/" + id);
      return {data: response.data, status: true};
    }
    catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403 ? 'Bạn không đủ quyền thực hiện thao tác này' : 'Vui lòng thử lại!',
        statusCode: response.data.statusCode
      };
    }
  },
}
