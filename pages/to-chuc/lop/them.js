import {Formik, Form} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import swal from "sweetalert";
import Link from "next/link";

import Select from "@components/form/select";
import Input from "@components/form/input";
import Button from "@components/button";
import {classroomService, schoolYearService} from "@services";
import {useAuth} from "../../../context/auth";

const validationSchema = Yup.object().shape({
  className: Yup.string()
    .required('Tên lớp không được để trống')
    .min(5, 'Tên lớp ít nhất là 5 ký tự')
    .max(50, 'Tên lớp tối đa là 50 ký tự'),
  parentId: Yup.string().required('Vui lòng chọn khối.'),
});

const defaultSelectValue = {
  value: "",
  label: "",
  code: "",
};

const AddClassroom = () => {

  const router = useRouter();
  const {school} = useAuth();
  const [listSchoolYear, setListSchoolYear] = useState([])
  const [listGroup, setListGroup] = useState([])

  const [groupSelected, setGroupSelected] = useState()

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady, router.asPath])

  const loadInit = async () => {
    const schoolYears = await schoolYearService.list({schoolId: school?._id})
    if (schoolYears && schoolYears.total) {
      setListSchoolYear(schoolYears.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      })));

      const group = await classroomService.listGroup({schoolId: school?._id, limit: 10});
      if (group.total) {
        setListGroup(group.data.map((data) => ({
          value: data._id,
          label: data.className,
        })));
      }
    } else {
      setListSchoolYear();
    }
  }

  const handleSubmitForm = async (values) => {
    const result = await classroomService.create(values)
    if (result) {
      swal({
        text: "Thêm mới thành công",
        icon: "success"
      })
        .then(() => router.push('/to-chuc/lop/'));
    } else {
      swal({
        text: "Thêm mới không thành công",
        icon: "error"
      });
    }
  };

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
        enableReinitialize
        initialValues={{
          schoolId: school?._id,
          schoolYearId: listSchoolYear[0]?.value,
          className: '',
          parentId: '',
          status: 1
        }}
      >
        {({handleChange, setFieldValue,}) => (
          <Form className='form lg:w-1/2'>
            <h3>Thêm mới lớp học</h3>
            <div>
              <Select
                label='Tên Trường'
                name='schoolId'
                isDisable={true}
                value={{value: school?._id, label: school?.schoolname}}
              />
              <Select
                label='Niên khoá trường'
                name='schoolYearId'
                isDisable={true}
                value={{value: listSchoolYear[0]?.value, label: listSchoolYear[0]?.label}}
              />
              <Select
                label='Khối'
                name='parentId'
                value={groupSelected}
                useFormik
                onChange={e => {
                  setGroupSelected(e);
                  setFieldValue('parentId', e.value);
                }}
                options={listGroup}
              />
              <Input
                label='Tên lớp'
                name='className'
                onChange={handleChange}
                useFormik
              />
            </div>
            <div className='py-4'>
              <Button type='submit' className='mr-4'>Thêm</Button>
              <Link href='/to-chuc/lop'>
                <a><Button type='text'>Huỷ</Button></a>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddClassroom;