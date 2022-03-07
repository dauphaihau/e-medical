import {Formik, Form} from "formik";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import * as Yup from "yup";
import swal from "sweetalert";

import Select from "@components/form/select";
import Input from "@components/form/input";
import Button from "@components/button";
import Layout from "@components/layout";
import schoolYearService from "@services/organize/school-year";
import {schoolService} from "@services";

const validationSchema = Yup.object().shape({
  schoolYearName: Yup.string().required('Tên niên khoá trường không được để trống'),
  schoolId: Yup.string().required('Mã trường không được để trống'),
});

const AddSchoolYear = () => {

  const [listSchool, setListSchool] = useState();
  const router = useRouter();

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

  const handleSubmitForm = async (dataSchoolYear) => {
    try {
      await schoolYearService.create(dataSchoolYear)
      swal({
        text: "Tạo Niên Khoá thành công",
        icon: "success"
      })
      router.back();
    } catch ({response}) {
      console.log(response);
      if (response.data.message === 'account existed') {
        swal({
          text: "Trường này đã có niên khoá",
          icon: "error"
        })
      }
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
        // keThuaDuLieu: '',
        // thoiGianBatDau: '',
        // thoiGianKetThuc: '',
        status: 1,
      }}
    >
      {({
          handleChange,
          setFieldValue
        }) => (
        <Form className='form lg:w-2/5'>
          <h3>Thêm niên khoá</h3>
          {/*<div className='flex flex-wrap gap-x-4 lg:grid-container'>*/}
          <div className=''>
            <Select
              label='Tên trường'
              name='schoolId'
              onChange={e => setFieldValue('schoolId', e.value)}
              options={listSchool}
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
            <Button onClick={() => router.back()}>Huỷ</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddSchoolYear;

AddSchoolYear.getLayout = (page) => <Layout>{page}</Layout>;