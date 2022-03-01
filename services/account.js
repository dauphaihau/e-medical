import apiRequest from './request';

const api = apiRequest.init("eschool");
const accountService = {
  requestPhonePin: async (phoneNumber) => {
    const { request, ...response } = await api.get(
      "/account/requestPhonePin",
      { params: { phoneNumber } }
    );
  },
  loginViaOTP: async (phoneNumber, pin) => {
    console.log(phoneNumber, pin);
    return await api.post(
      "/account/login/phonePin",
      {
        phoneNumber,
        pin,
      }
    );
  }
}
export default accountService;
