import {Formik, Form} from "formik";
import * as Yup from "yup";

import Button from "../../../../components/button";
import Input from "../../../../components/form/input";
import Layout from "../../../../components/layout";
import {http} from "../../../../utils/setting";

const loginSchema = Yup.object().shape({
  schoolname: Yup.string().required('Tên trường không được để trống').min(5, 'Tên trường ít nhất là 5 ký tự').max(50, 'Tên trường tối đa là 50 ký tự'),
});

const AddSchool = () => {

  const handleSubmitForm = async (values) => {
    console.log(values);
    try {
      const result = await http.post(`/v1/organization/school`)
      console.log(result);
      alert('Them Thanh Cong')
    } catch (error) {
      console.log({error})
    }
  };

  return (
    <Formik
      validationSchema={loginSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolname: '',
        address: '',
        province: '',
        district: '',
        ward: '',
        civilGroup: '',
        status: 0
      }}
    >
      {({
          handleSubmit,
          handleChange,
          touched,
          errors,
        }) => (
        <Form className='form' onSubmit={handleSubmit}>
          <h3>Thêm trường</h3>
          <div className='grid lg:grid-cols-2 gap-4 lg:w-1/2'>
            <Input
              label='Tên trường'
              name='schoolname'
              error={errors.schoolname && touched.schoolname ? errors.schoolname : null}
              onChange={handleChange}
            />
            <Input
              label='Địa chỉ'
              name='address'
              error={errors.address && touched.address ? errors.address : null}
              onChange={handleChange}
            />
            <Input
              label='Tỉnh'
              name='province'
              error={errors.province && touched.province ? errors.province : null}
              onChange={handleChange}
            />
            <Input
              label='Quận'
              name='district'
              error={errors.district && touched.district ? errors.district : null}
              onChange={handleChange}
            />
            <Input
              label='Phường' name='ward'
              error={errors.ward && touched.ward ? errors.ward : null}
              onChange={handleChange}
            />
            <Input
              label='Nhóm trường' name='civilGroup'
              error={errors.civilGroup && touched.civilGroup ? errors.civilGroup : null}
              onChange={handleChange}
            />
          </div>
          <Button type='submit'>Tạo</Button>
        </Form>
      )}
    </Formik>
  )
}
export default AddSchool

AddSchool.getLayout = (page) => <Layout>{page}</Layout>;

