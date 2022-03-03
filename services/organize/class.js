import apiRequest from "../request";

const api = apiRequest.init("eschool");
export const classService = {
  list: async (params) => {
    try{
      const {...response} = await api.get('/organization/classroom/', {params});
      return response.data;
    }
    catch(e){
      return false
    }
  },
  create: async (data) => {
    return await api.post(
      "/organization/classroom", data
    );
  },
  delete: async (id) => {
    return await api.delete(
      `/organization/classroom/${id}`,
    );
  },
  update: async (id, dataUpdate) => {
    console.log(dataUpdate);
    return await api.patch(
      `/organization/classroom/${id}`, dataUpdate
    );
  },
}
