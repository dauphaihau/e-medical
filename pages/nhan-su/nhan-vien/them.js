import {Formik, Form} from "formik";
import * as Yup from "yup";

import Button from "@components/button";
import Input from "@components/form/input";
import Layout from "@components/layout";
import {accountService} from "@services";

const phoneRegExp = /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/
const pinRegExp = /^\d{4}$/

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Tên người dùng không được để trống'),
  password: Yup.string().required('Mật khẩu không được để trống'),
  email: Yup.string().required('Email không được để trống'),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
    .required('Số điện thoại không được để trống'),
  pin: Yup.string()
    .matches(pinRegExp, "Vui lòng nhập 4 số mã PIN")
    .required('Pin không được để trống')
});

const AddStaff = () => {

  const handleSubmitForm = async (data) => {
    console.log(data);
    try {
      await accountService.register(data)
      alert('Tạo nhân viên thành công')
    } catch ({response}) {
      console.log(response);
    }
  };

  return (
    <Formik
      validationSchema={loginSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        username: '',
        password: '',
        pin: '',
        status: 1,
        phoneNumber: '',
        email: '',
        source: '',
        medium: '',
        campaign: '',
        content: ''
      }}
    >
      {({
          handleChange,
        }) => (
        <Form className='form' >
          <h3>Tạo nhân viên</h3>
          <div className='grid lg:grid-cols-2 gap-4 lg:w-1/2'>
            <Input
              label='Tên nhân viên' name='username'
              useFormik='true'
              onChange={handleChange}
            />
            <Input
              label='Mật khẩu' name='password'
              useFormik='true'
              onChange={handleChange}
            />
            <Input
              label='Mã Pin' name='pin'
              useFormik='true'
              onChange={handleChange}
            />
            <Input
              label='Số điện thoại' name='phoneNumber'
              useFormik='true'
              onChange={handleChange}
            />
            <Input
              label='Email' name='email'
              useFormik='true'
              onChange={handleChange}
            />
            <Input
              label='Nguồn' name='source'
              useFormik='true'
              onChange={handleChange}
            />
            <Input
              label='Hoàn cảnh' name='medium'
              useFormik='true'
              onChange={handleChange}
            />
            <Input
              label='Chiến dịch' name='campaign'
              useFormik='true'
              onChange={handleChange}
            />
            <Input
              label='Nội dung' name='content'
              useFormik='true'
              onChange={handleChange}
            />
          </div>
          <Button type='submit'>Tạo</Button>
        </Form>
      )}
    </Formik>
  )
}
export default AddStaff

AddStaff.getLayout = (page) => <Layout>{page}</Layout>;

