import apiRequest from '../request';

const api = apiRequest.init("eschool");
export const schoolService = {
  list: async (params) => {
    try{
      const {request, ...response} = await api.get('/organization/school/', {params});
      return response.data;
    }
    catch(e){
      return false;
    }
  },
  detail: async (id) => {
    try{
      const {...response} = await api.get(`/organization/school/${id}`);
      return response.data;
    }
    catch(e){
      return false;
    }
  },
  create: async (dataSchool) => {
    return await api.post("/organization/school", dataSchool);
  },
  delete: async (id) => {
    return await api.delete(`/organization/school/${id}`);
  },
  update: async (id, dataUpdateSchool) => {
    return await api.patch(`/organization/school/${id}`, dataUpdateSchool);
  },
}
