import {Formik, Form} from "formik";
import * as Yup from "yup";

import Select from "../../../../components/form/select";
import Input from "../../../../components/form/input";
import Button from "../../../../components/button";
import Layout from "../../../../components/layout";
import classService from "../../../../services/organize/class";

const validationSchema = Yup.object().shape({
  className: Yup.string().required('Tên lớp không được để trống').min(5, 'Tên lớp ít nhất là 5 ký tự').max(50, 'Tên lớp tối đa là 50 ký tự'),
  schoolYearId: Yup.string().required('Mã niên khoá trường không được để trống'),
  schoolId: Yup.string().required('Mã trường không được để trống'),
});

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
      <div className='mb-4 flex flex-col md:flex-row gap-4 w-1/2 md:w-full'>
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
          schoolId: '',
          parentId: '',
          status: 1
        }}
      >
        {({
            handleChange,
            setFieldValue
          }) => (
          <Form className='form'>
            <h3>Thêm mới lớp học</h3>
            <div className='grid-container'>
              <Input
                label='Mã trường'
                name='schoolId'
                onChange={handleChange}
              />
              <Select
                label='Nhóm lớp'
                name='parentId'
                onChange={e => setFieldValue('parentId', e.value)}
                options={options}
              />
              <Input
                label='Mã niên khoá trường'
                name='schoolYearId'
                onChange={handleChange}
              />
              <Input
                label='Tên lớp'
                name='className'
                onChange={handleChange}
              />
              {/*<Select*/}
              {/*  label='Người thân'*/}
              {/*  name='giaoVienChuNhiem'*/}
              {/*  onChange={e => setFieldValue('giaoVienChuNhiem', e.value)}*/}
              {/*  options={options}*/}
              {/*  placeholder='Chọn Giáo viên chủ nhiệm'*/}
              {/*/>*/}
            </div>
            <div className='py-4'>
              <Button type='submit' className='mr-4'>Thêm</Button>
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