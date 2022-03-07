import {Formik, Form} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/router";
import swal from "sweetalert";
import Link from "next/link";

import Button from "@components/button";
import Input from "@components/form/input";
import Layout from "@components/layout";
import {schoolService} from "@services";

const validationSchema = Yup.object().shape({
  schoolname: Yup.string().required('Tên trường không được để trống').min(5, 'Tên trường ít nhất là 5 ký tự').max(50, 'Tên trường tối đa là 50 ký tự'),
});

const AddSchool = () => {
  const router = useRouter();

  const handleSubmitForm = async (dataSchool) => {
    try {
      await schoolService.create(dataSchool)
      await router.back();
      swal({
        text: "Tạo trường thành công",
        icon: "success"
      })
    } catch (error) {
      console.log({error})
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
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
          handleChange,
          handleBlur,
        }) => (
        <Form className='form lg:w-1/2'>
          <h3>Thêm trường</h3>
          <div className='grid-container lg:grid-cols-2 gap-x-8'>
            <Input
              label='Tên trường'
              name='schoolname'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              label='Địa chỉ'
              name='address'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              label='Tỉnh'
              name='province'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              label='Quận'
              name='district'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              label='Phường' name='ward'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              label='Nhóm trường' name='civilGroup'
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <Button type='submit' className='mr-2'>Tạo</Button>
          <Link href='/to-chuc/truong'>
            <a><Button type='text'>Huỷ</Button></a>
          </Link>
        </Form>
      )}
    </Formik>
  )
}
export default AddSchool

AddSchool.getLayout = (page) => <Layout>{page}</Layout>;

