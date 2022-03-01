import {Formik, Form} from "formik";
import * as Yup from "yup";

import Input from "../../../../components/form/input";
import Button from "../../../../components/button";
import Select from "../../../../components/form/select";
import Layout from "../../../../components/layout";

const validationSchema = Yup.object().shape({
  tenKhoi: Yup.string().required('Tên khối không được để trống'),
  nienKhoa: Yup.string().required('Niên khoá không được để trống'),
  khoiTruong: Yup.string().required('Khối trưởng không được để trống'),
});

const AddUnit = () => {

  const options = [
    {value: '2009-2010', label: '2009-2010'},
    {value: '2019-2012', label: '2009-2010'},
    {value: '2009-2012', label: '2009-2010'},
  ]

  const handleSubmitForm = (values) => {
    console.log(values);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        tenKhoi: '',
        nienKhoa: '',
        khoiTruong: ''
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
          <h3>Thiết lập khối</h3>
          <div className='grid-container'>
            <Input
              name='tenKhoi' label='Tên khối'
              // error={errors.tenKhoi && touched.tenKhoi ? errors.tenKhoi : null}
              onChange={handleChange}
            />
            <Select
              label='Niên khoá'
              name='nienKhoa'
              onChange={e => setFieldValue('nienKhoa', e.value)}
              options={options}
              placeholder='Chọn niên khoá'
              // error={errors.nienKhoa && touched.nienKhoa ? errors.nienKhoa : null}
            />
            <Input
              name='khoiTruong'
              label='Khối trưởng'
              // error={errors.khoiTruong && touched.khoiTruong ? errors.khoiTruong : null}
              onChange={handleChange}
            />
          </div>
          <div className='flex'>
            <Button type='submit' className='mr-4'>Lưu</Button>
            <Button>Huỷ</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddUnit;

AddUnit.getLayout = (page) => <Layout>{page}</Layout>;
