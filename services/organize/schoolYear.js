import apiRequest from "../request";

const api = apiRequest.init("eschool");
export const schoolYearService = {
  list: async (params) => {
    try {
      const response = await api.get('/organization/schoolyear/', {params: {...params}});
      return {...response.data, status: true};
    } catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403 ? 'Bạn không đủ quyền thực hiện thao tác này' : 'Vui lòng thử lại!',
        statusCode: response.data.statusCode
      };
    }
  },
  detail: async (id) => {
    try {
      const response = await api.get(`/organization/schoolyear/${id}`);
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
  create: async (data) => {
    try {
      await api.post("/organization/schoolyear", data);
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
    try{
      await api.delete(
        `/organization/schoolyear/${id}`,
      );
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
  update: async (id, dataUpdate) => {
    try {
      await api.patch(`/organization/schoolyear/${id}`, dataUpdate);
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
}
