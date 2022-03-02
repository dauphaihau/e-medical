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
  createSchool: async (dataSchool) => {
    return await api.post("/organization/school", dataSchool);
  },
  deleteSchool: async (id) => {
    return await api.delete(`/organization/school/${id}`);
  },
  updateSchool: async (id, dataUpdateSchool) => {
    return await api.patch(`/organization/school/${id}`, dataUpdateSchool);
  },
}
