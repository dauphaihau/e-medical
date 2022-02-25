import Input from "../components/form/input";
import Button from "../components/button";
import {useFormik} from "formik";
import * as Yup from "yup";

const phoneRegExp = /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/

const Login = () => {

  const formik = useFormik({
    initialValues: {
      soDienThoai: '',
      otp: '',
    },
    validationSchema: Yup.object({
      soDienThoai: Yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ').
      required('Số điện thoại không được để trống'),
      otp: Yup.number().typeError('OTP không được chứa chữ').
      required('OTP không được để trống').
      integer("OTP không được chứa số thập phân")
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  })

  return (
    <div className='form-login'>
      <form onSubmit={formik.handleSubmit}>
        <Input
          label='Số điện thoại'
          name='soDienThoai'
          error={formik.errors.soDienThoai && formik.touched.soDienThoai ? formik.errors.soDienThoai : null}
          onChange={formik.handleChange}
        />
        <Input
          label='OTP' name='otp'
          error={formik.errors.otp && formik.touched.otp ? formik.errors.otp : null}
          onChange={formik.handleChange}
        />
        <Button type='submit'>Đăng nhập</Button>
      </form>
    </div>
  )
}
export default Login