import {Formik, Form, Field} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import swal from "sweetalert";
import Router, {useRouter} from "next/router";

import Button from "@components/button";
import Input from "@components/form/input";
import { memberService, locationService, schoolService, classroomService } from "@services";
import Select from "@components/form/select";
import Region from "@components/form/region";
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

const defaultSelectValue = {
  value: "",
  label: "",
  code: "",
};

const UpdateStaff = () => {
  const router = useRouter();
  const [member, setMember] = useState();
  const [listSchool, setListSchool] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [initData, setInitData] = useState({
    school: {},
    class: {},
    province: {},
    district: {},
    ward: {},
  });

  useEffect( () => {
    if (!router.isReady) return;

    if( router.pathname.includes('giao-vien') ){
      setAddType('giao-vien');
    }
    loadInit();
    return () => setMember({})
  }, [router.isReady]);

  useEffect( () => {
  }, [listSchool])

  const loadInit = async () => {
    const { id } = router.query;
    if( id ){
      const memberRes = await memberService.detail(id);
      if(memberRes && !_.isEmpty(memberRes)){
        setMember(memberRes);
      }
      else{
        swal("Thành viên này không tồn tại!", "", "error")
          .then(() => Router.push('/nhan-su/giao-vien/'));
      }

      let initDataSelected = {};
      const provinces = await locationService.listProvince();
      setListProvince(provinces);
    
      const schools = await schoolService.list({limit:20});
      if(schools.total){
        const schoolSelect = schools.data.map((data) => ({
          value: data._id,
          label: data.schoolname,
        }));
        setListSchool(schoolSelect);
        const initSchool = _.find(schoolSelect, {value: memberRes.schoolWorking?.schoolId});
        initDataSelected.school = initSchool;
    
        setInitData(initDataSelected);
        console.log('init-data', initData)
      }
    }
    else{
      Router.push('/phu-huynh');
    }
  }

  const handleSubmitForm = async (data) => {
    const { id } = router.query;
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

    const result = await memberService.update(id, bodyData);
    if(result){
      swal({
        title: "Cập nhật thành công",
        icon: "success"
      })
        .then(() => Router.push('/phu-huynh'))
    }
    else{
      swal({
        title: "Cập nhật không thành công",
        icon: "error"
      })
    }
  };

  const onChangeSchool = async (schoolId) => {
    const classes = await classroomService.list({schoolId});
    let classSelected = [];
    if(classes.total){
      classSelected = classes.data.map((data) => ({
        value: data._id,
        label: data.className,
      }));
    }
    setListClass(classSelected);
    return classSelected;
  }

  return (
    <Formik
      className='my-4'
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolId: initData.school?.value ?? '',
        classId: initData.class?.value ?? '',
        fullName: member?.fullName ?? '',
        address: member?.address ?? '',
        phoneNumber: member?.phoneNumber ?? '',
        province: member && member.province ? {
          value: member.province.code, 
          code: member.province.code,
          label: member.province.provinceName
        }:defaultSelectValue,
        district: member && member.district ? {
          value: member.district.code, 
          code: member.district.code,
          label: member.district.districtName
        }:defaultSelectValue,
        ward: member && member.ward ? {
          value: member.ward.code, 
          code: member.ward.code,
          label: member.ward.wardName
        }:defaultSelectValue,
      }}
    >
      {({
          handleChange,
          values,
          setFieldValue,
        }) => (
        <Form className='form py-8'>
          <h3>Cập nhật thông tin</h3>
        
          <Select
            label='Tên trường'
            name='schoolId'
            options={listSchool}
            value={initData.school && !_.isEmpty(initData.school)?initData.school: ''}
            onChange={(e) => {
              setFieldValue('schoolId', e.value);
              setInitData({...initData, ...{
                school: e,
                class: {},
              }});
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
            provinceSelected={values.province}
            districtSelected={values.district}
            wardSelected={values.ward}
          />
          
          <Button type='submit' className='mr-4'>Cập nhật</Button>
        </Form>
      )}
    </Formik>
  )
}
export default UpdateStaff;
