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
  path: async () => {
    return await api.get("/account/me");
  }
}
