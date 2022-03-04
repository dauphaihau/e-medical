import {Formik, Form} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import swal from "sweetalert";
import Link from "next/link";

import Input from "../../../../components/form/input";
import Button from "../../../../components/button";
import Select from "../../../../components/form/select";
import Layout from "../../../../components/layout";
import {classroomService, schoolService} from "../../../../services";
import schoolYearService from "../../../../services/organize/school-year";

const validationSchema = Yup.object().shape({
  className: Yup.string().required('Tên khối không được để trống').max(50, 'Tên khối tối đa là 50 ký tự').min(5, 'Tên khối phải ít nhất 5 ký tự'),
  schoolYearId: Yup.string().required('Niên khoá không được để trống'),
  schoolId: Yup.string().required('Tên trường không được để trống'),
});

const AddGroup = () => {

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
    const schools = await schoolService.list({limit: 20});
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
      await classroomService.create(values)
      swal({
        text: "Tạo khối thành công",
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
    console.log(idSchool);

    const {...response} = await schoolYearService.list()
    console.log('all-School-year', response.data);

    const classroom = await classroomService.list({idSchool});
    console.log('classroom', classroom);

    // const schoolYear = await schoolYearService.detail(idSchool);
    // console.log('school-year', schoolYear);
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
        status: '1'
      }}
    >
      {({
          handleChange,
          setFieldValue
        }) => (
        <Form className='form lg:w-1/4'>
          <h3>Thiết lập khối</h3>
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
            />
            <Select
              label='Niên khoá'
              name='schoolYearId'
              onChange={e => setFieldValue('schoolYearId', e.value)}
              options={schoolYear}
              placeholder='Chọn niên khoá'
            />
            <Input
              name='className'
              label='Tên khối'
              onChange={handleChange}
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

AddGroup.getLayout = (page) => <Layout>{page}</Layout>;
