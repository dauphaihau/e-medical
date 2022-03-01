import {Formik, Form} from "formik";
import * as Yup from "yup";

import Select from "../../../../components/form/select";
import Input from "../../../../components/form/input";
import Button from "../../../../components/button";
import Layout from "../../../../components/layout";
import classService from "../../../../services/organize/class";

const validationSchema = Yup.object().shape({
  className: Yup.string().required('Tên lớp không được để trống'),
  schoolYearId: Yup.string().required('Niên khoá không được để trống'),
  tenKhoi: Yup.string().required('Tên khối không được để trống'),
  giaoVienChuNhiem: Yup.string().required('Giáo viên chủ nhiệm không được để trống'),
});

// {
//   "schoolId": "string",
//   "schoolYearId": "string",
//   "parentId": "string",
//   "className": "string",
//   "status": "1"
// }

const AddClass = () => {

  const options = [
    {value: '2009-2010', label: '2009-2010'},
    {value: '2019-2012', label: '2009-2010'},
    {value: '2009-2012', label: '2009-2010'},
  ]

  const handleSubmitForm = async (dataClass) => {
    console.log(dataClass);
    try {
      await classService.createClass(dataClass)
      swal('Tạo lớp thành công')
    } catch ({response}) {
      console.log(response);
    }
  };

  return (
    <>
      <h2>Thêm mới lớp học</h2>
      <div className='mb-4 flex flex-col md:flex-row gap-4 w-1/2'>
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
          tenKhoi: '',
          giaoVienChuNhiem: '',
        }}
      >
        {({
            handleSubmit,
            handleChange,
            touched,
            errors,
            setFieldValue
          }) => (
          <Form className='form'>
            <div className='grid-container'>
              <Input
                name='className' label='Tên lớp'
                error={errors.className && touched.className ? errors.className : null}
                onChange={handleChange}
              />
              <Select
                label='Niên khoá'
                name='schoolYearId'
                onChange={e => setFieldValue('schoolYearId', e.value)}
                options={options}
                placeholder='Chọn niên khoá'
                error={errors.schoolYearId && touched.schoolYearId ? errors.schoolYearId : null}
              />
              <Select
                label='Khối'
                name='khoi'
                onChange={e => setFieldValue('khoi', e.value)}
                options={options}
                placeholder='Chọn khối'
                error={errors.khoi && touched.khoi ? errors.khoi : null}
              />
              <Select
                label='Giáo viên chủ nhiệm'
                name='giaoVienChuNhiem'
                onChange={e => setFieldValue('giaoVienChuNhiem', e.value)}
                options={options}
                placeholder='Chọn Giáo viên chủ nhiệm'
                error={errors.giaoVienChuNhiem && touched.giaoVienChuNhiem ? errors.giaoVienChuNhiem : null}
              />
            </div>
            <div className='ml-2' style={{transform: `translate(-30px, 90px)`}}>
              <Button type='submit' className='mr-4'>Lưu</Button>
              <Button>Huỷ</Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddClass;

AddClass.getLayout = (page) => <Layout>{page}</Layout>;