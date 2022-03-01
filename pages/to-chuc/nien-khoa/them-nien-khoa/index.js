import {Formik, Form} from "formik";
import * as Yup from "yup";

import Select from "../../../../components/form/select";
import Input from "../../../../components/form/input";
import Button from "../../../../components/button";
import Layout from "../../../../components/layout";
import {http} from "../../../../utils/setting";

const validationSchema = Yup.object().shape({
  schoolYearName: Yup.string().required('Niên khoá không được để trống'),
});

const options = [
  {value: '2009-2010', label: '2009-2010'},
  {value: '2019-2012', label: '2009-2010'},
  {value: '2009-2012', label: '2009-2010'},
]

const handleSubmitForm = async (values) => {
  console.log(values);
  try {
    await http.post(`/v1/organization/schoolyear`)
    alert('them thanh cong')
  } catch (error) {
    console.log({error})
  }
};

const AddSchoolYear = () => {
  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolYearName: '',
        keThuaDuLieu: '',
        thoiGianBatDau: '',
        thoiGianKetThuc: '',
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
          <div className='grid-container gap-8'>
            <Input
              name='schoolYearName' label='Niên khoá *'
              error={errors.schoolYearName && touched.schoolYearName ? errors.schoolYearName : null}
              onChange={handleChange}
            />
            <div>
              <Select
                label='Kế thừa dữ liệu ( nếu có )'
                name='keThuaDuLieu'
                onChange={e => setFieldValue('keThuaDuLieu', e.value)}
                options={options}
                placeholder='Chọn niên khoá kế thừa'
              />
              <p>Dữ liệu được kế thừa bao gồm các thông: </p>
              <p>- Thông tin và hồ sơ sức khoẻ học sinh </p>
              <p>- Danh sách học sinh </p>
            </div>
          </div>
          <h3 className='mt-8'>Thời gian</h3>
          <div className='grid-container gap-8'>
            <Input
              name='thoiGianBatDau' label='Thời gian bắt đầu'
              error={errors.thoiGianBatDau && touched.thoiGianBatDau ? errors.thoiGianBatDau : null}
              onChange={handleChange}
            />
            <Input
              name='thoiGianKetThuc' label='Thời gian kết thúc'
              error={errors.thoiGianKetThuc && touched.thoiGianKetThuc ? errors.thoiGianKetThuc : null}
              onChange={handleChange}
            />
          </div>
          <div className='ml-2' style={{transform: `translate(-30px, 90px)`}}>
            <Button className='mr-4'>Lưu</Button>
            <Button>Huỷ</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddSchoolYear;

AddSchoolYear.getLayout = (page) => <Layout>{page}</Layout>;