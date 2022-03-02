import apiRequest from "../request";

const api = apiRequest.init("eschool");
const classService = {
  getAllClass: async () => {
    const {...response} = await api.get(
      `/organization/classroom/`,
    );
  },
  createClass: async (dataClass) => {
    return await api.post(
      "/organization/classroom", dataClass
    );
  },
  deleteClass: async (idClass) => {
    return await api.delete(
      `/organization/classroom/${idClass}`,
    );
  },
  updateClass: async (idClass, dataUpdateClass) => {
    console.log(dataUpdateClass);
    return await api.patch(
      `/organization/classroom/${idClass}`, dataUpdateClass
    );
  },
}
export default classService;
