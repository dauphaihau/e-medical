import {Formik, Form} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import swal from "sweetalert";
import Link from "next/link";

import Select from "@components/form/select";
import Input from "@components/form/input";
import Button from "@components/button";
import {classroomService, schoolService, schoolYearService} from "@services";

const validationSchema = Yup.object().shape({
  className: Yup.string()
    .required('Tên lớp không được để trống')
    .min(5, 'Tên lớp ít nhất là 5 ký tự')
    .max(50, 'Tên lớp tối đa là 50 ký tự'),
  schoolYearId: Yup.string().required('Vui lòng chọn niên khóa'),
  parentId: Yup.string().required('Vui lòng chọn khối.'),
  schoolId: Yup.string().required('Vui lòng chọn trường.'),
});

const defaultSelectValue = {
  value: "",
  label: "",
  code: "",
};

const AddClassroom = () => {

  const router = useRouter();
  const [schoolOptions, setSchoolOptions] = useState([]);
  const [listSchoolYear, setListSchoolYear] = useState([])
  const [listGroup, setListGroup] = useState([])

  const [schoolYearSelected, setSchoolYearSelected] = useState(defaultSelectValue)
  const [schoolSelected, setSchoolSelected] = useState(defaultSelectValue)
  const [groupSelected, setGroupSelected] = useState()

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady, router.asPath])

  const loadInit = async () => {
    const schools = await schoolService.list({limit: 100});
    if (schools.total) {
      setSchoolOptions(schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      })));
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

  const onChangeSchool = async (e) => {
    const schoolYearList = await schoolYearService.list({schoolId: e.value})
    if (schoolYearList.total) {
      setListSchoolYear(schoolYearList.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      })));
    }
  };

  const onChangeSchoolYear = async (e) => {
    const group = await classroomService.listGroup({schoolId: e.value, limit: 10});
    if (group.total) {
      setListGroup(group.data.map((data) => ({
        value: data._id,
        label: data.className,
      })));
    }
  }

  return (
    <>
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
            setFieldValue,
          }) => (
          <Form className='form lg:w-1/2'>
            <h3>Thêm mới lớp học</h3>
            <div>
              <Select
                label='Tên Trường'
                name='schoolId'
                useFormik='true'
                onChange={e => {
                  onChangeSchool(e);
                  onChangeSchoolYear(e);
                  setSchoolSelected(e);
                  setListSchoolYear(defaultSelectValue);
                  setSchoolYearSelected([]);
                  setGroupSelected([]);
                  setFieldValue('schoolId', e.value)
                }}
                options={schoolOptions}
              />
              <Select
                label='Niên khoá trường'
                name='schoolYearId'
                value={schoolYearSelected}
                onChange={e => {
                  setSchoolYearSelected(e)
                  setFieldValue('schoolYearId', e.value);
                  setGroupSelected([])
                }}
                options={listSchoolYear}
                useFormik='true'
              />
              <Select
                label='Khối'
                name='parentId'
                value={groupSelected}
                useFormik='true'
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
                useFormik='true'
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