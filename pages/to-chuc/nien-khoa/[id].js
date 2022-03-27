import {Formik, Form} from "formik";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import swal from "sweetalert";
import Link from "next/link";
import * as Yup from "yup";
import _ from 'lodash';

import Button from "@components/button";
import Input from "@components/form/input";
import Select from "@components/form/select";
import {schoolYearService} from "@services";
import {schoolService} from "@services";
import {useAuth} from "../../../context/auth";

const validationSchema = Yup.object().shape({
  schoolYearName: Yup.string().required('Tên niên khoá trường không được để trống'),
});

const DetailSchoolYear = () => {
  const router = useRouter();
  const [schoolYear, setSchoolYear] = useState();
  const {user} = useAuth();
  const [listSchool, setListSchool] = useState();
  const [initData, setInitData] = useState({
    school: {},
  });

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
    return () => {
    };
  }, [router.isReady]);

  const loadInit = async () => {
    const {id} = router.query;
    const schoolYear = await schoolYearService.detail(id);
    if (schoolYear && schoolYear.status && !_.isEmpty(schoolYear.data)) {
      setSchoolYear(schoolYear.data);
    } else {
      swal('Thông tin này không tồn tại!!', '', 'error')
        .then(() => router.push('/to-chuc/nien-khoa/'));
    }

    let initDataSelected = {};
    const schools = await schoolService.list({limit: 100});
    if (schools.total) {
      const schoolOptions = schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      }));
      setListSchool(schoolOptions);

      const initSchool = _.find(schoolOptions, {value: schoolYear.data.schoolId});
      initDataSelected.school = initSchool;
      setInitData(initDataSelected)
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
          values,
          setFieldValue
        }) => (
        <Form className='form lg:w-1/2'>
          <h3>Thông tin niên khoá</h3>
          <div>
            <Select
              label='Tên trường'
              name='schoolId'
              options={listSchool}
              isDisable={user?.role !== 'admin'}
              value={initData.school}
              onChange={(e) => {
                setFieldValue('schoolId', e.value);
                setInitData({
                  ...initData, ...{
                    school: e,
                  }
                });
              }}
            />
            <Input
              name='schoolYearName' label='Niên khoá trường *'
              useFormik
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


