import {Formik, Form} from "formik";
import * as Yup from "yup";

import Select from "../../../../components/form/select";
import Input from "../../../../components/form/input";
import Button from "../../../../components/button";
import Layout from "../../../../components/layout";
import schoolYearService from "../../../../services/organize/school-year";

const validationSchema = Yup.object().shape({
  schoolYearName: Yup.string().required('Tên niên khoá trường không được để trống'),
  schoolId: Yup.string().required('Mã trường không được để trống'),
});

const options = [
  {value: 'Không', label: 'Không'},
  {value: 'Có', label: 'Có'},
]

const handleSubmitForm = async (dataSchoolYear) => {
  console.log(dataSchoolYear);
  try {
    await schoolYearService.createSchoolYear(dataSchoolYear)
    swal('Tạo Niên Khoá thanh cong')
  } catch ({response}) {
    console.log(response);
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
        schoolId: '',
        keThuaDuLieu: '',
        thoiGianBatDau: '',
        thoiGianKetThuc: '',
        status: 0,
      }}
    >
      {({
          handleChange,
          setFieldValue
        }) => (
        <Form className='form'>
          <h3>Thêm niên khoá</h3>
          <div className='flex flex-wrap gap-x-4 lg:grid-container'>
            <Input
              name='schoolYearName' label='Tên niên khoá trường *'
              onChange={handleChange}
            />
            <Input
              name='schoolId' label='Mã trường'
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
              <p className='text-[0.8rem]'>Dữ liệu được kế thừa bao gồm các thông: </p>
              <p className='text-[0.8rem]'>- Thông tin và hồ sơ sức khoẻ học sinh </p>
              <p className='text-[0.8rem]'>- Danh sách học sinh </p>
            </div>
          </div>
          <h3 className='mt-8'>Thời gian</h3>
          <div className='grid-container'>
            <Input
              name='thoiGianBatDau' label='Thời gian bắt đầu'
              onChange={handleChange}
            />
            <Input
              name='thoiGianKetThuc' label='Thời gian kết thúc'
              onChange={handleChange}
            />
          </div>
          <div className='my-4'>
            <Button className='mr-4' type='submit'>Lưu</Button>
            <Button>Huỷ</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddSchoolYear;

AddSchoolYear.getLayout = (page) => <Layout>{page}</Layout>;