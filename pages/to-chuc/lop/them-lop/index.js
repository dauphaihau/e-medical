import {Formik, Form} from "formik";
import * as Yup from "yup";

import Select from "../../../../components/form/select";
import Input from "../../../../components/form/input";
import Button from "../../../../components/button";
import Layout from "../../../../components/layout";

const loginSchema = Yup.object().shape({
  tenLop: Yup.string().required('Tên lớp không được để trống'),
  nienKhoa: Yup.string().required('Tên khối không được để trống'),
  tenKhoi: Yup.string().required('Niên khoá không được để trống'),
  giaoVienChuNhiem: Yup.string().required('Giáo viên chủ nhiệm không được để trống'),
});

const AddClass = () => {

  const options = [
    {value: '2009-2010', label: '2009-2010'},
    {value: '2019-2012', label: '2009-2010'},
    {value: '2009-2012', label: '2009-2010'},
  ]

  const handleSubmitForm = (values) => {
    console.log(values);
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
        validationSchema={loginSchema}
        onSubmit={handleSubmitForm}
        enableReinitialize
        initialValues={{
          tenLop: '',
          nienKhoa: '',
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
          <Form className='form' onSubmit={handleSubmit}>
            <div className='grid-container'>
              <Input
                name='tenLop' label='Tên lớp'
                error={errors.tenLop && touched.tenLop ? errors.tenLop : null}
                onChange={handleChange}
              />
              <Select
                label='Niên khoá'
                name='nienKhoa'
                onChange={e => setFieldValue('nienKhoa', e.value)}
                options={options}
                placeholder='Chọn niên khoá'
                error={errors.nienKhoa && touched.nienKhoa ? errors.nienKhoa : null}
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