import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import swal from "sweetalert";

import Button from "@components/button";
import Input from "@components/form/input";
import Region from "@components/form/region";
import { schoolService, locationService } from "@services";
import {useAuth} from "../../../context/auth";

const validationSchema = Yup.object().shape({
  // schoolname: Yup.string()
  //   .min(5, 'Tên trường ít nhất là 5 ký tự')
  //   .max(50, 'Tên trường tối đa là 50 ký tự')
  //   .required('Tên người dùng không được để trống'),
  address: Yup.string().required('Địa chỉ không được để trống'),
  province: Yup.object().shape({
    value: Yup.string().required('Vui lòng chọn tỉnh/thành'),
  }),
  district: Yup.object().shape({
    value: Yup.string().required('Vui lòng chọn quận/huyện'),
  }),
  ward: Yup.object().shape({
    value: Yup.string().required('Vui lòng chọn phường/xã'),
  }),
});

const AddSchool = () => {
  const router = useRouter();
  const {user} = useAuth();
  const [listProvince, setListProvince] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady])

  const loadInit = async () => {
    const provinces = await locationService.listProvince();
    setListProvince(provinces);
  }

  const handleSubmitForm = async (data) => {
    let bodyData = {};
    if(data.province && !_.isEmpty(data.province)){
      bodyData.province = {code: data.province.code, provinceName: data.province.label}
    }
    if(data.district && !_.isEmpty(data.district)){
      bodyData.district = {code: data.district.code, districtName: data.district.label}
    }
    if(data.ward && !_.isEmpty(data.ward)){
      bodyData.ward = {code: data.ward.code, wardName: data.ward.label}
    }
    bodyData = {...data, ...bodyData};
    try {
      await schoolService.create(bodyData)
      swal({
        title: "Thêm trường thành công",
        icon: "success"
      })
      .then(() => Router.push('/to-chuc/truong'))
    } catch (error) {
      console.log({error})
    }
  }

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolname: user.role === 'admin' ? '' : user.schoolWorking?.schoolname,
        address: '',
        province: {},
        district: {},
        ward: {},
      }}
    >
      {({handleChange, values, errors, touched}) => (
        <Form className='form'>
          <h3>Thêm trường</h3>
          <Input
            label='Tên trường'
            name='schoolname'
            onChange={handleChange}
            disable={user?.role !== 'admin'}
            value={values.schoolname}
          />
          <Input
            label='Địa chỉ'
            name='address'
            onChange={handleChange}
            value={values.address}
            useFormik
          />
          <Field
            component={Region}
            listProvince={listProvince}
          />
          <Button type='submit' className='mr-4'>Thêm</Button>
        </Form>
      )}
    </Formik>
  )
}
export default AddSchool

