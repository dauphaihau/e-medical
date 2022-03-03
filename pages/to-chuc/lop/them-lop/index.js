import {Formik, Form} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import swal from "sweetalert";

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

const options = [
  {value: 'A', label: 'A'},
  {value: 'B', label: 'B'},
  {value: 'C', label: 'C'},
]

const AddClassroom = () => {

  const router = useRouter();
  const [listSchool, setListSchool] = useState();
  const [listSchoolYear, setListSchoolYear] = useState()

  console.log('list-school', listSchool);

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady, router.asPath])


  const loadInit = async () => {

    const schools = await schoolService.list({limit: 20});
    if (schools.total) {
      setListSchool(schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      })));
    }


    const {...response} = await schoolYearService.detail(id);

    // setListSchoolYear(schoolsYear);
    // if (schoolsYear.total) {
    //   setListSchoolYear(schoolsYear.data.map((data) => ({
    //     value: data._id,
    //     label: data.schoolYearName,
    //   })));
    // }
  }

  const handleSubmitForm = async (data) => {
    console.log(data);
    try {
      await classroomService.create(data)
      swal({
        text: "Tạo lớp thành công",
        icon: "success",
      });
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
    <>
      <div className='mb-4 flex flex-col md:flex-row gap-4 w-1/2 md:w-full'>
        <Button variant='danger'>
          Tổng quan
        </Button>
        <Button variant='danger'>
          Danh sách học sinh
        </Button>
        <Button variant='danger'>
          Gửi thông tin
        </Button>
      </div>
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
                  setFieldValue('schoolId', e.value)}}
                options={listSchool}
              />
              <Select
                label='Niên khoá trường *'
                name='schoolYearId'
                onChange={e => setFieldValue('schoolYearId', e.value)}
                useFormik='true'
                options={listSchoolYear}
              />
              <Select
                label='Khối'
                name='parentId'
                useFormik='true'
                onChange={e => setFieldValue('parentId', e.value)}
                options={options}
              />
              <Input
                label='Tên lớp *'
                name='className'
                onChange={handleChange}
                useFormik='true'
              />
            </div>
            <div className='py-4'>
              <Button type='submit' className='mr-4'>Thêm</Button>
              <Button>Huỷ</Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddClassroom;

AddClassroom.getLayout = (page) => <Layout>{page}</Layout>;