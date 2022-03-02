import apiRequest from './request';

const api = apiRequest.init("eschool");
export const locationService = {
  listProvince: async () => {
    let result = [];
    const {...response} = await api.get("/gis/", { params: { filter: 'province' } });
    if(response.data && response.data.length){
      result = response.data.map((data) => ({
        value: data.name,
        label: data.name,
        code: data.code,
      }));
    }
    return result;
  },
  listDistrict: async (code) => {
    let result = [];
    if(!code) return result;
    const {...response} = await api.get("/gis/", { params: { filter: 'district', code } });
    if(response.data && response.data.length){
      result = response.data.map((data) => ({
        value: data.name,
        label: data.name,
        code: data.code,
      }));
    }
    return result;
  },
  listWard: async (code) => {
    let result = [];
    if(!code) return result;
    const {...response} = await api.get("/gis/", { params: { filter: 'ward', code } });
    if(response.data && response.data.length){
      result = response.data.map((data) => ({
        value: data.name,
        label: data.name,
        code: data.code,
      }));
    }
    return result;
  }
}
