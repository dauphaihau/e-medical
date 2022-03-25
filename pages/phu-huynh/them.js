import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import swal from "sweetalert";
import Router, {useRouter} from "next/router";
import _ from "lodash";

import { memberService, locationService} from "@services";
import Button from "@components/button";
import Input from "@components/form/input";
import Region from "@components/form/region";
import Select from "@components/form/select";
import {useAuth} from "../../context/auth";

const phoneRegExp = /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/
const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(5, 'Tên trường ít nhất là 5 ký tự')
    .max(50, 'Tên trường tối đa là 50 ký tự')
    .required('Tên người dùng không được để trống'),
  phoneNumber: Yup.string()
    .required('Vui lòng nhập số điện thoại')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  address: Yup.string().required('Địa chỉ không được để trống'),
  province: Yup.object().shape({}),
  district: Yup.object().shape({}),
  ward: Yup.object().shape({}),
});

const AddParent = () => {
  const router = useRouter();
  const [listProvince, setListProvince] = useState();
  const {school} = useAuth();

  useEffect( () => {
    if (!router.isReady) return;
    loadInit();
    return () => {}
  }, [router.isReady]);

  const loadInit = async () => {
    const provinces = await locationService.listProvince();
    setListProvince(provinces);
  }

  const handleSubmitForm = async (data, {resetForm}) => {
    console.log('data', data)
    //format data
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
    const result = await memberService.createParent(bodyData);
    if(result){
      swal('Thêm thành công', '', 'success')
      .then(() => Router.push('/phu-huynh'));
    }
    else{
      swal('Thêm không thành công', '', 'error'); 
    }
  };

  return (
    <Formik
      className='my-4'
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolId: school?._id,
        fullName: '',
        address: '',
        phoneNumber: '',
        province: {},
        district: {},
        ward: {},
        role: 'parent',
      }}
    >
      {({
          handleChange,
          values,
          setFieldValue,
        }) => (
        <Form className='form py-8'>
          <h3>Thêm Phụ Huynh</h3>
          {/*<Select*/}
          {/*  label='Tên trường'*/}
          {/*  name='schoolId'*/}
          {/*  isDisable={true}*/}
          {/*  value={{value: school?._id, label: school?.schoolname}}*/}
          {/*  onChange={(e) => {*/}
          {/*    setFieldValue('schoolId', e.value);*/}
          {/*  }}*/}
          {/*/>*/}
          <Input
            label='Họ tên'
            name='fullName'
            onChange={handleChange}
            value={values.fullName}
            useFormik
          />
          <Input
            label='Phone'
            name='phoneNumber'
            onChange={handleChange}
            value={values.phoneNumber}
            useFormik
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
export default AddParent