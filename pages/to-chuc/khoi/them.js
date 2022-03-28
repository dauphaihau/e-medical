import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import * as Yup from "yup";
import swal from "sweetalert";
import Link from "next/link";

import {Formik, Form} from "formik";
import Input from "@components/form/input";
import Button from "@components/button";
import Select from "@components/form/select";
import {classroomService, schoolYearService} from "@services";
import {useAuth} from "../../../context/auth";
import _ from "lodash";
import {schoolService} from "../../../services";

const validationSchema = Yup.object().shape({
  className: Yup.string()
    .required('Tên khối không được để trống')
    .max(50, 'Tên khối tối đa là 50 ký tự')
    .min(5, 'Tên khối phải ít nhất 5 ký tự'),
  schoolYearId: Yup.string().required('Vui lòng chọn niên khóa'),
});

const AddGroup = () => {
  const router = useRouter();
  const {user} = useAuth();
  const [listSchoolYear, setListSchoolYear] = useState([])
  const [listSchool, setListSchool] = useState([]);
  const [initData, setInitData] = useState({
    school: {},
    schoolYear: {},
  });

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady]);

  const loadInit = async () => {
    let initDataSelected = {};
    const schools = await schoolService.list({limit: 100});
    if (schools.total) {
      const schoolOptions = schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      }))
      setListSchool(schoolOptions);
      if(user && user?.role !== 'admin'){
        const initSchool = _.find(schoolOptions, {value: user.schoolWorking[0]?.schoolId});
        initDataSelected.school = initSchool;
        if(!_.isEmpty(initSchool)) onChangeSchool(initSchool.value);
      }
    }
    setInitData(initDataSelected);
  }

  const onChangeSchool = async (e) => {
    const schoolYear = await schoolYearService.list({schoolId: e.value})
    if (schoolYear) {
      const schoolYearOptions = schoolYear.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      }));
      setListSchoolYear(schoolYearOptions)
      // const initSchoolYear = _.find(schoolYearOptions, {value: user.schoolWorking?.schoolYearId});
    }
  };

  const handleSubmitForm = async (data) => {
    const result = await classroomService.createGroup(data);
    swal({
      title: result.message,
      icon: result.status?"success":"error"
    })
      .then(() => (result.status || result.statusCode === 403) && router.push('/to-chuc/khoi'))
  };

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        className: '',
        schoolId: initData.school?.value,
        schoolYearId: '',
        status: 1
      }}
    >
      {({
          handleChange,
          setFieldValue
        }) => (
        <Form className='form lg:w-1/2'>
          <h3>Thêm khối</h3>
          <div>
            <Select
              label='Tên trường'
              placeholder='Chọn trường'
              name='schoolId'
              options={listSchool}
              isDisable={user && user.role !== 'admin'}
              value={initData.school}
              onChange={(e) => {
                onChangeSchool(e);
                setFieldValue('schoolId', e.value);
              }}
            />
            <Select
              label='Niên khoá'
              name='schoolYearId'
              options={listSchoolYear}
              placeholder='Chọn niên khoá'
              onChange={(e) => {
                setFieldValue('schoolYearId', e.value);
              }}
              useFormik
            />
            <Input
              name='className'
              label='Tên khối'
              onChange={handleChange}
              useFormik
            />
          </div>
          <div className='py-4'>
            <Button type='submit' className='mr-4'>Thêm</Button>
            <Link href='/to-chuc/khoi'>
              <a><Button type='text'>Huỷ</Button></a>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddGroup;
