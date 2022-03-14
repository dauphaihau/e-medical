import apiRequest from './request';

const api = apiRequest.init("eschool");
export const medicalService = {
  list: async (params) => {
    try{
      console.log(params);
      const {...response} = await api.get("/medical-condition", {params});
      return response.data;
    }
    catch(e){
      return false;
    }
  },
  
  create: async (data) => {
    try{
      const {...response} = await api.post("/medical-condition", data);
      return true;
    }
    catch(e){
      return false;
    }
  },
  
}
