import {useFormik} from "formik";
import * as Yup from "yup";

import Input from "../../../../components/form/input";
import Button from "../../../../components/button";
import Select from "../../../../components/form/select";
import Layout from "../../../../components/layout";

const AddKhoi = () => {

  const formik = useFormik({
    initialValues: {
      tenKhoi: "",
      nienKhoa: '',
      khoiTruong: "",
    },
    validationSchema: Yup.object().shape({
      tenKhoi: Yup.string().required('Tên khối không được để trống'),
      nienKhoa: Yup.string().required('Niên khoá không được để trống'),
      khoiTruong: Yup.string().required('Khối trưởng không được để trống'),
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const options = [
    {value: '2009-2010', label: '2009-2010'},
    {value: '2019-2012', label: '2009-2010'},
    {value: '2009-2012', label: '2009-2010'},
  ]

  return (
    <form className='form' onSubmit={formik.handleSubmit}>
      <h3>Thiết lập khối</h3>
      <div className='grid-container'>
        <Input
          name='tenKhoi' label='Tên khối'
          error={formik.errors.tenKhoi && formik.touched.tenKhoi ? formik.errors.tenKhoi : null}
          onChange={formik.handleChange}
        />
        <Select
          label='Niên khoá'
          name='nienKhoa'
          onChange={e => formik.setFieldValue('nienKhoa', e.value)}
          options={options}
          defaultValue='Chọn niên khoá'
          error={formik.errors.nienKhoa && formik.touched.nienKhoa ? formik.errors.nienKhoa : null}
        />
        <Input
          name='khoiTruong'
          label='Khối trưởng'
          error={formik.errors.khoiTruong && formik.touched.khoiTruong ? formik.errors.khoiTruong : null}
          onChange={formik.handleChange}
        />
      </div>
      <div className='ml-2' style={{transform: `translate(-30px, 90px)`}}>
        <Button type='submit' className='mr-4'>Lưu</Button>
        <Button>Huỷ</Button>
      </div>
    </form>
  );
}

export default AddKhoi;

AddKhoi.getLayout = (page) => <Layout>{page}</Layout>;
