import {useEffect, useState} from "react";
import {Form, Formik} from "formik";
import {useRouter} from "next/router";
import * as Yup from "yup";
import _ from "lodash";
import swal from "sweetalert";

import Input from "@components/form/input";
import Radio, {RadioGroup} from "@components/form/radio";
import Button from "@components/button";
import Select from "@components/form/select";
import AsyncSelect from 'react-select/async';
import {classroomService, memberService, schoolService, schoolYearService} from "@services";
import {TrashIcon} from "@heroicons/react/outline";
import {useAuth} from "../../../context/auth";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Họ tên không được để trống')
    .min(5, 'Họ tên ít nhất là 5 ký tự')
    .max(50, 'Họ tên tối đa là 50 ký tự'),
  dateOfBirth: Yup.string().required('Ngày sinh không được để trống'),
  schoolYearId: Yup.string().required('Vui lòng chọn niên khóa'),
  parent: Yup.array().min(1, 'Vui lòng chọn phụ huynh').required(),
  schoolId: Yup.string().required('Vui lòng chọn trường.'),
  classId: Yup.string().required('Vui lòng chọn lớp.'),
});

const bodyMassSchema = Yup.object().shape({
  height: Yup.number()
    .required('Vui lòng nhập chiều cao.'),
  weight: Yup.number()
    .required('Vui lòng nhập cân nặng.'),
  // obstetric: Yup.string().required('Vui lòng chọn 1 trong 2'),
});

const DetailStudent = () => {
  const router = useRouter();
  const [member, setMember] = useState();
  const [listSchool, setListSchool] = useState();
  const {school, user} = useAuth();
  const [listSchoolYear, setListSchoolYear] = useState();
  const [listGroup, setListGroup] = useState();
  const [listClass, setListClass] = useState();
  const [initData, setInitData] = useState({
    school: {
      value: "",
      label: "",
    },
    schoolYear: {
      value: "",
      label: "",
    },
    classGroup: {
      value: "",
      label: "",
    },
    class: {
      value: "",
      label: "",
    }
  })

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
    return () => {};
  }, [router.isReady])

  const loadInit = async () => {
    const {id} = router.query;
    const memberRes = await memberService.detail(id);

    if (!memberRes) {
      swal('Thông tin này không tồn tại!!', '', 'error')
        .then(() => router.push('/hoc-sinh'));
    }
    setMember(memberRes);

    const initDataState = {
      school: {
        value: "",
        label: "",
      },
      schoolYear: {
        value: "",
        label: "",
      },
      classGroup: {
        value: "",
        label: "",
      },
    };

    const schools = await schoolService.list({limit: 100});
    if (schools.total) {
      const schoolOpts = schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      }));
      setListSchool(schoolOpts);
      console.log('school-opts', schoolOpts)
      console.log('member-res-school-working-school-id', memberRes.schoolWorking.schoolId)
      const schoolSelected = _.find(schoolOpts, {value: memberRes.schoolWorking?.schoolId});
      console.log('school-selected', schoolSelected)

      if (schoolSelected) {
        initDataState.school = schoolSelected;
        const schoolYears = await schoolYearService.list({schoolId: schoolSelected.value, limit: 100})

        if (schoolYears && schoolYears.total) {
          const schoolYearOpt = schoolYears.data.map((data) => ({
            value: data._id,
            label: data.schoolYearName,
          }));
          setListSchoolYear(schoolYearOpt);
          const schoolYearSelected = _.find(schoolYearOpt, {value: memberRes.schoolWorking?.schoolYearId});

          if (schoolYearSelected) {
            initDataState.schoolYear = schoolYearSelected;
            const clsGroup = await classroomService.listGroup({
              schoolYearId: memberRes.schoolWorking?.schoolYearId,
              limit: 100
            });

            if (clsGroup && clsGroup.total) {
              const clsGroupOpt = clsGroup.data.map((data) => ({
                value: data._id,
                label: data.className,
              }));
              setListGroup(clsGroupOpt);
              const clsGroupSelected = _.find(clsGroupOpt, {value: memberRes.schoolWorking?.classGroupId});
              if (clsGroupSelected) {
                initDataState.classGroup = clsGroupSelected;
                const listCls = await classroomService.list({parentId: clsGroupSelected.value})
                if (listCls && listCls.total) {
                  const listClsOpt = listCls.data.map((data) => ({
                    value: data._id,
                    label: data.className,
                  }));
                  setListClass(listClsOpt);
                  const clsSelected = _.find(listClsOpt, {value: memberRes.schoolWorking?.classId});
                  initDataState.class = clsSelected;
                }
              }
            }
          }
        }
      }
    }
    setInitData(initDataState);
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
    const {id} = router.query;
    const result = memberService.updateStudent(id, values);
    if (result) {
      swal({
        text: "Cập nhật thành công",
        icon: "success"
      });
    } else {
      swal({
        text: "Cập nhật không thành công",
        icon: "error"
      });
    }
  };

  const handleSubmitFormBodyMass = async (values) => {
    const {id} = router.query;
    const result = await memberService.update(id, {bodyMass: values});

    if (result) {
      swal({
        text: "Cập nhật thành công",
        icon: "success"
      });
    } else {
      swal({
        text: "Cập nhật không thành công",
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
          fullName: row.fullName,
          label: row.fullName + ' (' + row.phoneNumber + ')'
        }));
      }
    }
  };

  const handleParent = (...newParent) => {

    const currentParent = member.parent;

    const result = {...member, parent: _.uniq([...currentParent, ...newParent])}
    setMember(result)

    return result.parent.map((v) => ({
      parentId: v.value,
      fullName: v.fullName
    }))
  };

  return (
    <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex -mb-px">
            <li className="mr-2">
              <a href={`/hoc-sinh/${router.query.id}`}
                 className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 active text-primary border-primary"
                 aria-current="page">Hồ sơ</a>
            </li>
            <li className="mr-2">
              <a href={`/hoc-sinh/${router.query.id}/kham-suc-khoe`}
                 className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent hover:border-primary-light">Khám
                sức khỏe</a>
            </li>
            <li className="mr-2">
              <a href={`/hoc-sinh/${router.query.id}/khai-bao-y-te`}
                 className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent hover:border-primary-light">Khai
                báo Y Tế</a>
            </li>
            <li className="mr-2">
              <a href={`/hoc-sinh/${router.query.id}/tiem-chung`}
                 className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent hover:border-primary-light">Tiêm
                chủng</a>
            </li>
          </ul>
        </div>
        <div className="grid gap-4 lg:grid-cols-2 mt-6">
          <div className="form">
            <Formik
              validationSchema={validationSchema}
              onSubmit={handleSubmitForm}
              enableReinitialize
              initialValues={{
                schoolId: member ? member.schoolWorking?.schoolId : '',
                schoolYearId: member ? member.schoolWorking?.schoolYearId : '',
                classGroupId: member ? member.schoolWorking?.classGroupId : '',
                classId: member ? member.schoolWorking?.classId : '',
                // parent: '',
                // schoolname: 
                fullName: member ? member.fullName : '',
                dateOfBirth: member ? member.dateOfBirth : '',
                gender: member ? member.gender : 1,
                role: 'student'
              }}
            >
              {({
                  handleChange,
                  setFieldValue,
                  values,
                }) => (
                <Form>
                  <h3>Thông tin cá nhân</h3>
                  <Input
                    label='Tên Trường'
                    // isDisable={user.role !== 'admin'}
                    name='schoolId'
                    // onChange={e => {
                    //   onChangeSchool(e.value);
                    //   setFieldValue('schoolId', e.value);
                    //   setInitData({...initData, ...{school: e}});
                    // }}
                    onChange={handleChange}
                    value={school?.schoolname}
                    // value={{value: school?._id, label: school?.schoolname}}
                    // options={listSchool}
                  />

                  {/*<Select*/}
                  {/*  label='Tên Trường'*/}
                  {/*  isDisable={true}*/}
                  {/*  name='schoolId'*/}
                  {/*  onChange={e => {*/}
                  {/*    onChangeSchool(e.value);*/}
                  {/*    setFieldValue('schoolId', e.value);*/}
                  {/*    setInitData({...initData, ...{school: e}});*/}
                  {/*  }}*/}
                  {/*  value={{value: school?._id, label: school?.schoolname}}*/}
                  {/*  options={listSchool}*/}
                  {/*/>*/}

                  <Select
                    label='Niên khoá'
                    name='schoolYearId'
                    onChange={e => {
                      onChangeSchoolYear(e.value);
                      setFieldValue('schoolYearId', e.value);
                      setInitData({...initData, ...{schoolYear: e}});
                    }}
                    options={listSchoolYear}
                    value={initData.schoolYear}
                    useFormik='true'
                  />
                  <Select
                    label='Khối'
                    name='classGroupId'
                    useFormik='true'
                    onChange={e => {
                      onChangeGroup(e.value);
                      setFieldValue('classGroupId', e.value);
                      setInitData({...initData, ...{classGroup: e}});
                    }}
                    value={initData.classGroup}
                    options={listGroup}
                  />
                  <Select
                    label='Lớp'
                    name='classId'
                    useFormik='true'
                    onChange={e => {
                      setFieldValue('classId', e.value);
                      setInitData({...initData, ...{class: e}});
                    }}
                    options={listClass}
                    value={initData.class}
                  />
                  <Input label='Họ và tên' name='fullName' useFormik onChange={handleChange} value={values.fullName}/>
                  <Input label='Ngày sinh' name='dateOfBirth' useFormik onChange={handleChange}
                         value={values.dateOfBirth}/>
                  <RadioGroup label='Giới Tính'>
                    <Radio name='gender' onChange={handleChange} checked={parseInt(values.gender) === 1} value='1'
                           labelName="Nam" id="sex-male"/>
                    <Radio name='gender' onChange={handleChange} checked={parseInt(values.gender) === 2} value='2'
                           labelName="Nữ" id='sex-female'/>
                  </RadioGroup>
                  <div className="">
                    <div className="form-group">
                      <h3 className='mt-6'>Phụ Huynh</h3>
                      <AsyncSelect
                        id="parent"
                        instanceId="parent"
                        cacheOptions
                        loadOptions={loadOptions}
                        defaultOptions
                        onChange={e => setFieldValue('parent', handleParent(e))}
                      />
                      {/*<div className='text-danger mt-[5px]'>*/}
                      {/*  <ErrorMessage name='parent'/>*/}
                      {/*</div>*/}
                    </div>
                  </div>
                  {!_.isEmpty(member?.parent) ? (
                    <div className="mt-4 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
                      <div className='container-table lg:w-full'>
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
                              member.parent?.map((row, idz) => (
                                <tr key={idz}>
                                  <td>{idz + 1}</td>
                                  <td className='text-left'>{row?.fullName}</td>
                                  <td className='text-left'>{row?.phoneNumber}</td>
                                  <td>
                                   <a
                                     onClick={() => {
                                       const filtered = member.parent.filter(e => e.value !== row.value);
                                       setMember({...member, parent: filtered})
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
                  <div className="mt-6">
                    <Button type='submit'>Cập nhật thông tin</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="form">
            <Formik
              validationSchema={bodyMassSchema}
              onSubmit={handleSubmitFormBodyMass}
              enableReinitialize
              initialValues={{
                height: member && member.bodyMass ? member.bodyMass.height : '',
                weight: member && member.bodyMass ? member.bodyMass.weight : '',
                obstetric: member && member.bodyMass ? member.bodyMass.obstetric : 'normal',
                note: member && member.bodyMass ? member.bodyMass.note : '',
              }}
            >
              {({handleChange, values,}) => (
                <Form>
                  <h3>Thể trạng</h3>
                  <Input label='Chiều cao (cm)' name='height' useFormik onChange={handleChange} value={values.height}/>
                  <Input label='Cân nặng (kg)' name='weight' useFormik onChange={handleChange} value={values.weight}/>
                  <RadioGroup label='Sản khoa'>
                    <Radio name='obstetric' checked={values.obstetric === 'normal'} onChange={handleChange}
                           value='normal' labelName="Bình thường" id="obstetric-1"/>
                    <Radio name='obstetric' checked={values.obstetric === 'gotsick'} onChange={handleChange}
                           value='gotsick' labelName="Mẹ mắc bệnh khi mang thai" id='obstetric-2'/>
                  </RadioGroup>
                  <div className='form-textarea-input'>
                    <label htmlFor="note">Các bệnh đang điều trị:</label>
                    <textarea rows="3" name="note" value={values.note} onChange={handleChange}/>
                  </div>
                  <div className="mt-6">
                    <Button type='submit'>Cập nhật thông tin</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailStudent;


