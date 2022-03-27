import {Formik, Form, Field} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import _ from "lodash";
import swal from "sweetalert";
import Router, {useRouter} from "next/router";

import Button from "@components/button";
import Input from "@components/form/input";
import {memberService, locationService, schoolService, classroomService} from "@services";
import Select from "@components/form/select";
import Region from "@components/form/region";
import {useAuth} from "../../context/auth";

const phoneRegExp = /^[+|0]?\d+$/;
const validationSchema = Yup.object().shape({
  schoolId: Yup.string().required('Vui lòng chọn trường'),
  fullName: Yup.string()
    .min(5, 'Tên trường ít nhất là 5 ký tự')
    .max(50, 'Tên trường tối đa là 50 ký tự')
    .required('Tên người dùng không được để trống'),
  phoneNumber: Yup.string()
    .required('Vui lòng nhập số điện thoại')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  address: Yup.string().required('Địa chỉ không được để trống'),
  // province: Yup.object().shape({}),
  // district: Yup.object().shape({}),
  // ward: Yup.object().shape({}),
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
  const [provinceOptions, setProvinceOptions] = useState([]);
  const {user} = useAuth()
  const [initData, setInitData] = useState({
    school: {},
    class: {},
    province: defaultSelectValue,
    district: defaultSelectValue,
    ward: defaultSelectValue,
  });

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
    return () => {}
  }, [router.isReady]);

  const loadInit = async () => {
    const provinces = await locationService.listProvince();
    setProvinceOptions(provinces);
    const {id} = router.query;
    
    const {status, data: memberRes} = await memberService.detail(id);
    if(!status || !memberRes){
      Router.push('/phu-huynh')
      return
    }

    setMember(memberRes);
    let initDataSelected = {};
    if (!_.isNil(memberRes.province)) {
      initDataSelected.province = _.find(provinces, (o) => o.code === memberRes.province.code);
      if (memberRes.district !== undefined) {
        const districts = await locationService.listDistrict(memberRes.province.code);
        initDataSelected.district = _.find(districts, (o) => o.code === memberRes.district.code);
        if (memberRes.ward !== undefined) {
          const wards = await locationService.listWard(memberRes.district.code);
          initDataSelected.ward = _.find(wards, (o) => o.code === memberRes.ward.code);
        }
      }
    }

    const schools = await schoolService.list({limit: 20});
    if (status && schools.total) {
      const schoolSelect = schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      }));
      setListSchool(schoolSelect);
      const initSchool = _.find(schoolSelect, {value: user?.role === 'admin' ? memberRes?.schoolWorking[0]?.schoolId : user?.schoolWorking?.schoolId});
      initDataSelected.school = initSchool;
    }
    setInitData(initDataSelected);
  }

  const handleSubmitForm = async (data) => {
    const {id} = router.query;
    let bodyData = {};
    if (data.province && !_.isEmpty(data.province)) {
      bodyData.province = {code: data.province.code, provinceName: data.province.label}
    }
    if (data.district && !_.isEmpty(data.district)) {
      bodyData.district = {code: data.district.code, districtName: data.district.label}
    }
    if (data.ward && !_.isEmpty(data.ward)) {
      bodyData.ward = {code: data.ward.code, wardName: data.ward.label}
    }
    bodyData = {...data, ...bodyData};

    const result = await memberService.update(id, bodyData);
    swal({
      title: result.message,
      icon: result.status?"success":"error"
    })
      // .then(() => (result.status || result.statusCode === 403) && Router.push('/phu-huynh'))
  };

  return (
    <Formik
      className='my-4'
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolId: initData.school?.value ?? '',
        // classId: initData.class?.value ?? '',
        fullName: member?.fullName ?? '',
        address: member?.address ?? '',
        phoneNumber: member?.phoneNumber ?? '',
        province: initData.province,
        district: initData.district,
        ward: initData.ward,
      }}
    >
      {({
          handleChange,
          values,
          setFieldValue,
          errors,
        }) => (
        <Form className='form py-8'>
          <h3>Cập nhật thông tin</h3>
          <Select
            label='Tên trường'
            name='schoolId'
            options={listSchool}
            isDisable={user?.role !== 'admin'}
            value={initData.school}
            useFormik
            onChange={(e) => {
              setFieldValue('schoolId', e.value);
              setInitData({
                ...initData, ...{
                  school: e,
                  class: {},
                }
              });
            }}
          />

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
            listProvince={provinceOptions}
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
