import {Formik, Form} from "formik";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import * as Yup from "yup";
import swal from "sweetalert";
import Link from "next/link";

import Input from "@components/form/input";
import Button from "@components/button";
import Select from "@components/form/select";
import Layout from "@components/layout";
import schoolYearService from "@services/organize/school-year";
import {classroomService} from "@services";

const validationSchema = Yup.object().shape({
  className: Yup.string().required('Tên khối không được để trống').max(50, 'Tên khối tối đa là 50 ký tự').min(5, 'Tên khối phải ít nhất 5 ký tự'),
  schoolYearId: Yup.string().required('Niên khoá không được để trống'),
  schoolId: Yup.string().required('Tên trường không được để trống'),
});

const DetailGroup = () => {

  const router = useRouter();
  const [listSchool, setListSchool] = useState();
  const [schoolYear, setSchoolYear] = useState([])

  useEffect(() => {
    if (!router.isReady) return;
    let abortController = new AbortController();

    loadInit();
    return () => abortController.abort();
  }, [router.isReady, router.asPath]);

  const loadInit = async () => {

    // return []
    // const schools = await classroomService.list({schoolId: router.query.id, type: 'group'});

    // return []
    const schools = await classroomService.list({schoolId: router.query.id});

    console.log('schools', schools);

    if (schools.total) {
      setListSchool(schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      })));
    }
  }

  const handleSubmitForm = async (values) => {
    console.log('values', values);
    try {
      await classroomService.update(router.query.id, values)
      swal({
        text: "Cập nhật khối thành công",
        icon: "success"
      })
      router.back()
    } catch ({response}) {
      console.log(response);
      if (response.data.message) {
        swal({
          text: "Niên khoá này đã có khối, vui lòng tạo khối niên khoá khác",
          icon: "error"
        })
      }
    }
  };

  const onChangeSchool = async (idSchool) => {
    const schoolY = await schoolYearService.list({schoolId: idSchool})
    if (schoolY.total) {
      setSchoolYear(schoolY.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      })));
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        className: '',
        schoolId: '',
        schoolYearId: '',
        parentId: null,
        status: 1
      }}
    >
      {({
          handleChange,
          setFieldValue,
          values
        }) => (
        <Form className='form lg:w-1/4'>
          <h3>Thông tin chi tiết khối</h3>
          <div>
            <Select
              label='Tên trường'
              name='schoolId'
              onChange={e => {
                onChangeSchool(e.value);
                setFieldValue('schoolId', e.value);
              }}
              options={listSchool}
              placeholder='Chọn trường'
              usefokmik='true'
            />
            <Select
              label='Niên khoá'
              name='schoolYearId'
              onChange={e => setFieldValue('schoolYearId', e.value)}
              options={schoolYear}
              placeholder='Chọn niên khoá'
              usefokmik='true'
            />
            <Input
              name='className'
              label='Tên khối'
              onChange={handleChange}
              useFokmik='true'
              value={values.className}
            />
          </div>
          <div className='py-4'>
            <Button type='submit' className='mr-4'>Cập nhật</Button>
            <Link href='/to-chuc/khoi'>
              <a><Button type='text'>Huỷ</Button></a>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default DetailGroup;

DetailGroup.getLayout = (page) => <Layout>{page}</Layout>;