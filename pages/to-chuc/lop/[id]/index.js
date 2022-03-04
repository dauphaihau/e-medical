import {Formik, Form} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import swal from "sweetalert";
import Link from "next/link";

import Select from "../../../../components/form/select";
import Input from "../../../../components/form/input";
import Button from "../../../../components/button";
import Layout from "../../../../components/layout";
import {classroomService, schoolService} from "../../../../services";
import schoolYearService from "../../../../services/organize/school-year";

const validationSchema = Yup.object().shape({
  className: Yup.string().required('Tên lớp không được để trống').min(5, 'Tên lớp ít nhất là 5 ký tự').max(50, 'Tên lớp tối đa là 50 ký tự'),
  schoolYearId: Yup.string().required('niên khoá trường không được để trống'),
  schoolId: Yup.string().required('trường không được để trống'),
});

const DetailClassroom = () => {

  const router = useRouter();
  const [listSchool, setListSchool] = useState();
  const [listSchoolYear, setListSchoolYear] = useState()
  const [listGroup, setListGroup] = useState()

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady, router.asPath])

  const loadInit = async () => {
    const schools = await schoolService.list({limit: 20});
    console.log(schools);
    if (schools.total) {
      setListSchool(schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      })));
    }

    const schoolYear = await schoolYearService.list({limit: 20});
    if (schoolYear.total) {
      setListSchoolYear(schoolYear.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      })));
    }

    const group = await classroomService.list({type: 'class'});
    console.log('group', group);

    if (group.total) {
      setListGroup(group.data.map((data) => ({
        value: data._id,
        label: data.className,
      })));
    }
  }

  const handleSubmitForm = async (values) => {
    console.log('values', values);
    try {
      await classroomService.update(values)
      swal({
        text: "Tạo khối thành công",
        icon: "success"
      })
      router.back()
    } catch ({response}) {
      console.log(response);
      if (response.data.message) {
        swal({
          text: "Khối này đã có lớp rồi, vui lòng tạo lớp khác",
          icon: "error"
        })
      }
    }
  };

  const onChangeSchool = async (idSchool) => {
    const schoolY = await schoolYearService.list({schoolId: idSchool})
    if (schoolY.total) {
      setListSchoolYear(schoolY.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      })));
    }
  };

  const onChangeGroup = async (idSchool) => {
    const group = await classroomService.list({schoolId: idSchool, type: 'class'})
    console.log('group', group);
    if (group.total) {
      setListGroup(group.data.map((data) => ({
        value: data._id,
        label: data.className,
      })));
    }
  };

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
        enableReinitialize
        initialValues={{
          className: '',
          schoolYearId: '',
          schoolId: '',
          parentId: '',
          status: 1
        }}
      >
        {({
            handleChange,
            setFieldValue
          }) => (
          <Form className='form lg:w-1/4'>
            <h3>Thêm mới lớp học</h3>
            <div>
              <Select
                label='Tên Trường *'
                name='schoolId'
                useFormik='true'
                onChange={e => {
                  onChangeSchool(e.value);
                  onChangeGroup(e.value);
                  setFieldValue('schoolId', e.value)
                }}
                options={listSchool}
              />
              <Select
                label='Niên khoá trường *'
                name='schoolYearId'
                onChange={e => setFieldValue('schoolYearId', e.value)}
                options={listSchoolYear}
                useFormik='true'
              />
              <Select
                label='Khối'
                name='parentId'
                useFormik='true'
                onChange={e => setFieldValue('parentId', e.value)}
                options={listGroup}
              />
              <Input
                label='Tên lớp *'
                name='className'
                onChange={handleChange}
                useFormik='true'
              />
            </div>
            <div className='py-4'>
              <Button type='submit' className='mr-4'>Cập nhật</Button>
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

export default DetailClassroom;

DetailClassroom.getLayout = (page) => <Layout>{page}</Layout>;