import {Formik, Form} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import swal from "sweetalert";
import Router, {useRouter} from "next/router";
import _ from "lodash";

import Button from "@components/button";
import Input from "@components/form/input";
import { memberService, locationService, schoolService, classroomService } from "@services";
import Select from "@components/form/select";

const phoneRegExp = /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/
const validationSchema = Yup.object().shape({
  schoolId: Yup.string().required(),
  classId: Yup.string().required(),
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

const labelAddType = {
  'giao-vien': 'Giáo Viên',
  'nhan-vien': 'Nhân viên',
};

const UpdateStaff = () => {
  const router = useRouter();
  const [member, setMember] = useState();
  const [listSchool, setListSchool] = useState([]);
  const [listClass, setListClass] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [addType, setAddType] = useState();
  const [initData, setInitData] = useState({
    school: {},
    class: {},
    province: {},
    district: {},
    ward: {},
  });
  const [schoolSelected, setSchoolSelected] = useState();
  const [classSelected, setSelected] = useState();

  useEffect( () => {
    if (!router.isReady) return;
    let abortController = new AbortController();

    if( router.pathname.includes('giao-vien') ){
      setAddType('giao-vien');
    }
    loadInit();
    return () => abortController.abort();
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
      initDataSelected.province = _.find(provinces, {code: memberRes?.province?.code})
      //set init province
      if(initDataSelected.province && initDataSelected.province.code){
        const districts = await locationService.listDistrict(initDataSelected.province.code);
        setListDistrict(districts);
        initDataSelected.district = _.find(districts, {code: memberRes?.district?.code});
      }
      //set init district
      if(initDataSelected.district && initDataSelected.district.code){
        const wards = await locationService.listWard(initDataSelected.district.code);
        setListWard(wards);
        initDataSelected.ward = _.find(wards, {code: memberRes?.ward?.code});
      }
      console.log(initDataSelected);

      const schools = await schoolService.list({limit:20});
      if(schools.total){
        const schoolSelect = schools.data.map((data) => ({
          value: data._id,
          label: data.schoolname,
        }));
        setListSchool(schoolSelect);
        const initSchool = _.find(schoolSelect, {value: memberRes.schoolWorking?.schoolId});
        setSchoolSelected(initSchool);
        initDataSelected.school = initSchool;
        // initData.school = initSchool;

        if(initSchool && !_.isEmpty(initSchool)){
          const classSelect = await onChangeSchool(initSchool.value);
          if(classSelect){
            initDataSelected.class = _.find(classSelect, {value: memberRes.schoolWorking?.classId});
          }
        }
        setInitData(initDataSelected);
      }
    }
    else{
      Router.push('/nhan-su/giao-vien/');
    }
  }

  const handleSubmitForm = async (data) => {
    const { id } = router.query;
    try {
      await memberService.update(id, data);
      swal('Cập nhật thành công', '', 'success')
        .then(() => Router.push('/nhan-su/giao-vien/'));
    } catch (error) {
      swal('Cập nhật không thành công.', 'Vui lòng thử lại.', 'error');
    }
  };

  const onChangeProvince = async (e) => {
    const districts = await locationService.listDistrict(e.code);
    setListDistrict(districts);
    setInitData({...initData, ...{
      province: e,
      district: {},
      ward: {},
    }});
  }

  const onChangeDistrict = async (e) => {
    const wards = await locationService.listWard(e.code);
    setListWard(wards);
    setInitData({...initData, ...{
      district: e,
      ward: {},
    }});
  }

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
        province: member?.province ?? {},
        district: member?.district?? {},
        ward: member?.ward ?? {},
      }}
    >
      {({
          handleChange,
          values,
          setFieldValue,
        }) => (
        <Form className='form py-8'>
          <h3>Cập nhật {labelAddType[addType]}</h3>
          <div className='grid lg:grid-cols-2 gap-x-4'>
            <Select
              label='Tên trường'
              name='schoolId'
              options={listSchool}
              value={initData.school && !_.isEmpty(initData.school)?initData.school: ''}
              onChange={(e) => {
                onChangeSchool(e.value);
                setFieldValue('schoolId', e.value);
                setInitData({...initData, ...{
                  school: e,
                  class: {},
                }});
              }}
            />
            <Select
              label='Lớp chủ nhiệm'
              name='classId'
              options={listClass}
              value={initData.class && !_.isEmpty(initData.class)?initData.class:''}
              onChange={(e) => {
                setFieldValue('classId', e.value)
                setInitData({...initData, ...{
                  class: e,
                }});
              }}
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
              value={initData.province && !_.isEmpty(initData.province)?initData.province:''}
              onChange={(e) => {
                onChangeProvince(e);
                setFieldValue('province', e);
              }}
            />
            <Select
              label='Quận/huyện'
              name='district'
              options={listDistrict}
              value={initData.district && !_.isEmpty(initData.district)?initData.district:''}
              onChange={(e) => {
                onChangeDistrict(e);
                setFieldValue('district', e);
              }}
            />
            <Select
              label='Phường/Xã'
              name='ward'
              options={listWard}
              value={initData.ward && !_.isEmpty(initData.ward)?initData.ward:''}
              onChange={(e) => {
                handleChange(e.code)
                setFieldValue('ward', e);
                setInitData({...initData, ...{
                  ward: e,
                }});
              }}
            />
          </div>
          <Button type='submit' className='mr-4'>Cập nhật</Button>
        </Form>
      )}
    </Formik>
  )
}
export default UpdateStaff;
