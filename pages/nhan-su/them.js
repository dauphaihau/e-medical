import {Formik, Form} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import swal from "sweetalert";
import {useRouter} from "next/router";

import Button from "@components/button";
import Input from "@components/form/input";
import { memberService, locationService, schoolService, classService } from "@services";
import Select from "@components/form/select";

const phoneRegExp = /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/
const validationSchema = Yup.object().shape({
  school: Yup.string().required(),
  class: Yup.string().required(),
  fullName: Yup.string()
    .min(5, 'Tên trường ít nhất là 5 ký tự')
    .max(50, 'Tên trường tối đa là 50 ký tự')
    .required('Tên người dùng không được để trống'),
  phoneNumber: Yup.string()
    .required('Vui logn2 nhập số điện thoại')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  // address: Yup.string().required('Địa chỉ không được để trống'),
  // province: Yup.string().required('Tỉnh không được để trống'),
  // district: Yup.string().required('Quận không được để trống'),
  // ward: Yup.string().required('Phường không được để trống'),
});

const labelAddType = {
  'giao-vien': 'Giáo Viên',
  'nhan-vien': 'Nhân viên',
};

const AddStaff = () => {
  const router = useRouter();
  const [listSchool, setListSchool] = useState();
  const [listClass, setListClass] = useState();
  const [listProvince, setListProvince] = useState();
  const [listDistrict, setListDistrict] = useState();
  const [listWard, setListWard] = useState();
  const [addType, setAddType] = useState();

  useEffect( () => {
    if (!router.isReady) return;
    let abortController = new AbortController();  
    
    if( router.pathname.includes('giao-vien') ){
      setAddType('giao-vien');
    }
    loadInit();
    return () => abortController.abort(); 
  }, [router.isReady, router.asPath]);

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

  const handleSubmitForm = async (data) => {
    console.log(data);
    try {
      await memberService.create(data);
      swal('Cap nhat thanh cong')
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeProvince = async (e) => {
    const districts = await locationService.listDistrict(e.code);
    setListDistrict(districts);
  }

  const onChangeDistrict = async (e) => {
    const wards = await locationService.listWard(e.code);
    setListWard(wards);
  }

  const onChangeSchool = async (schoolId) => {
    const classes = await classService.list({schoolId});
    if(classes.total){
      setListClass(classes.data.map((data) => ({
        value: data._id,
        label: data.className,
      })));
    }
    // setListDistrict(districts);
  } 

  return (
    <Formik
      className='my-4'
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        school: '',
        class: '',
        fullName: '',
        address: '',
        phoneNumber: '',
        province: '',
        district: '',
        ward: '',
      }}
    >
      {({
          handleChange,
          values,
          setFieldValue,
          form
        }) => (
        <Form className='form py-8'>
          <h3>Thêm {labelAddType[addType]}</h3>
          <div className='grid lg:grid-cols-2 gap-x-4'>
            <Select
              label='Tên trường'
              name='school'
              options={listSchool}
              onChange={(e) => {
                onChangeSchool(e.value);
                setFieldValue('school', e.value);
              }}
            />
            <Select
              label='Lớp chủ nhiệm'
              name='class'
              options={listClass}
              onChange={(e) => setFieldValue('class', e.value)}
            />
          </div>
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
          <div className='grid lg:grid-cols-2 gap-x-4'>
            <Select
              label='Tỉnh/thành'
              name='province'
              options={listProvince}
              onChange={(e) => {
                onChangeProvince(e);
                setFieldValue('province', e.code);
              }}
              // value={values.province}
            />
            <Select
              label='Quận/huyện'
              name='district'
              options={listDistrict}
              onChange={(e) => {
                onChangeDistrict(e);
                setFieldValue('district', e.code);
              }}
              // value={values.district}
            />
            <Select
              label='Phường/Xã' 
              name='ward'
              options={listWard}
              onChange={(e) => {
                handleChange(e.code)
                setFieldValue('ward', e.code);
              }}
              // value={values.ward}
            />
          </div>
          
          <Button type='submit' className='mr-4'>Cập nhật</Button>
        </Form>
      )}
    </Formik>
  )
}
export default AddStaff