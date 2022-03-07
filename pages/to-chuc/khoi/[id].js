import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import * as Yup from "yup";
import swal from "sweetalert";
import Link from "next/link";

import _ from "lodash";
import {Formik, Form} from "formik";
import Input from "@components/form/input";
import Button from "@components/button";
import Select from "@components/form/select";
import Layout from "@components/layout";
import {classroomService, schoolService, schoolYearService} from "@services";


const validationSchema = Yup.object().shape({
  className: Yup.string()
    .required('Tên khối không được để trống')
    .max(50, 'Tên khối tối đa là 50 ký tự')
    .min(5, 'Tên khối phải ít nhất 5 ký tự'),
  schoolYearId: Yup.string().required('Niên khoá không được để trống'),
  schoolId: Yup.string().required('Tên trường không được để trống'),
});

const AddGroup = () => {
  const router = useRouter();
  const [classGroup, setClassGroup] = useState();
  const [listSchool, setListSchool] = useState([]);
  const [listSchoolYear, setListSchoolYear] = useState([])
  const [initData, setInitData] = useState({
    school: {
      value: "",
      label: "",
    },
    schoolYear: {
      value: "",
      label: "",
    }
  })

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady]);

  const loadInit = async () => {
    const { id } = router.query;
    const clsGroup = await classroomService.detailGroup(id);
    if(clsGroup){
      setClassGroup(clsGroup);
    }
    else{
      swal('Thông tin này không tồn tại!!', '', 'error')
        .then(() => router.push('/to-chuc/khoi/'));
    }

    const schools = await schoolService.list({limit: 100});
    const initDataState = {
      school: {
        value: "",
        label: "",
      },
      schoolYear: {
        value: "",
        label: "",
      }
    };
    if (schools.total) {
      const schoolOpts = schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      }));
      setListSchool(schoolOpts);
      const schoolSelected = _.find(schoolOpts, {value: clsGroup.schoolId});
      if(schoolSelected){
        initDataState.school = schoolSelected;
        const schoolYears = await schoolYearService.list({schoolId: schoolSelected.value, limit: 100})
        if (schoolYears && schoolYears.total) {
          const schoolYearOpt = schoolYears.data.map((data) => ({
            value: data._id,
            label: data.schoolYearName,
          }));
          setListSchoolYear(schoolYearOpt);
          const schoolYearSelected = _.find(schoolYearOpt, {value: clsGroup.schoolYearId});
          if(schoolYearSelected){
            initDataState.schoolYear = schoolYearSelected;
          }
        }
      }
    }
    setInitData(initDataState);
  }

  const handleSubmitForm = async (data) => {
    const { id } = router.query;
    const result = await classroomService.updateGroup(id, data);
    if(result){
      swal({
        text: "Cập nhật thành công",
        icon: "success"
      })
        .then(() => router.push('/to-chuc/khoi/'));
    }
    else{
      swal({
        text: "Cập nhật không thành công",
        icon: "error"
      });
    }
  };

  const onChangeSchool = async (idSchool) => {
    const schoolYears = await schoolYearService.list({schoolId: idSchool, limit: 100})
    if (schoolYears && schoolYears.total) {
      setListSchoolYear(schoolYears.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      })));
    }
    else{
      setListSchoolYear();
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        className: classGroup?classGroup?.className:'',
        schoolId: classGroup?classGroup?.schoolId:'',
        schoolYearId: classGroup?classGroup?.schoolYearId:'',
      }}
    >
      {({
          handleChange,
          setFieldValue,
          values,
        }) => (
        <Form className='form lg:w-1/2'>
          <h3>Chỉnh Sửa Khối</h3>
          <div>
            <Select
              label='Tên trường'
              name='schoolId'
              onChange={e => {
                onChangeSchool(e.value);
                setInitData({
                  school:e,
                  schoolYear: {
                    value: "",
                    label: "",
                  }
                });
                setFieldValue('schoolId', e.value);
              }}
              options={listSchool}
              value={initData.school}
              placeholder='Chọn trường'
              useFormik='true'
            />
            <Select
              label='Niên khoá'
              name='schoolYearId'
              onChange={e => {
                setInitData({...initData, ...{schoolYear:e}})
                setFieldValue('schoolYearId', e.value)
              }}
              options={listSchoolYear}
              value={initData.schoolYear}
              placeholder='Chọn niên khoá'
              useFormik='true'
            />
            <Input
              name='className'
              label='Tên khối'
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
  );
}

export default AddGroup;