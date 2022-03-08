import {Formik, Form, Field} from "formik";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import * as Yup from "yup";
import swal from "sweetalert";

import Select from "@components/form/select";
import Input from "@components/form/input";
import Button from "@components/button";
import Layout from "@components/layout";
import { schoolService, schoolYearService } from "@services";

const validationSchema = Yup.object().shape({
  schoolYearName: Yup.string().required('Vui lòng nhập tên niên khóa.'),
  schoolId: Yup.string().required('Vui lòng chọn trường.'),
});

const AddSchoolYear = () => {

  const [listSchool, setListSchool] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    let abortController = new AbortController();

    loadInit();
    return () => abortController.abort();
  }, [router.isReady, router.asPath]);

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
    const result = await schoolYearService.create(data);
    if(result){
      swal({
        text: "Tạo Niên Khoá thành công",
        icon: "success"
      })
        .then(() => router.push('/to-chuc/nien-khoa/'));
    }
    else{
      swal({
        text: "Tạo Niên Khoá không thành công",
        icon: "error"
      });
    }
    
  };

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolYearName: '',
        schoolId: '',
      }}
    >
      {({
          handleChange,
          setFieldValue,
        }) => (
        <Form className='form lg:w-1/2'>
          <h3>Thêm niên khoá</h3>
          <div>
            <Select
              label='Tên trường'
              name='schoolId'
              onChange={e => setFieldValue('schoolId', e.value)}
              options={listSchool}
              useFormik={true}
              placeholder='Chọn trường'
            />
            <Input
              name='schoolYearName' label='Niên khoá trường *'
              useFormik='true'
              onChange={handleChange}
            />
          </div>
          <div className='my-4'>
            <Button className='mr-4' type='submit'>Thêm</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddSchoolYear;
