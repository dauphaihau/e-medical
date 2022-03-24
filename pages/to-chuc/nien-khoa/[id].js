import {Formik, Form} from "formik";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import swal from "sweetalert";
import Link from "next/link";
import * as Yup from "yup";
import _ from 'lodash';

import Button from "@components/button";
import Input from "@components/form/input";
import Layout from "@components/layout";
import Select from "@components/form/select";
import {schoolYearService} from "@services";
import {schoolService} from "@services";

const validationSchema = Yup.object().shape({
  schoolYearName: Yup.string().required('Tên niên khoá trường không được để trống'),
  schoolId: Yup.string().required('Vui lòng chọn trường.'),
});

const DetailSchoolYear = () => {
  const router = useRouter();
  const [schoolYear, setSchoolYear] = useState();
  const [listSchool, setListSchool] = useState();
  const [schoolSelected, setSchoolSelected] = useState();

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady]);

  const loadInit = async () => {
    const {id} = router.query;
    const schoolRes = await schoolYearService.detail(id);
    if (schoolRes) {
      setSchoolYear(schoolRes);
    } else {
      swal('Thông tin này không tồn tại!!', '', 'error')
        .then(() => router.push('/to-chuc/nien-khoa/'));
    }
    const schools = await schoolService.list({limit: 100});
    if (schools.total) {
      const schoolOptions = schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      }));
      setListSchool(schoolOptions);
      const initSchool = _.find(schoolOptions, {value: schoolRes.schoolId});
      if (initSchool) {
        setSchoolSelected(initSchool);
      }
    }
  }

  const handleSubmitForm = async (data) => {
    const {id} = router.query;
    const result = await schoolYearService.update(id, data);
    if (result) {
      swal('Cập nhật thành công!', '', 'success')
        .then(() => router.push('/to-chuc/nien-khoa/'));
    } else {
      swal('Cập nhật không thành công!', '', 'error');
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolId: schoolYear ? schoolYear.schoolId : '',
        schoolYearName: schoolYear ? schoolYear.schoolYearName : '',
      }}
    >
      {({
          handleChange,
          setFieldValue,
          values
        }) => (
        <Form className='form'>
          <h3>Thông tin niên khoá</h3>
          <div>
            <Select
              label='Tên trường'
              name='schoolId'
              value={schoolSelected}
              onChange={e => {
                setSchoolSelected(e);
                setFieldValue('schoolId', e.value);
              }}
              options={listSchool}
              useFormik={true}
              placeholder='Chọn trường'
            />
            <Input
              name='schoolYearName' label='Niên khoá trường *'
              useFormik='true'
              onChange={handleChange}
              value={values.schoolYearName}
            />
          </div>
          <div className='mt-4'>
            <Button className='mr-4' type='submit'>Cập nhật</Button>
            <Link href='/to-chuc/nien-khoa'>
              <a><Button type='text'>Huỷ</Button></a>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  )
}
export default DetailSchoolYear;


