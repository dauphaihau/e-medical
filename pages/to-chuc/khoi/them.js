import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import * as Yup from "yup";
import swal from "sweetalert";
import Link from "next/link";

import {Formik, Form} from "formik";
import Input from "@components/form/input";
import Button from "@components/button";
import Select from "@components/form/select";
import {classroomService, schoolYearService} from "@services";
import {useAuth} from "../../../context/auth";

const validationSchema = Yup.object().shape({
  className: Yup.string()
    .required('Tên khối không được để trống')
    .max(50, 'Tên khối tối đa là 50 ký tự')
    .min(5, 'Tên khối phải ít nhất 5 ký tự'),
});

const AddGroup = () => {
  const router = useRouter();
  const {school} = useAuth();
  const [listSchoolYear, setListSchoolYear] = useState([])
  const [schoolYearSelected, setSchoolYearSelected] = useState()

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady]);

  const loadInit = async () => {
    const schoolYears = await schoolYearService.list({schoolId: school?._id, limit: 100})
    if (schoolYears && schoolYears.total) {
      setListSchoolYear(schoolYears.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      })));
    } else {
      setListSchoolYear();
    }
  }

  const handleSubmitForm = async (data) => {
    const result = await classroomService.createGroup(data);
    if (result) {
      swal({
        text: "Thêm mới thành công",
        icon: "success"
      })
        .then(() => router.push('/to-chuc/khoi/'));
    } else {
      swal({
        text: "Thêm mới không thành công",
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
        className: '',
        schoolId: school?._id,
        schoolYearId: listSchoolYear[0]?.value,
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
              placeholder='Chọn trường'
              name='schoolId'
              isDisable={true}
              value={{value: school?._id, label: school?.schoolname}}
            />
            <Select
              label='Niên khoá'
              name='schoolYearId'
              isDisable={true}
              value={{value: listSchoolYear[0]?.value, label: listSchoolYear[0]?.label}}
              placeholder='Chọn niên khoá'
            />
            <Input
              name='className'
              label='Tên khối'
              onChange={handleChange}
              useFormik
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
