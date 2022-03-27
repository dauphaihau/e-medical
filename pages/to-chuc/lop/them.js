import {Formik, Form} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import swal from "sweetalert";
import Link from "next/link";

import Select from "@components/form/select";
import Input from "@components/form/input";
import Button from "@components/button";
import {classroomService, schoolYearService} from "@services";
import {useAuth} from "../../../context/auth";
import _ from "lodash";
import {schoolService} from "../../../services";

const validationSchema = Yup.object().shape({
  schoolId: Yup.string().required('Vui lòng chọn khối.'),
  schoolYearId: Yup.string().required('Vui lòng chọn khối.'),
  parentId: Yup.string().required('Vui lòng chọn khối.'),
  className: Yup.string()
    .required('Tên lớp không được để trống')
    .min(5, 'Tên lớp ít nhất là 5 ký tự')
    .max(50, 'Tên lớp tối đa là 50 ký tự'),
});


const AddClassroom = () => {
  const router = useRouter();
  const {user} = useAuth();
  const [listSchoolYear, setListSchoolYear] = useState([])
  const [listGroup, setListGroup] = useState([])
  const [listSchool, setListSchool] = useState([]);
  const [initData, setInitData] = useState({
    school: {},
    schoolYear: {},
    classGroup: {},
  });

  const [groupSelected, setGroupSelected] = useState()

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady, router.asPath])

  const loadInit = async () => {    
    let initDataSelected = {};
    const schools = await schoolService.list({limit: 100});
    if (schools.total) {
      const schoolOptions = schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      }))
      setListSchool(schoolOptions);
      if (user?.role !== 'admin'){
        const initSchool = _.find(schoolOptions, {value: user.schoolWorking?.schoolId});
        initDataSelected.school = initSchool;
        if(initSchool) onChangeSchool(initSchool.value)
      }
    }
    setInitData(initDataSelected);
  }

  const handleSubmitForm = async (values) => {
    const result = await classroomService.create(values)
    swal({
      title: result.message,
      icon: result.status?"success":"error"
    })
      .then(() => (result.status || result.statusCode === 403) && router.push('/to-chuc/lop'))
  };

  const onChangeSchool = async (e) => {
    const schoolYear = await schoolYearService.list({schoolId: e.value})
    if (schoolYear) {
      const schoolYearOptions = schoolYear.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      }));
      setListSchoolYear(schoolYearOptions);
    }
  };

  const onChangeSchoolYear = async (e) => {
    const clsGroup = await classroomService.listGroup({schoolYearId: e.value})
    if (clsGroup.status && clsGroup.total) {
      const clsGroupOtps = clsGroup.data.map((data) => ({
        value: data._id,
        label: data.className,
      }));
      setListGroup(clsGroupOtps);
    }
  };

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
        enableReinitialize
        initialValues={{
          schoolId: initData.school?.value,
          schoolYearId: '',
          className: '',
          parentId: '',
        }}
      >
        {({handleChange, setFieldValue,}) => (
          <Form className='form lg:w-1/2'>
            <h3>Thêm mới lớp học</h3>
            <div>
              <Select
                label='Tên Trường'
                name='schoolId'
                isDisable={user.role !== 'admin'}
                options={listSchool}
                value={initData.school}
                onChange={(e) => {
                  onChangeSchool(e);
                  setFieldValue('schoolId', e.value);
                  setFieldValue('schoolYearId', '');
                  setFieldValue('parentId', '');
                }}
                useFormik
              />
              <Select
                label='Niên khoá trường'
                name='schoolYearId'
                options={listSchoolYear}
                onChange={(e) => {
                  onChangeSchoolYear(e);
                  setFieldValue('schoolYearId', e.value);
                  setFieldValue('parentId', '');
                }}
                useFormik
              />
              <Select
                label='Khối'
                name='parentId'
                useFormik
                value={initData.classGroup}
                onChange={e => {
                  setFieldValue('parentId', e.value);
                  setInitData({...initData, ...{classGroup:e}})
                }}
                options={listGroup}
              />
              <Input
                label='Tên lớp'
                name='className'
                onChange={handleChange}
                useFormik
              />
            </div>
            <div className='py-4'>
              <Button type='submit' className='mr-4'>Thêm</Button>
              <Link href='/to-chuc/lop'>
                <a><Button type='text'>Huỷ</Button></a>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddClassroom;