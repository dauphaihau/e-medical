import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../../context/auth";

import swal from "sweetalert";
import { memberService, medicalService } from "@services";
import Input from "@components/form/input";
import Button from "@components/button";
import Textarea from "@components/form/textarea";

const validationSchema = Yup.object().shape({
  vaccineName: Yup.string().required('Vui lòng nhập loại vaccine.'),
  injectionAt: Yup.date().required('Vui lòng nhập ngày tiêm.'),
  vaccinationUnit: Yup.string().required('Vui lòng nhập đơn vị tiêm.'),
});

const AddMedical = () => { 
  const router = useRouter();
  const [member, setMember] = useState();
  const { user } = useAuth();

  useEffect(() => {
    if(!router.isReady) return;
    loadInit();
  }, [router.isReady]);

  const loadInit = async () => {
    const { id } = router.query;
    const member = await memberService.detail(id);
    if( !member ){
      swal('Thông tin này không tồn tại!!', '', 'error')
        .then( () => router.push('/hoc-sinh') );
    }
    setMember(member);
  }

  const handleSubmitForm = async (values) => {
    values = {...values, ...{
      // musculoskeletal.scoliosis: musculoskeletal.scoliosis.join(',')
      memberId: member._id,
      createByUserId: user._id,
    }}
    values.musculoskeletal.scoliosis =  values.musculoskeletal.scoliosis.join(',');
    console.log(values);
    const result = await medicalService.create(values);
    
    if(result){
      swal({
        text: "Cập nhật thành công",
        icon: "success"
      });
    }
    else{
      swal({
        text: "Cập nhật không thành công",
        icon: "error"
      });
    }
  }

  return (
    <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex -mb-px">
              <li className="mr-2">
                <a href={`/hoc-sinh/${router.query.id}`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent hover:border-primary-light" aria-current="page">Hồ sơ</a>
              </li>
              <li className="mr-2">
                <a href={`/hoc-sinh/${router.query.id}/kham-suc-khoe`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 active text-primary border-primary">Khám sức khỏe</a>
              </li>
              <li className="mr-2">
                <a href={`/hoc-sinh/${router.query.id}/khai-bao-y-te`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent hover:border-primary-light">Khai báo Y Tế</a>
              </li>
              <li className="mr-2">
                <a href={`/hoc-sinh/${router.query.id}/tiem-chung`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent hover:border-primary-light">Tiêm chủng</a>
              </li>
              
          </ul>
        </div>
        
        <Formik
          // validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
          enableReinitialize
          initialValues={{
            cyclic: '',
            sespiratory: '',
            digest: '',
            kidneyUrinary: '',
            nervousMental: '',
            otherClinical: '',
            eyes: { 
              left: '',
              right: '',
              note: '',
            },
            ears: {
              leftNormally: '',
              leftWhisper: '',
              rightNormally: '',
              rightWhisper: '',
              note: ''
            },
            dental: {
              upperJaw: '',
              lowerJaw: '',
              note: '',
            },
            musculoskeletal: {
              scoliosis: [],
              note: '',
            },
          }}
        >
          {({
              handleChange,
              handleBlur,
              errors,
            }) => (
            <Form className='form mt-5'>
              <h3 className="uppercase">Khám sức khỏe định kỳ</h3>
              <h3 className="pt-5">Nhi Khoa</h3>
              <div className="grid lg:grid-cols-2 gap-x-6 mb-6">
                <Input
                  label='Tuần hoàn'
                  name='cyclic'
                  onChange={handleChange}
                  useFormik
                  onBlur={handleBlur}
                />
                <Input
                  label="Hô hấp"
                  name='sespiratory'
                  onChange={handleChange}
                  useFormik
                  onBlur={handleBlur}
                />
                <Input
                  label='Tiêu hóa' 
                  name='digest'
                  onChange={handleChange}
                  useFormik
                  onBlur={handleBlur}
                />
                <Input
                  label='Thận - tiết niệu' 
                  name='kidneyUrinary'
                  onChange={handleChange}
                  useFormik
                  onBlur={handleBlur}
                />
                <Input
                  label='Thần kinh - tâm thần' 
                  name='nervousMental'
                  onChange={handleChange}
                  useFormik
                  onBlur={handleBlur}
                />
                <Input
                  label='Khám lâm sàng khác' 
                  name='otherClinical'
                  onChange={handleChange}
                  useFormik
                  onBlur={handleBlur}
                />
              </div>

              <h3>Thị lực</h3>
              <div className="grid lg:grid-cols-2 gap-x-6 mb-6">
                <Input
                  label='Mắt trái'
                  name='eyes.left'
                  onChange={handleChange}
                  useFormik
                  onBlur={handleBlur}
                />
                <Input
                  label='Mắt phải'
                  name='eyes.right'
                  onChange={handleChange}
                  useFormik
                  onBlur={handleBlur}
                />
                <Textarea
                  label='Khám lâm sàng khác' 
                  name='eyes.note'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <h3>Tai mũi họng</h3>
              <div className="grid lg:grid-cols-2 gap-x-6 mb-6">
                <div>
                  <h4>Tai trái</h4>
                  <Input
                    label='Nói thường'
                    name='ears.leftNormally'
                    onChange={handleChange}
                    useFormik
                    onBlur={handleBlur}
                  />
                  <Input
                    label='Nói thầm'
                    name='ears.leftWhisper'
                    onChange={handleChange}
                    useFormik
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <h4>Tai phải</h4>
                  <Input
                    label='Nói thường'
                    name='ears.rightNormally'
                    onChange={handleChange}
                    useFormik
                    onBlur={handleBlur}
                  />
                  <Input
                    label='Nói thầm'
                    name='ears.rightWhisper'
                    onChange={handleChange}
                    useFormik
                    onBlur={handleBlur}
                  />
                </div>
                <Textarea
                  label='Các bệnh về tai - mũi -họng (nếu có)' 
                  name='ears.note'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <h3>Răng hàm mặt</h3>
              <div className="grid lg:grid-cols-2 gap-x-6 mb-6">
                <Input
                  label='Hàm trên'
                  name='dental.upperJaw'
                  onChange={handleChange}
                  useFormik
                  onBlur={handleBlur}
                />
                <Input
                  label='Hàm dưới'
                  name='dental.lowerJaw'
                  onChange={handleChange}
                  useFormik
                  onBlur={handleBlur}
                />
                <Textarea
                  label='Các bệnh về Răng Hàm Mặt (nếu có)' 
                  name='dental.note'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <h3>Cơ xương khớp</h3>
              <div className="grid lg:grid-cols-2 gap-x-6 mb-6">
                <div>
                  <label className="block mb-2">Cong vẹo cột sống</label>
                  <div className="grid lg:grid-cols-2 gap-x-6 mb-6">
                    <div className="flex items-center mb-4">
                      <Field
                        type="checkbox"
                        id="musculoskeletal.scoliosis-gu"
                        name="musculoskeletal.scoliosis"
                        value="gu"
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="musculoskeletal.scoliosis-gu" className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Gù</label>
                    </div>
                    <div className="flex items-center mb-4">
                      <Field 
                        name="musculoskeletal.scoliosis"
                        id="musculoskeletal.scoliosis-uon"
                        type="checkbox" 
                        value="uon"
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="musculoskeletal.scoliosis-uon" className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Ưỡn</label>
                    </div>
                    <div className="flex items-center mb-4">
                      <Field 
                        name="musculoskeletal.scoliosis"
                        id="musculoskeletal.scoliosis-congs"
                        type="checkbox" 
                        value="cong-chu-s"
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="musculoskeletal.scoliosis-congs" className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Hình chữ S</label>
                    </div>
                    <div className="flex items-center mb-4">
                      <Field 
                        name="musculoskeletal.scoliosis"
                        id="musculoskeletal.scoliosis-congc"
                        type="checkbox"
                        value="cong-chu-c"
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="musculoskeletal.scoliosis-congc" className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Hình chữ C</label>
                    </div>
                  </div>
                </div>
                
                <Textarea
                  label='Các bệnh về Cơ xương khớp (nếu có)' 
                  name='musculoskeletal.note'
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <Button type='submit' className='mr-2'>Lưu</Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
export default AddMedical
