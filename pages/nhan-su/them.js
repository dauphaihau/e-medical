import {Formik, Form, Field} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import swal from "sweetalert";
import {useRouter} from "next/router";
import _ from "lodash";

import Button from "@components/button";
import Input from "@components/form/input";
import {memberService, locationService, schoolService, classroomService, schoolYearService} from "@services";
import Select from "@components/form/select";
import Region from "@components/form/region";

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

const AddStaff_Trash = () => {
  const router = useRouter();
  const [listSchool, setListSchool] = useState();
  const [listSchoolYear, setListSchoolYear] = useState();
  const [listGroup, setListGroup] = useState();
  const [listClass, setListClass] = useState();
  const [listProvince, setListProvince] = useState();
  const [addType, setAddType] = useState();

  useEffect(() => {
    if (!router.isReady) return;
    let abortController = new AbortController();

    if (router.pathname.includes('giao-vien')) {
      setAddType('giao-vien');
    }
    loadInit();
    return () => abortController.abort();
  }, [router.isReady]);

  const loadInit = async () => {
    const provinces = await locationService.listProvince();
    setListProvince(provinces);
    const schools = await schoolService.list({limit: 20});
    if (schools.total) {
      setListSchool(schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      })));
    }
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
    if (result) {
      swal('Cập nhật thành công', '', 'success')
      // .then(() => Router.push('/nhan-su/giao-vien/'));
    } else {
      swal('Cập nhật không thành công', '', 'error');
    }
  };

  const onChangeSchool = async (idSchool) => {
    const schoolYear = await schoolYearService.list({schoolId: idSchool})
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
        schoolId: '',
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
          resetForm,
        }) => (
        <Form className='form py-8'>
          <h3>Thêm {labelAddType[addType]}</h3>
          <div className='grid lg:grid-cols-2 gap-x-4'>
            <Select
              label='Tên trường'
              name='schoolId'
              options={listSchool}
              onChange={(e) => {
                onChangeSchool(e.value);
                setFieldValue('schoolId', e.value);
              }}
            />
            <Select
              label='Niên khoá'
              name='schoolYearId'
              onChange={e => {
                onChangeSchoolYear(e.value);
                setFieldValue('schoolYearId', e.value)
              }}
              options={listSchoolYear}
              useFormik='true'
            />
            <Select
              label='Khối'
              name='classGroupId'
              useFormik='true'
              onChange={e => {
                onChangeGroup(e.value);
                setFieldValue('classGroupId', e.value)
              }}
              options={listGroup}
            />
            <Select
              label='Lớp chủ nhiệm'
              name='classId'
              options={listClass}
              onChange={(e) => setFieldValue('classId', e.value)}
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
export default AddStaff_Trash