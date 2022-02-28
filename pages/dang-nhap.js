import Input from "../components/form/input";
import Button from "../components/button";
import {Formik, Form} from "formik";
import Image from "next/image";
import Link from "next/link";
import * as Yup from "yup";
import logo2 from "../public/images/logo2.png";

const phoneRegExp = /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/
const pinRegExp = /^\d{4}$/

const loginSchema = Yup.object().shape({
  soDienThoai: Yup.string()
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
    .required('Số điện thoại không được để trống'),
  otp: Yup.string()
    .matches(pinRegExp, "Vui lòng nhập 4 số mã PIN")
    .required('OTP không được để trống')
});

const Login = () => {

  const handleSubmitForm = (values) => {
    console.log(values);
  };

  return (
    <div className='form-login'>
      <Formik
        validationSchema={loginSchema}
        onSubmit={handleSubmitForm}
        enableReinitialize
        initialValues={{
          soDienThoai: '',
          otp: '',
        }}
      >
        {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
          <Form onSubmit={handleSubmit}>
            <div className='flex justify-center'>
              <Link href="/">
                <a>
                  <Image src={logo2} alt="me" width="200" height="200" href='/'/>
                </a>
              </Link>
            </div>
            <div className='text-center my-8'>
              <h2 className='text-[2rem] text-primary pb-8'>Theo dõi bệnh nhân Covid-19</h2>
              <p>Vui lòng nhập số điện thoại để tiếp tục</p>
            </div>
            <Input
              label='Số điện thoại'
              name='soDienThoai'
              error={errors.soDienThoai && touched.soDienThoai ? errors.soDienThoai : null}
              onChange={handleChange}
            />
            <Input
              label='OTP' name='otp'
              error={errors.otp && touched.otp ? errors.otp : null}
              onChange={handleChange}
            />
            <Button type='submit'>Đăng nhập</Button>
            <div className="copyright text-center mt-8">
              <div>
                <strong className="d-block">
                  Ứng dụng được phát triển bởi{" "}
                </strong>
              </div>
              <div>
                <a href={"https://edoctor.io"}>eDoctor</a> © 2021
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
export default Login