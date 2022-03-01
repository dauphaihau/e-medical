import {Formik, Form} from "formik";
import * as Yup from "yup";

import Button from "../../../../components/button";
import Input from "../../../../components/form/input";
import Layout from "../../../../components/layout";
import {http} from "../../../../utils/setting";

const phoneRegExp = /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/
const pinRegExp = /^\d{4}$/

const loginSchema = Yup.object().shape({
  // username: Yup.string().required('Tên người dùng không được để trống'),
  // password: Yup.string().required('Mật khẩu không được để trống'),
  // email: Yup.string().required('Email không được để trống'),
  // source: Yup.string().required('Nguồn không được để trống'),
  // medium: Yup.string().required('Hoàn cảnh không được để trống'),
  // campaign: Yup.string().required('Chiến dịch không được để trống'),
  // content: Yup.string().required('Content không được để trống'),
  // phoneNumber: Yup.string()
  //   .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
  //   .required('Số điện thoại không được để trống'),
  // pin: Yup.string()
  //   .matches(pinRegExp, "Vui lòng nhập 4 số mã PIN")
  //   .required('Pin không được để trống')
});

const AddStaff = () => {

  const handleSubmitForm = async (values) => {
    console.log(values);
    try {
      const result = await http.post(`/v1/account/register`, values)
      console.log(result);
      alert('tao thanh cong')
    } catch (error) {
      console.log({error})
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
        status: "new",
        phoneNumber: '',
        email: '',
        source: '',
        medium: '',
        campaign: '',
        content: ''
      }}
    >
      {({
          handleSubmit,
          handleChange,
          touched,
          errors,
        }) => (
        <Form className='form' onSubmit={handleSubmit}>
          <h3>Tạo nhân viên</h3>
          <div className='grid lg:grid-cols-2 gap-4 lg:w-1/2'>
            <Input
              label='Tên nhân viên' name='username'
              error={errors.username && touched.username ? errors.username : null}
              onChange={handleChange}
            />
            <Input
              label='Mật khẩu' name='password'
              error={errors.password && touched.password ? errors.password : null}
              onChange={handleChange}
            />
            <Input
              label='Mã Pin' name='pin'
              error={errors.pin && touched.pin ? errors.pin : null}
              onChange={handleChange}
            />
            <Input
              label='Số điện thoại' name='phoneNumber'
              error={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : null}
              onChange={handleChange}
            />
            <Input
              label='Email' name='email'
              error={errors.email && touched.email ? errors.email : null}
              onChange={handleChange}
            />
            <Input
              label='Nguồn' name='source'
              error={errors.source && touched.source ? errors.source : null}
              onChange={handleChange}
            />
            <Input
              label='Hoàn cảnh' name='medium'
              error={errors.medium && touched.medium ? errors.medium : null}
              onChange={handleChange}
            />
            <Input
              label='Chiến dịch' name='campaign'
              error={errors.campaign && touched.campaign ? errors.campaign : null}
              onChange={handleChange}
            />
            <Input
              label='Nội dung' name='content'
              error={errors.content && touched.content ? errors.content : null}
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

