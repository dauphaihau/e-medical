import {Formik, Form} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import swal from "sweetalert";
import {useRouter} from "next/router";

import Button from "../../../../components/button";
import Input from "../../../../components/form/input";
import Layout from "../../../../components/layout";
import schoolService from "../../../../services/organize/school";

const validationSchema = Yup.object().shape({
  schoolname: Yup.string().required('Tên người dùng không được để trống').min(5, 'Tên trường ít nhất là 5 ký tự').max(50, 'Tên trường tối đa là 50 ký tự'),
  address: Yup.string().required('Địa chỉ không được để trống'),
  province: Yup.string().required('Tỉnh không được để trống').email('Email không hợp lệ'),
  district: Yup.string().required('Quận không được để trống'),
  ward: Yup.string().required('Phường không được để trống'),
  civilGroup: Yup.string().required('Nhóm trường không được để trống'),
});

const DetailSchool = () => {

  const router = useRouter();
  const [school, setSchool] = useState([]);

  const getDetailSchool = async (idSchool) => {
    try {
      const {request, ...response} = await schoolService.getAllSchool(idSchool);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    const {id} = router.query;
    await getDetailSchool(id);
  }, []);

  const handleSubmitForm = async (dataUpdateSchool) => {
    console.log(dataUpdateSchool);
    try {
      await schoolService.updateSchool(router.query.id, dataUpdateSchool);
      swal('Cap nhat thanh cong')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      className='my-4'
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolname: school.schoolname,
        address: school.address,
        province: school.province,
        district: school.district,
        ward: school.ward,
        civilGroup: school.civilGroup,
        status: 0
      }}
    >
      {({
          handleSubmit,
          handleChange,
          touched,
          errors,
          values,
        }) => (
        <Form className='form py-8' onSubmit={handleSubmit}>
          <h3>Thông tin trường</h3>
          <div className='grid lg:grid-cols-2 gap-4 lg:w-1/2'>
            <Input
              label='Tên trường'
              name='schoolname'
              error={errors.schoolname && touched.schoolname ? errors.schoolname : null}
              onChange={handleChange}
              value={values.schoolname}
            />
            <Input
              label='Địa chỉ'
              name='address'
              error={errors.address && touched.address ? errors.address : null}
              onChange={handleChange}
              value={values.address}
            />
            <Input
              label='Tỉnh'
              name='province'
              error={errors.province && touched.province ? errors.province : null}
              onChange={handleChange}
              value={values.province}
            />
            <Input
              label='Quận'
              name='district'
              error={errors.district && touched.district ? errors.district : null}
              onChange={handleChange}
              value={values.district}
            />
            <Input
              label='Phường' name='ward'
              error={errors.ward && touched.ward ? errors.ward : null}
              onChange={handleChange}
              value={values.ward}
            />
            <Input
              label='Nhóm trường' name='civilGroup'
              error={errors.civilGroup && touched.civilGroup ? errors.civilGroup : null}
              onChange={handleChange}
              value={values.civilGroup}
            />
          </div>
          <Button type='submit' className='mr-4'>Cập nhật</Button>
        </Form>
      )}
    </Formik>
  )
}
export default DetailSchool

DetailSchool.getLayout = (page) => <Layout>{page}</Layout>;

