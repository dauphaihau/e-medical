import apiRequest from "../request";

const api = apiRequest.init("eschool");
const schoolYearService = {
  list: async (params) => {
    try{
      const {request, ...response} = await api.get('/organization/schoolyear/', {params});
      return response.data;
    }
    catch(e){
      return false;
    }
  },
  detail: async (id) => {
    try{
      const {...response} = await api.get(`/organization/schoolyear/${id}`);
      return response.data;
    }
    catch(e){
      return false;
    }
  },
  create: async (data) => {
    return await api.post(
      "/organization/schoolyear", data
    );
  },
  delete: async (id) => {
    return await api.delete(
      `/organization/schoolyear/${id}`,
    );
  },
  update: async (id, dataUpdate) => {
    console.log(dataUpdate);
    return await api.patch(
      `/organization/schoolyear/${id}`, dataUpdate
    );
  },
}
export default schoolYearService;
