import apiRequest from './request';

const api = apiRequest.init("eschool");
export const medicalService = {
  list: async (params) => {
    try{
      const {...response} = await api.get("/medical-condition", {params});
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
    try{
      await api.post("/medical-condition", data);
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
  
}
