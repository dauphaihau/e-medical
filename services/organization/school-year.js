import apiRequest from "../request";

const api = apiRequest.init("eschool");
const schoolYearService = {
  getAllSchoolYear: async (idSchoolYear='') => {
    const {request, ...response} = await api.get(
      `organization/schoolyear/${idSchoolYear}`,
    );
  },
  createSchoolYear: async (dataSchoolYear) => {
    console.log(dataSchoolYear);
    return await api.post(
      "organization/schoolyear", dataSchoolYear
    );
  },
  deleteSchool: async (idSchoolYear) => {
    return await api.delete(
      `organization/schoolyear/${idSchoolYear}`,
    );
  },
  updateSchoolYear: async (idSchoolYear, dataUpdateSchoolYear) => {
    console.log(dataUpdateSchoolYear);
    return await api.patch(
      `organization/schoolyear/${idSchoolYear}`, dataUpdateSchoolYear
    );
  },
}
export default schoolYearService;
