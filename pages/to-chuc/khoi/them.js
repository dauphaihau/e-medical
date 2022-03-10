import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import * as Yup from "yup";
import swal from "sweetalert";
import Link from "next/link";

import {Formik, Form} from "formik";
import Input from "@components/form/input";
import Button from "@components/button";
import Select from "@components/form/select";
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
  const [listSchool, setListSchool] = useState([]);
  const [listSchoolYear, setListSchoolYear] = useState([])

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady]);

  const loadInit = async () => {
    const schools = await schoolService.list({limit: 100});
    if (schools.total) {
      setListSchool(schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      })));
    }
  }

  const handleSubmitForm = async (data) => {
    const result = await classroomService.createGroup(data);
    if(result){
      swal({
        text: "Thêm mới thành công",
        icon: "success"
      })
        .then(() => router.push('/to-chuc/khoi/'));
    }
    else{
      swal({
        text: "Thêm mới không thành công",
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
        className: '',
        schoolId: '',
        schoolYearId: '',
        parentId: null,
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
              name='schoolId'
              onChange={e => {
                onChangeSchool(e.value);
                setFieldValue('schoolId', e.value);
              }}
              options={listSchool}
              placeholder='Chọn trường'
              useFormik='true'
            />
            <Select
              label='Niên khoá'
              name='schoolYearId'
              onChange={e => setFieldValue('schoolYearId', e.value)}
              options={listSchoolYear}
              placeholder='Chọn niên khoá'
              useFormik='true'
            />
            <Input
              name='className'
              label='Tên khối'
              onChange={handleChange}
              useFormik='true'
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
