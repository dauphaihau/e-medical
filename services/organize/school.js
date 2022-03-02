import apiRequest from '../request';

const api = apiRequest.init("eschool");
const schoolService = {
  getAllSchool: async (idSchool = '') => {
    // const {request, ...response} = await api.get(
    const {request, ...response} = await api.get(
      `organization/school/${idSchool}`,
    );
  },
  createSchool: async (dataSchool) => {
    return await api.post(
      "organization/school", dataSchool
    );
  },
  deleteSchool: async (idSchool) => {
    return await api.delete(
      `organization/school/`,
    );
  },
  updateSchool: async (idSchool, dataUpdateSchool) => {
    console.log(dataUpdateSchool);
    return await api.patch(
      `organization/school/${idSchool}`, dataUpdateSchool
    );
  },
}
export default schoolService;
