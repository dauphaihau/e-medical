import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import AsyncSelect from 'react-select/async';

import {classroomService, schoolService, schoolYearService, memberService} from "@services";

import Input from "@components/form/input";
import Radio, {RadioGroup} from "@components/form/radio";
import Button from "@components/button";
import Select from "@components/form/select";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Họ tên không được để trống')
    .min(5, 'Họ tên ít nhất là 5 ký tự')
    .max(50, 'Họ tên tối đa là 50 ký tự'),
  dateOfBirth:  Yup.string().required('Ngày sinh không được để trống'),
  schoolYearId: Yup.string().required('Vui lòng chọn niên khóa'),
  parent: Yup.array().min(1, 'Vui lòng chọn phụ huynh').required('Vui lòng chọn phụ huynh'),
  schoolId: Yup.string().required('Vui lòng chọn trường.'),
  classId: Yup.string().required('Vui lòng chọn lớp.'),
});

const AddStudent = () => {
  const router = useRouter();
  const [listSchool, setListSchool] = useState();
  const [listSchoolYear, setListSchoolYear] = useState();
  const [listGroup, setListGroup] = useState();
  const [listClass, setListClass] = useState();

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady])

  const loadInit = async () => {
    const schools = await schoolService.list({limit: 100});
    if (schools.total) {
      setListSchool(schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      })));
    }
  }

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

  const handleSubmitForm = async (values) => {
    const result = await memberService.createStudent(values);
    if(result){
      swal({
        text: "Thêm mới thành công",
        icon: "success"
      })
        .then(() => router.push('/hoc-sinh'));
    }
    else{
      swal({
        text: "Thêm mới không thành công",
        icon: "error"
      });
    }
  };

  const loadOptions = async (inputValue) => {
    if(inputValue.length > 2){
      const response = await memberService.listParent({s:inputValue});
      if(response && response.total){
        return response.data.map( (row) => ({value: row._id, fullName: row.fullName, label:row.fullName + ' (' + row.phoneNumber + ')'}));
      }
    }
  };

  return (
    <>
      <h4>Thêm mới học sinh</h4>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
        enableReinitialize
        initialValues={{
          schoolId: '',
          classId: '',
          parent: '',
          fullName: '',
          dateOfBirth: '',
          gender: '',
        }}
      >
        {({
            handleChange,
            setFieldValue,
          }) => (
          <Form className='form'>
            <h3>Thông tin cá nhân</h3>
            <div className='grid lg:grid-cols-2 gap-x-6'>
              <Select
                label='Tên Trường'
                name='schoolId'
                useFormik='true'
                onChange={e => {
                  onChangeSchool(e.value);
                  setFieldValue('schoolId', e.value)
                }}
                options={listSchool}
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
                name='classGroup'
                useFormik='true'
                onChange={e => {
                  onChangeGroup(e.value);
                  setFieldValue('classGroup', e.value)
                }}
                options={listGroup}
              />
              <Select
                label='Lớp'
                name='classId'
                useFormik='true'
                onChange={e => setFieldValue('classId', e.value)}
                options={listClass}
              />

            </div>
            <div className='grid lg:grid-cols-2 gap-x-6'>
              <Input label='Họ và tên' name='fullName' useFormik onChange={handleChange}/>
              <Input label='Ngày sinh' name='dateOfBirth' useFormik onChange={handleChange}/>
            </div>
            <RadioGroup label='Giới Tính'>
              <Radio name='sex' value='male' labelName="Nam" id="sex-male"/>
              <Radio name='sex' value='female' labelName="Nữ" id='sex-female'/>
            </RadioGroup>
           
            <h3 className='mt-6'>Phụ Huynh</h3>
            <div className="grid lg:grid-cols-2 gap-x-6">
              <AsyncSelect
                id="parent"
                instanceId="parent"
                cacheOptions
                isMulti
                placeholder='Nhập số điện thoại phụ huynh'
                loadOptions={loadOptions}
                defaultOptions
                onChange={(e)=> setFieldValue('parent', e.map((v)=> ({parentId: v.value, fullName:v.fullName})))}
              />
            </div>
            <div className='flex gap-x-4 mt-6'>
              <Button type='submit'>Thêm</Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
export default AddStudent;
