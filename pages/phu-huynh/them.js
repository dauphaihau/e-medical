import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import swal from "sweetalert";
import Router, {useRouter} from "next/router";

import { memberService, locationService, schoolService, classroomService } from "@services";
import Button from "@components/button";
import Input from "@components/form/input";
import Region from "@components/form/region";
import Select from "@components/form/select";
import _ from "lodash";

const phoneRegExp = /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/
const validationSchema = Yup.object().shape({
  schoolId: Yup.string().required(),
  // classId: Yup.string().required(),
  fullName: Yup.string()
    .min(5, 'Tên trường ít nhất là 5 ký tự')
    .max(50, 'Tên trường tối đa là 50 ký tự')
    .required('Tên người dùng không được để trống'),
  phoneNumber: Yup.string()
    .required('Vui logn2 nhập số điện thoại')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  // address: Yup.string().required('Địa chỉ không được để trống'),
  province: Yup.object().shape({}),
  district: Yup.object().shape({}),
  ward: Yup.object().shape({}),
});

const AddParent = () => {
  const router = useRouter();
  const [listSchool, setListSchool] = useState();
  const [listProvince, setListProvince] = useState();

  useEffect( () => {
    if (!router.isReady) return;
    loadInit();
    return () => setListProvince({});
  }, [router.isReady]);

  const loadInit = async () => {
    const provinces = await locationService.listProvince();
    setListProvince(provinces);
    const schools = await schoolService.list({limit:20});
    if(schools.total){
      setListSchool(schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      })));
    }
  }

  const handleSubmitForm = async (data, {resetForm}) => {
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
    console.log('body-data', bodyData);
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
        schoolId: '',
        classId: '',
        fullName: '',
        address: '',
        phoneNumber: '',
        province: {},
        district: {},
        ward: {},
      }}
    >
      {({
          handleChange,
          values,
          setFieldValue,
          resetForm,
        }) => (
        <Form className='form py-8'>
          <h3>Thêm Phụ Huynh</h3>
          
          <Select
            label='Tên trường'
            name='schoolId'
            options={listSchool}
            onChange={(e) => {
              setFieldValue('schoolId', e.value);
            }}
          />
          
          <Input
            label='Họ tên'
            name='fullName'
            onChange={handleChange}
            value={values.fullName}
          />
          <Input
            label='Phone'
            name='phoneNumber'
            onChange={handleChange}
            value={values.phoneNumber}
          />
          <Input
            label='Địa chỉ'
            name='address'
            onChange={handleChange}
            value={values.address}
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