import {Formik, Form} from "formik";
import {useState} from "react";
import * as Yup from "yup";
import {useRouter} from "next/router";
import swal from "sweetalert";
import Link from "next/link";
import {PlusCircleIcon, PaperClipIcon} from "@heroicons/react/outline";

import Button from "@components/button";
import Input from "@components/form/input";
import Layout from "@components/layout";
import Select from "@components/form/select";

const phoneRegExp = /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Họ Tên không được để trống').min(5, 'Họ Tên ít nhất là 5 ký tự').max(50, 'Họ Tên tối đa là 50 ký tự'),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
    .required('Số điện thoại không được để trống'),
  address: Yup.string().required('Địa chỉ không được để trống'),
  schoolname4: Yup.string().required('Loại vaccine không được để trống'),
  schoolname5: Yup.string().required('Ngày tiêm không được để trống'),
  schoolname6: Yup.string().required('Đơn vị tiêm chủng không được để trống'),
  image: Yup.string().required('Hình ảnh không được để trống'),
});

const VaccineForm = () => {
  const router = useRouter();
  const [vaccine, setVaccine] = useState(false)

  const handleSubmitForm = async (values) => {
    console.log('values', values);
    try {
      await router.back();
      // swal({
      //   text: "Tạo trường thành công",
      //   icon: "success"
      // })
    } catch (error) {
      console.log({error})
    }
  };

  let schoolYear;
  return (
    <Formik
      onSubmit={handleSubmitForm}
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={{}}
    >
      {({
          handleChange,
          handleBlur,
          setFieldValue
        }) => (
        <Form className='form lg:w-1/2'>
          <h3>KHAI BAO THÔNG TIN TIÊM CHỦNG</h3>
          <p className='text-danger mb-4'>Khuyến cáo: Khai báo thông tin sai là vi phạm pháp luật Việt Nam và có thể xử
            lý hình sự</p>
          <div className='grid-container lg:grid-cols-2 gap-x-8 mb-4'>
            <Input
              label='Họ tên'
              name='name'
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
              label='Số điện thoại'
              name='phoneNumber'
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {/* Info Vaccines */}
          <div className='mb-8 grid lg:grid-cols-2 gap-y-4 gap-x-8'>
            <div>
              <h4>Thông tin mũi 1</h4>
              <Select
                name='schoolYearId'
                onChange={e => setFieldValue('schoolYearId', e.value)}
                options={schoolYear}
                placeholder='Loại vaccine'
                useFokmik='true'
              />
              <Select
                name='schoolYearId'
                onChange={e => setFieldValue('schoolYearId', e.value)}
                options={schoolYear}
                placeholder='Ngày tiêm'
                useFokmik='true'
              />
              <Input
                placeholder='Đơn vị tiêm chủng' name='ward'
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div
              className={`flex hover:text-primary cursor-pointer ${vaccine && 'hidden'}`}
              onClick={() => setVaccine(!vaccine)}
            >
              <figure className='h-4 w-4 mr-2'>
                <PlusCircleIcon/>
              </figure>
              <p>Thêm mũi tiêm</p>
            </div>
            {vaccine && (
              <div>
                <h4>Thông tin mũi 2</h4>
                <Select
                  name='schoolYearId'
                  onChange={e => setFieldValue('schoolYearId', e.value)}
                  options={schoolYear}
                  placeholder='Loại vaccine'
                  useFokmik='true'
                />
                <Select
                  name='schoolYearId'
                  onChange={e => setFieldValue('schoolYearId', e.value)}
                  options={schoolYear}
                  placeholder='Ngày tiêm'
                  useFokmik='true'
                />
                <Input
                  placeholder='Đơn vị tiêm chủng' name='ward'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            )}
          </div>
          {/* end Info Vaccines */}
          <div className="mb-4">
            <h4>Thêm ảnh minh chứng</h4>
            <div className="flex ">
              <div className="mb-3 w-96">
                <figure className='h-4 w-4 inline-block mr-2'>
                  <PaperClipIcon/>
                </figure>
                <label htmlFor="formFileSm" className=" inline-block mb-2 text-gray-400">
                  Thêm file đính kèm</label>
                <input
                  className="block w-full py-1 text-sm font-normal text-gray-400 bg-white rounded transition ease-in-out m-0 focus:text-gray-400 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="formFileSm" type="file"/>
              </div>
            </div>
          </div>
          <Button type='submit' className='mr-2'>Lưu</Button>
          <Link href='/hoc-sinh/them-hoc-sinh/covid-19'>
            <a>
              <Button type='text'>Huỷ</Button>
            </a>
          </Link>
        </Form>
      )}
    </Formik>
  )
}
export default VaccineForm

VaccineForm.getLayout = (page) => <Layout>{page}</Layout>;
