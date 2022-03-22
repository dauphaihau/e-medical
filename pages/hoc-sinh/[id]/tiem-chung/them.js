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
import { memberService } from "@services";

const validationSchema = Yup.object().shape({
  vaccineName: Yup.string().required('Vui lòng nhập loại vaccine.'),
  injectionAt: Yup.date().required('Vui lòng nhập ngày tiêm.'),
  vaccinationUnit: Yup.string().required('Vui lòng nhập đơn vị tiêm.'),
});

const VaccineForm = () => {
  const router = useRouter();
  const [vaccine, setVaccine] = useState(false)

  const handleSubmitForm = async (values) => {
    const { id } = router.query;
    const result = await memberService.addVaccination(id, values);

    if(result){
      swal({
        text: "Cập nhật thành công",
        icon: "success"
      })
      .then( () => router.push(`/hoc-sinh/${router.query.id}/tiem-chung`))
    }
    else{
      swal({
        text: "Cập nhật không thành công",
        icon: "error"
      });
    }
  };

  let schoolYear;
  return (
    <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex -mb-px">
            <li className="mr-2">
              <a href={`/hoc-sinh/${router.query.id}`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent hover:border-primary-light" aria-current="page">Hồ sơ</a>
            </li>
            <li className="mr-2">
              <a href={`/hoc-sinh/${router.query.id}/kham-suc-khoe`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent hover:border-primary-lights">Khám sức khỏe</a>
            </li>
            <li className="mr-2">
              <a href={`/hoc-sinh/${router.query.id}/khai-bao-y-te`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent hover:border-primary-light">Khai báo Y Tế</a>
            </li>
            <li className="mr-2">
              <a href={`/hoc-sinh/${router.query.id}/tiem-chung`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 active text-primary border-primary">Tiêm chủng</a>
            </li>
          </ul>
        </div>
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
          enableReinitialize
          initialValues={{
            vaccineName: '',
            injectionAt: '',
            vaccinationUnit: ''
          }}
        >
          {({
              handleChange,
              handleBlur,
              errors,
            }) => (
            <Form className='form mt-5'>
              <h3 className="uppercase">Khai báo thông tin tiêm chủng</h3>
              <p className='text-danger mb-4'>Khuyến cáo: Khai báo thông tin sai là vi phạm pháp luật Việt Nam và có thể xử lý hình sự</p>
              <div className='w-1/2'>
                <h4>Thông tin vaccine</h4>
                <Input
                  label="Loại vaccine"
                  name='vaccineName'
                  onChange={handleChange}
                  useFormik
                  onBlur={handleBlur}
                />
                <Input
                  type='date'
                  label="Ngày tiêm"
                  name='injectionAt'
                  onChange={handleChange}
                  useFormik
                  onBlur={handleBlur}
                />
                <Input
                  label='Đơn vị tiêm chủng' 
                  name='vaccinationUnit'
                  onChange={handleChange}
                  useFormik
                  onBlur={handleBlur}
                />
              </div>
            
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
                      id="formFileSm" type="file" name="file"/>
                  </div>
                </div>
              </div>
              <Button type='submit' className='mr-2'>Lưu</Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
export default VaccineForm

VaccineForm.getLayout = (page) => <Layout>{page}</Layout>;
