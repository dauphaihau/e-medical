import {Formik, Form} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";

import Input from "../../../../components/form/input";
import Button from "../../../../components/button";
import Select from "../../../../components/form/select";
import Layout from "../../../../components/layout";
import {classroomService, schoolService} from "../../../../services";
import {useRouter} from "next/router";
import schoolYearService from "../../../../services/organize/school-year";
import swal from "sweetalert";

const validationSchema = Yup.object().shape({
  className: Yup.string().required('Tên khối không được để trống'),
  schoolYearId: Yup.string().required('Niên khoá không được để trống'),
  schoolId: Yup.string().required('Tên trường không được để trống'),
});

const options = [
  {value: '2009-2010', label: '2009-2010'},
  {value: '2019-2012', label: '2009-2010'},
  {value: '2009-2012', label: '2009-2010'},
]

const AddGroup = () => {

  const router = useRouter();
  const [listSchool, setListSchool] = useState();
  const [schoolYear, setSchoolYear] = useState()
  
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
    } catch ({response}) {
      console.log(response);
    }
  };
  
  const onChangeSchool = async (value) => {
    console.log(value);
    // const classroom = await classroomService.list(value);
    const schoolYear = await schoolYearService.detail(value);
    console.log('school-year', schoolYear);
    // console.log('classroom', classroom);
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
        parentId: null
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
              options={options}
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
            <Button>Huỷ</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddGroup;

AddGroup.getLayout = (page) => <Layout>{page}</Layout>;
