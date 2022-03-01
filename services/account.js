import apiRequest from './request';

const api = apiRequest.init("anhquoc");
const accountService = {
  requestPhonePin: async (phoneNumber) => {
    const { request, ...response } = await api.get(
      "/account/requestPhonePin",
      { params: { phoneNumber } }
    );
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
export default accountService;