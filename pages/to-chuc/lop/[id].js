import {Formik, Form} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import swal from "sweetalert";
import Link from "next/link";
import _ from 'lodash';

import Select from "@components/form/select";
import Input from "@components/form/input";
import Button from "@components/button";
import {classroomService, schoolService, schoolYearService} from "@services";

const validationSchema = Yup.object().shape({
  className: Yup.string()
    .required('Tên lớp không được để trống')
    .min(5, 'Tên lớp ít nhất là 5 ký tự')
    .max(50, 'Tên lớp tối đa là 50 ký tự'),
  schoolYearId: Yup.string().required('Vui lòng chọn niên khóa'),
  parentId: Yup.string().required('Vui lòng chọn khối.'),
  schoolId: Yup.string().required('Vui lòng chọn trường.'),
});

const DetailClassroom = () => {

  const router = useRouter();
  const [classRoom, setClassRoom] = useState();
  const [listSchool, setListSchool] = useState();
  const [listSchoolYear, setListSchoolYear] = useState();
  const [listGroup, setListGroup] = useState();
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
  })

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady])

  const loadInit = async () => {
    const {id} = router.query;
    const cls = await classroomService.detail(id);
    if(cls){
      setClassRoom(cls);
    }
    else{
      swal('Thông tin này không tồn tại!!', '', 'error')
        .then(() => router.push('/to-chuc/lop/'));
    }
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
      const schoolSelected = _.find(schoolOpts, {value: cls.schoolId});
      if(schoolSelected){
        initDataState.school = schoolSelected;
        const schoolYears = await schoolYearService.list({schoolId: schoolSelected.value, limit: 100})
        if (schoolYears && schoolYears.total) {
          const schoolYearOpt = schoolYears.data.map((data) => ({
            value: data._id,
            label: data.schoolYearName,
          }));
          setListSchoolYear(schoolYearOpt);
          const schoolYearSelected = _.find(schoolYearOpt, {value: cls.schoolYearId});
          if(schoolYearSelected){
            initDataState.schoolYear = schoolYearSelected;

            const clsGroup = await classroomService.listGroup({schoolYearId: cls.schoolYearId, limit: 100});
            if (clsGroup && clsGroup.total) {
              const clsGroupOpt = clsGroup.data.map((data) => ({
                value: data._id,
                label: data.className,
              }));
              setListGroup(clsGroupOpt);
              const clsGroupSelected = _.find(clsGroupOpt, {value: cls.parentId});
              if(clsGroupSelected){
                initDataState.classGroup = clsGroupSelected;
              }
            }
          }
        }
      }
      setInitData(initDataState);
    }
  }

  const handleSubmitForm = async (values) => {
    const {id} = router.query;
    const result = await classroomService.update(id, values)
    if(result){
      swal({
        text: "Cập nhật thành công",
        icon: "success"
      })
        .then(() => router.push('/to-chuc/lop/'));
    }
    else{
      swal({
        text: "Cập nhật không thành công",
        icon: "error"
      });
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
    const clsGrp = await classroomService.listGroup({schoolYearId, limit: 100});
    if (clsGrp.total) {
      setListGroup(clsGrp.data.map((data) => ({
        value: data._id,
        label: data.className,
      })));
    }
  }

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
        enableReinitialize
        initialValues={{
          className: classRoom?classRoom?.className : '',
          schoolYearId: classRoom?classRoom?.schoolYearId:'',
          schoolId: classRoom?classRoom?.schoolId:'',
          parentId: classRoom?classRoom?.parentId:'',
        }}
      >
        {({
            handleChange,
            setFieldValue,
            values,
          }) => (
          <Form className='form lg:w-1/2'>
            <h3>Thêm mới lớp học</h3>
            <div>
              <Select
                label='Tên Trường'
                name='schoolId'
                useFormik='true'
                onChange={e => {
                  onChangeSchool(e.value);
                  setFieldValue('schoolId', e.value)
                }}
                value={initData.school}
                options={listSchool}
              />
              <Select
                label='Niên khoá trường'
                name='schoolYearId'
                onChange={e => {
                  onChangeSchoolYear(e.value);
                  setFieldValue('schoolYearId', e.value)
                }}
                options={listSchoolYear}
                value={initData.schoolYear}
                useFormik='true'
              />
              <Select
                label='Khối'
                name='parentId'
                useFormik='true'
                onChange={e => setFieldValue('parentId', e.value)}
                options={listGroup}
                value={initData.classGroup}
              />
              <Input
                label='Tên lớp'
                name='className'
                onChange={handleChange}
                useFormik='true'
                value={values.className}
              />
            </div>
            <div className='py-4'>
              <Button type='submit' className='mr-4'>Cập nhật</Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default DetailClassroom;