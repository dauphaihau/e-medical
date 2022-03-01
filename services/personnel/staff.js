import apiRequest from "../request";

const api = apiRequest.init("eschool");
const staffService = {
  getAllStaff: async (idStaff = '') => {
    const {request, ...response} = await api.get(
      `staff/${idStaff}`,
    );
  },
  createStaff: async (dataStaff) => {
    console.log(dataStaff);
    return await api.post(
      "account/register",
      {dataStaff}
    );
  },
  deleteStaff: async (idStaff) => {
    return await api.delete(
      `staff/${idStaff}`,
    );
  },
  updateStaff: async (idStaff, dataUpdateStaff) => {
    console.log(dataUpdateStaff);
    return await api.patch(
      `staff/${idStaff}`,
      {
        dataUpdateStaff
      }
    );
  },
}
export default staffService;
