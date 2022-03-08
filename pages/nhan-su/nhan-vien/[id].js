import {Formik, Form} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import swal from "sweetalert";

import Button from "../../../components/button";
import Input from "../../../components/form/input";
import Layout from "../../../components/layout";

const phoneRegExp = /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/
const pinRegExp = /^\d{4}$/

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Tên người dùng không được để trống'),
  password: Yup.string().required('Mật khẩu không được để trống'),
  email: Yup.string().required('Email không được để trống').email('Email không hợp lệ'),
  source: Yup.string().required('Nguồn không được để trống'),
  medium: Yup.string().required('Hoàn cảnh không được để trống'),
  campaign: Yup.string().required('Chiến dịch không được để trống'),
  content: Yup.string().required('Content không được để trống'),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
    .required('Số điện thoại không được để trống'),
  pin: Yup.string()
    .matches(pinRegExp, "Vui lòng nhập 4 số mã PIN")
    .required('Pin không được để trống')
});

const DetailStaff = () => {

  const router = useRouter();
  const [staff, setStaff] = useState([]);

  const getStaff = async (idStaff) => {
    try {
      const {request, ...response} = await staffService.getAllStaff(idStaff);
      setStaff(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    await getStaff(router.query.id);
  }, []);

  const handleSubmitForm = async (dataUpdateStaff) => {
    console.log(dataUpdateStaff);
    try {
      await staffService.updateStaff(router.query.id, dataUpdateStaff);
      await swal('Cap nhat thanh cong')
    } catch (error) {
      console.log({error});
    }
  };

  return (
    <Formik
      validationSchema={loginSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        username: staff.username,
        password: staff.password,
        pin: staff.pin,
        status: "new",
        phoneNumber: staff.phoneNumber,
        email: staff.email,
        source: staff.source,
        medium: staff.medium,
        campaign: staff.campaign,
        content: staff.content
      }}
    >
      {({
          handleSubmit,
          handleChange,
          values,
        }) => (
        <Form className='form' onSubmit={handleSubmit}>
          <h3>Thông tin nhân viên</h3>
          <div className='grid lg:grid-cols-2 gap-4 lg:w-1/2'>
            <Input
              label='Tên nhân viên'
              name='username'
              useFormik='true'
              onChange={handleChange}
              value={values.username}
            />
            <Input
              label='Mã Pin' name='pin'
              useFormik='true'
              onChange={handleChange}
              value={values.pin}
            />
            <Input
              label='Số điện thoại'
              name='phoneNumber'
              useFormik='true'
              onChange={handleChange}
              value={values.phoneNumber}
            />
            <Input
              label='Email' name='email'
              useFormik='true'
              onChange={handleChange}
              value={values.email}
            />
            <Input
              label='Nguồn' name='source'
              useFormik='true'
              onChange={handleChange}
              value={values.source}
            />
            <Input
              label='Hoàn cảnh' name='medium'
              useFormik='true'
              onChange={handleChange}
              value={values.medium}
            />
            <Input
              label='Chiến dịch' name='campaign'
              useFormik='true'
              onChange={handleChange}
              value={values.campaign}
            />
            <Input
              label='Nội dung' name='content'
              useFormik='true'
              onChange={handleChange}
              value={values.content}
            />
          </div>
          <Button type='submit'>Cập nhật</Button>
        </Form>
      )}
    </Formik>
  )
}
export default DetailStaff

DetailStaff.getLayout = (page) => <Layout>{page}</Layout>;
