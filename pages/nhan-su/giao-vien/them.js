import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import swal from "sweetalert";
import Router, {useRouter} from "next/router";
import _ from "lodash";

import Button from "@components/button";
import Input from "@components/form/input";
import {classroomService, locationService, memberService, schoolService, schoolYearService} from "@services";
import Select from "@components/form/select";
import Region from "@components/form/region";
import {useAuth} from "../../../context/auth";

const phoneRegExp = /^[+|0]?\d+$/;
const validationSchema = Yup.object().shape({
  schoolId: Yup.string().required('Trường không được để trống'),
  schoolYearId: Yup.string().required('Niên khoá không được để trống'),
  classGroupId: Yup.string().required('Khối không được để trống'),
  classId: Yup.string().required('Lớp không được để trống'),
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

const AddTeacher = () => {
  const router = useRouter();
  const [listSchool, setListSchool] = useState();
  const [listSchoolYear, setListSchoolYear] = useState();
  const [listGroup, setListGroup] = useState();
  const [listClass, setListClass] = useState();
  const [listProvince, setListProvince] = useState();
  const {user} = useAuth();
  const [initData, setInitData] = useState({
    school: {label: '', value: ''},
  });

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
    return () => {
    };
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
      if (user && user?.role !== 'admin') {
        const initSchool = _.find(schoolSelect, {value: user?.schoolWorking[0]?.schoolId});
        if (initSchool) {
          initDataSelected.school = initSchool;
          onChangeSchool(initSchool.value)
        }
      }

    }
    setInitData(initDataSelected);
  }

  const handleSubmitForm = async (data, {resetForm}) => {
    //format data
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

    const result = await memberService.createTeacher(bodyData);
    swal({
      title: result.message,
      icon: result.status ? "success" : "error"
    })
      .then(() => (result.status || result.statusCode === 403) && router.push('/nhan-su/giao-vien'))

  };

  const onChangeSchool = async (idSchool) => {
    const schoolYear = await schoolYearService.list({schoolId: idSchool, limit: 100})
    if (schoolYear.total) {
      setListSchoolYear(schoolYear.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      })));
    }
  };

  const onChangeSchoolYear = async (schoolYearId) => {
    const clsGrp = await classroomService.listGroup({schoolYearId, limit: 100, type: 'group'});
    if (clsGrp.total) {
      setListGroup(clsGrp.data.map((data) => ({
        value: data._id,
        label: data.className,
      })));
    }
  }

  const onChangeGroup = async (id) => {
    const classes = await classroomService.list({parentId: id, type: 'class'})
    if (classes.total) {
      setListClass(classes.data.map((data) => ({
        value: data._id,
        label: data.className,
      })));
    }
  };

  return (
    <Formik
      className='my-4'
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolId: initData.school?.value,
        schoolYearId: '',
        classGroupId: '',
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
        }) => (
        <Form className='form py-8'>
          <h3>Thêm Giáo Viên</h3>
          <div className='grid lg:grid-cols-2 gap-x-4'>
            <Select
              label='Tên trường'
              name='schoolId'
              isDisable={user?.role !== 'admin' && user?.role !== 'manager'}
              value={user.role !== 'admin' && {
                value: user.schoolWorking?.schoolId,
                label: user.schoolWorking?.schoolName
              }}
              options={listSchool}
              value={initData.school}
              onChange={(e) => {
                onChangeSchool(e.value);
                setFieldValue('schoolId', e.value);
              }}
              useFormik
            />
            <Select
              label='Niên khoá'
              name='schoolYearId'
              onChange={e => {
                onChangeSchoolYear(e.value);
                setFieldValue('schoolYearId', e.value)
              }}
              options={listSchoolYear}
              useFormik
            />
            <Select
              label='Khối'
              name='classGroupId'
              useFormik
              onChange={e => {
                onChangeGroup(e.value);
                setFieldValue('classGroupId', e.value)
              }}
              options={listGroup}
            />
            <Select
              label='Lớp chủ nhiệm'
              name='classId'
              useFormik
              options={listClass}
              onChange={(e) => setFieldValue('classId', e.value)}
            />
          </div>
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
          <div className='grid lg:grid-cols-2 gap-x-4'>
            <Field
              component={Region}
              listProvince={listProvince}
            />
          </div>
          <Button type='submit' className='mr-4'>Thêm</Button>
        </Form>
      )}
    </Formik>
  )
}
export default AddTeacher