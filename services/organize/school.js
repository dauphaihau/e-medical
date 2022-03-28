import apiRequest from '../request';

const api = apiRequest.init("eschool");
export const schoolService = {
  list: async (params) => {
    try {
      const {request, ...response} = await api.get('/organization/school/', {params: {...params}});
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
      const {...response} = await api.get(`/organization/school/${id}`);
      return {data: response.data, status: true};
    } catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403 ? 'Bạn không đủ quyền thực hiện thao tác này' : 'Vui lòng thử lại!',
        statusCode: response.data.statusCode
      };
    }
  },
  create: async (dataSchool) => {
    try {
      await api.post("/organization/school", dataSchool);
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
  delete: async (id) => {
    try {
      await api.delete(`/organization/school/${id}`);
      return {status: true, message: 'Xóa thành công',};
    } catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403? 'Bạn không đủ quyền thực hiện thao tác này' : 'Xóa không thành công!',
        statusCode: response.data.statusCode
      };
    }
  },
  update: async (id, dataUpdateSchool) => {
    try {
      await api.patch(`/organization/school/${id}`, dataUpdateSchool);
      return {status: true, message: 'Cập nhật thành công',};
    } catch ({response}) {
      return {
        status: false,
        message: response.data.statusCode === 403? 'Bạn không đủ quyền thực hiện thao tác này' : 'Cập nhật không thành công!',
        statusCode: response.data.statusCode
      };
    }
  },
}
