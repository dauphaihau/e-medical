import apiRequest from './request';

const api = apiRequest.init("anhquoc");
export const accountService = {
  requestPhonePin: async (phoneNumber) => {
    const {request, ...response} = await api.get(
      "/account/requestPhonePin",
      {params: {phoneNumber}}
    );
  },
  register: async (data) => {
    await api.post("/account/register", data);
  },
  loginViaOTP: async (phoneNumber, pin) => {
    return await api.post(
      "/account/login/phonePin",
      {
        phoneNumber,
        pin,
      }
    );
  },
  me: async () => {
    return await api.get("/account/me");
  }
}
