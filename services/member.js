import apiRequest from './request';

const api = apiRequest.init("eschool");
export const memberService = {
  list: async (params) => {
    try{
      const { ...response } = await api.get("/member", {params});
      return response.data;
    }
    catch(e){
      return false
    }
  },
  detail: async (id) => {
    console.log(id);
    if( !id ) return false;
    try{
      const { ...response } = await api.get("/member/"+id);
      return response.data;
    }
    catch(e){
      return false;
    }
  },
  create: async (data) => {
    return await api.post("/member/", data);
  },
  update: async (id, data) => {
    return await api.patch(`/member/${id}`, data);
  },
  remove: async (id) => {
    if( !id ) return false;
    try{
      const { ...response } = await api.delete("/member/"+id);
      return response.data;
    }
    catch(e){
      return false;
    }
  }
}
