import Select from "../../../../components/form/select";
import Input from "../../../../components/form/input";
import Button from "../../../../components/button";
import {useFormik} from "formik";
import * as Yup from "yup";
import Layout from "../../../../components/layout";

const AddLop = () => {

  const formik = useFormik({
    initialValues: {
      tenLop:'',
      nienKhoa: '',
      khoi: '',
      giaoVienChuNhiem: '',
    },
    validationSchema: Yup.object().shape({
      tenLop: Yup.string().required('Tên lớp không được để trống'),
      nienKhoa: Yup.string().required('Tên khối không được để trống'),
      tenKhoi: Yup.string().required('Niên khoá không được để trống'),
      giaoVienChuNhiem: Yup.string().required('Giáo viên chủ nhiệm không được để trống'),
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
      <form className='form'>
        <div className='grid-container'>
          <Input
            name='tenLop' label='Tên lớp'
            error={formik.errors.tenLop && formik.touched.tenLop ? formik.errors.tenLop : null}
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
          <Select
            label='Khối'
            name='khoi'
            onChange={e => formik.setFieldValue('khoi', e.value)}
            options={options}
            defaultValue='Chọn niên khoá'
            error={formik.errors.khoi && formik.touched.khoi ? formik.errors.khoi : null}
          />
          <Select
            label='Giáo viên chủ nhiệm'
            name='giaoVienChuNhiem'
            onChange={e => formik.setFieldValue('giaoVienChuNhiem', e.value)}
            options={options}
            defaultValue='Chọn niên khoá'
            error={formik.errors.giaoVienChuNhiem && formik.touched.giaoVienChuNhiem ? formik.errors.giaoVienChuNhiem : null}
          />
        </div>
        <div className='ml-2' style={{transform: `translate(-30px, 90px)`}}>
          <Button type='submit' className='mr-4'>Lưu</Button>
          <Button>Huỷ</Button>
        </div>
      </form>
    </>
  );
}

export default AddLop;

AddLop.getLayout = (page) => <Layout>{page}</Layout>;