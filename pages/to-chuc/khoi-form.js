import {useFormik} from "formik";
import Input from "../../components/form/input";
import TitleContent from "../../components/title-contet";
import Select from "react-select";
import Button from "../../components/button";
import * as Yup from "yup";

const KhoiForm = ({stateSidebar}) => {

  const formik = useFormik({
    initialValues: {
      tenKhoi: "",
      nienKhoa: '',
      khoiTruong: "",
    },
    validationSchema: Yup.object().shape({
      tenKhoi: Yup.string().required('Tên khối không được để trống'),
      khoiTruong: Yup.string().required('Khối trường không được để trống'),
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const options = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'}
  ]

  const test = (values) => {
    console.log(values);
  };

  return (
    <TitleContent title='Khối' stateSidebar={stateSidebar}>
      <form className='form' onSubmit={formik.handleSubmit}>
        <h3>Thiết lập khối</h3>
        <div className='grid-container'>
          <Input name='tenKhoi' label='Tên khối' onChange={formik.handleChange}/>
          {formik.errors.tenKhoi && formik.touched.tenKhoi ? <p>{formik.errors.tenKhoi}</p> : null}
          <Select
            name='nienKhoa'
            // onChange={({target}) => {formik.setFieldValue('nienKhoa', target.value)}}
            onChange={e => test(e.target.value)}
            options={options}
            className='mb-4'
          />
          <Input
            name='khoiTruong'
            label='Khối trưởng'
            onChange={formik.handleChange}
          />
        </div>
        <div className='ml-2' style={{transform: `translate(-30px, 90px)`}}>
          <Button type='submit' className='mr-4'>Lưu</Button>
          <Button>Huỷ</Button>
        </div>
      </form>
    </TitleContent>
  );
}

export default KhoiForm;