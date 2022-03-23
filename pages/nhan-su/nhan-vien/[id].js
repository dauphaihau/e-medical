import {Formik, Form, Field} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import swal from "sweetalert";
import Router, {useRouter} from "next/router";

import Button from "@components/button";
import Input from "@components/form/input";
import { memberService, schoolYearService, schoolService, classroomService } from "@services";
import Select from "@components/form/select";
import Region from "@components/form/region";
import _ from "lodash";
import {useAuth} from "../../../context/auth";

const phoneRegExp = /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/
const validationSchema = Yup.object().shape({
  schoolId: Yup.string().required(),
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
  const {user} = useAuth();
  const [listSchool, setListSchool] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [initData, setInitData] = useState({
    school: {},
    schoolYear: {},
    classGroup: {},
    class: {},
    province: {},
    district: {},
    ward: {},
  });

  useEffect( () => {
    if (!router.isReady) return;
    let abortController = new AbortController();  
  
    loadInit();
    return () => abortController.abort(); 
  }, [router.isReady]);

  const loadInit = async () => {
    const { id } = router.query;
    if( id ){
      const memberRes = await memberService.detail(id);
      if(memberRes && !_.isEmpty(memberRes)){
        setMember(memberRes);
      }
      else{
        swal("Thành viên này không tồn tại!", "", "error")
          .then(() => Router.push('/nhan-su/nhan-vien/'));
      }

      let initDataSelected = {};
      const schools = await schoolService.list({limit:20});
      if(schools.total){
        const schoolSelect = schools.data.map((data) => ({
          value: data._id,
          label: data.schoolname,
        }));
        setListSchool(schoolSelect);
        const initSchool = _.find(schoolSelect, {value: memberRes.schoolWorking?.schoolId});
        initDataSelected.school = initSchool;
      }
      setInitData(initDataSelected);
    }
    else{
      Router.push('/nhan-su/nhan-vien/');
    }
  }


  const handleSubmitForm = async (data) => {
    const { id } = router.query;
    try {
      await memberService.update(id, data);
      swal('Cập nhật thành công', '', 'success')
        .then(() => Router.push('/nhan-su/nhan-vien/'));
    } catch (error) {
      swal('Cập nhật không thành công.', 'Vui lòng thử lại.', 'error');
    }
  };
  
  return (
    <Formik
      className='my-4'
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolId: member && member.schoolWorking.schoolId,
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
          <div className='grid lg:grid-cols-2 gap-x-4'>
            <Field
              component={Region}
              listProvince={listProvince}
              provinceSelected={values.province}
              districtSelected={values.district}
              wardSelected={values.ward}
            />
            <Select
              label='Phân quyền'  
              name='role'
              options={[
                {value:'staff', label:'Nhân viên'},
                {value:'manager', label:'Cán bộ quản lý'},
              ].filter((option) => {
                if (user.role === 'manager' || user.role === 'admin') {
                  return option
                }
                return option.value === 'staff'
              })}
              onChange={(e) => {
                setFieldValue('role', e.value);
              }}
              defaultValue={{value:'staff', label:'Nhân viên'}}
            />
          </div>
          <Button type='submit' className='mr-4'>Cập nhật</Button>
        </Form>
      )}
    </Formik>
  )
}
export default UpdateStaff;
