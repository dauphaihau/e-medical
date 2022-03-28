import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import AsyncSelect from 'react-select/async';
import _ from "lodash";

import {classroomService, schoolService, schoolYearService, memberService} from "@services";

import Input from "@components/form/input";
import {RadioGroup} from "@components/form/radio";
import Button from "@components/button";
import Select from "@components/form/select";
import {TrashIcon} from "@heroicons/react/outline";
import {useAuth} from "../../context/auth";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Họ tên không được để trống')
    .min(5, 'Họ tên ít nhất là 5 ký tự')
    .max(50, 'Họ tên tối đa là 50 ký tự'),
  dateOfBirth: Yup.string().required('Ngày sinh không được để trống'),
  schoolYearId: Yup.string().required('Vui lòng chọn niên khóa'),
  parent: Yup.array().min(1, 'Vui lòng chọn phụ huynh').required('Vui lòng chọn phụ huynh'),
  classId: Yup.string().required('Vui lòng chọn lớp.'),
});

const AddStudent = () => {
  const router = useRouter();
  const [parents, setParents] = useState([]);
  const [listSchool, setListSchool] = useState();
  const [school, setSchool] = useState()
  const [listSchoolYear, setListSchoolYear] = useState();
  const [listGroup, setListGroup] = useState();
  const [listClass, setListClass] = useState();
  const [parentSelect, setParentSelect] = useState({})
  const {user} = useAuth();
  const [initData, setInitData] = useState({
    school: {},
  });

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
    return () => {};
  }, [router.isReady])

  const loadInit = async () => {

    // const resSchool = await schoolService.detail();
    // setSchool(resSchool)

    let initDataSelected = {};
    // const schoolYear = await schoolYearService.list({})
    // if (schoolYear.total) {
    //   setListSchoolYear(schoolYear.data.map((data) => ({
    //     value: data._id,
    //     label: data.schoolYearName,
    //   })));
    // }

    const schools = await schoolService.list({limit: 100});
    if (schools.total) {
      const schoolSelect = schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      }))
      setListSchool(schoolSelect);
      const initSchool = _.find(schoolSelect, {value: user.schoolWorking?.schoolId});
      initDataSelected.school = initSchool;
    }
    setInitData(initDataSelected)
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
    if (result) {
      swal({
        text: "Thêm mới thành công",
        icon: "success"
      })
        .then(() => router.push('/hoc-sinh'));
    } else {
      swal({
        text: "Thêm mới không thành công",
        icon: "error"
      });
    }
  };

  const loadOptions = async (inputValue) => {
    if (inputValue.length > 2) {
      const response = await memberService.listParent({s: inputValue});
      if (response && response.total) {
        return response.data.map((row) => ({
          value: row._id,
          phoneNumber: row.phoneNumber,
          fullName: row.fullName,
          label: row.fullName + ' (' + row.phoneNumber + ')'
        }));
      }
    }
  };

  const handleParent = (...newParent) => {
    const newArrParents = [...parents, ...newParent];
    setParents(newArrParents)

    const submitParents = _.uniq(newArrParents);
    return submitParents.map((v) => ({parentId: v.value, fullName: v.fullName}))
  };

  return (
    <>
      <h4>Thêm mới học sinh</h4>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
        enableReinitialize
        initialValues={{
          schoolId: user && user.role !== 'admin' && !_.isNil(user.schoolWorking?.schoolId)?user.schoolWorking.schoolId:'',
          classId: '',
          parent: '',
          fullName: '',
          dateOfBirth: '',
          gender: '',
          role: 'student'
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
                isDisable={user?.role !== 'admin' && user?.role !== 'manager'}
                value={initData.school}
                onChange={e => {
                  onChangeSchool(e.value);
                  setFieldValue('schoolId', e.value)
                  setInitData({...initData, school: e})
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
                useFormik
              />
              <Select
                label='Khối'
                name='classGroup'
                useFormik
                onChange={e => {
                  onChangeGroup(e.value);
                  setFieldValue('classGroup', e.value)
                }}
                options={listGroup}
              />
              <Select
                label='Lớp'
                name='classId'
                useFormik
                onChange={e => setFieldValue('classId', e.value)}
                options={listClass}
              />
            </div>
            <div className='grid lg:grid-cols-2 gap-x-6'>
              <Input label='Họ và tên' name='fullName' useFormik onChange={handleChange}/>
              <Input label='Ngày sinh' name='dateOfBirth' useFormik onChange={handleChange}/>
            </div>
            <RadioGroup label='Giới Tính'>
              <label className='mr-4'>
                <Field className='mr-2' type="radio" name="gender" value="1"/>Nam
              </label>
              <label className='mr-4'>
                <Field className='mr-2' type="radio" name="gender" value="2"/>Nữ
              </label>
            </RadioGroup>
            <h3 className='mt-6'>Phụ Huynh</h3>
            <div className="grid lg:grid-cols-2 gap-x-6">
              <div className="form-group">
                <label>Nhập số điện thoại phụ huynh</label>
                <AsyncSelect
                  id="parent"
                  instanceId="parent"
                  cacheOptions
                  value={parentSelect}
                  loadOptions={loadOptions}
                  defaultOptions
                  onChange={e => setFieldValue('parent', handleParent(e))}
                />
              </div>
            </div>
            {!_.isEmpty(parents) ? (
              <div className="mt-4 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
                <div className='container-table w-[400px] lg:w-[49%]'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th className="w-3">STT</th>
                        <th className='text-left'>Họ tên</th>
                        <th className='text-left'>Phone</th>
                        <th className="w-2"/>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        _.uniq(parents)?.map((row, idz) => (
                          <tr key={idz}>
                            <td>{idz + 1}</td>
                            <td className='text-left'>{row.fullName}</td>
                            <td className='text-left'>{row.phoneNumber}</td>
                            <td>
                                 <a
                                   onClick={() => {
                                     const filtered = parents.filter(e => e.value !== row.value);
                                     setParents(filtered)
                                   }}
                                 >
                                   <TrashIcon className='h-5 w-5 inline cursor-pointer'/>
                                 </a>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            ) : ''}
            <div className='flex gap-x-4 mt-4'>
              <Button type='submit'>Thêm</Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
export default AddStudent;
