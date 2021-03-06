import {Formik, Form, Field} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import swal from "sweetalert";
import Router, {useRouter} from "next/router";
import _ from "lodash";

import Button from "@components/button";
import Input from "@components/form/input";
import { memberService, locationService, schoolService } from "@services";
import Select from "@components/form/select";
import Region from "@components/form/region";
import {useAuth} from "../../../context/auth";

const phoneRegExp = /^[+|0]?\d+$/;
const validationSchema = Yup.object().shape({
  schoolId: Yup.string().required("Trường không được để trống"),
  fullName: Yup.string()
    .min(5, 'Tên trường ít nhất là 5 ký tự')
    .max(50, 'Tên trường tối đa là 50 ký tự')
    .required('Tên không được để trống'),
  phoneNumber: Yup.string()
    .required('Vui lòng nhập số điện thoại')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  // address: Yup.string().required('Địa chỉ không được để trống'),
  province: Yup.object().shape({}),
  district: Yup.object().shape({}),
  ward: Yup.object().shape({}),
});

const AddManager = () => {
  const router = useRouter();
  const [listSchool, setListSchool] = useState();
  const [listProvince, setListProvince] = useState();
  const {user} = useAuth();
  const [initData, setInitData] = useState({
    school: {label:'', value:''},
  });

  useEffect( () => {
    if (!router.isReady) return;
    loadInit();
    return () => {};
  }, [router.isReady]);

  const loadInit = async () => {
    const provinces = await locationService.listProvince();
    setListProvince(provinces);

    let initDataSelected = {};
    const schools = await schoolService.list({limit: 100});
    if (schools.total) {
      const schoolSelect = schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      }))
      setListSchool(schoolSelect);
      if(user && user?.role !== 'admin'){
        const initSchool = _.find(schoolSelect, {value: user.schoolWorking[0]?.schoolId});
        initDataSelected.school = initSchool;
      }
    }
    setInitData(initDataSelected);
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
    console.log('body-data', bodyData)

    const result = await memberService.createManager(bodyData);
    swal({
      title: result.message,
      icon: result.status?"success":"error"
    })
      .then(() => (result.status || result.statusCode === 403) && router.push('/nhan-su/can-bo'))
  };

  return (
    <Formik
      className='my-4'
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolId: initData.school?.value,
        fullName: '',
        address: '',
        phoneNumber: '',
        province: {},
        district: {},
        ward: {},
        role: 'manager'
      }}
    >
      {({
          handleChange,
          values,
          setFieldValue,
        }) => (
        <Form className='form py-8'>
          <h3>Thêm cán bộ quản lý</h3>
          <Select
            label='Tên trường'
            name='schoolId'
            isDisable={user && user?.role !== 'admin'}
            options={listSchool}
            onChange={(e) => {
              setFieldValue('schoolId', e.value);
            }}
            value={initData.school}
            useFormik
          />
          <Input
            label='Họ tên'
            name='fullName'
            useFormik
            onChange={handleChange}
            value={values.fullName}
          />
          <Input
            label='Phone'
            name='phoneNumber'
            useFormik
            onChange={handleChange}
            value={values.phoneNumber}
          />
          <Input
            label='Địa chỉ'
            name='address'
            useFormik
            onChange={handleChange}
            value={values.address}
          />
          <div className='grid lg:grid-cols-2 gap-x-4'>
            <Field
              component={Region}
              listProvince={listProvince}
            />
            <Select
              label='Phân quyền'
              name='role'
              options={[
                {value:'staff', label:'Nhân viên'},
                {value:'manger', label:'Cán bộ quản lý'},
              ]}
              onChange={(e) => {
                setFieldValue('role', e.value);
              }}
              defaultValue={{value:'manger', label:'Cán bộ quản lý'}}
            />
          </div>
          
          <Button type='submit' className='mr-4'>Thêm</Button>
        </Form>
      )}
    </Formik>
  )
}
export default AddManager