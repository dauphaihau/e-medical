import {useEffect, useState} from "react";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/router";
import swal from "sweetalert";
import Link from "next/link";

import Button from "@components/button";
import Layout from "@components/layout";
import Radio, {RadioGroup} from "@components/form/radio";
import { memberService } from "@services";
import { values } from "lodash";

const validationSchema = Yup.object().shape({
  // haveTravel: Yup.boolean().required('test')
  haveTravel: Yup.boolean().required('test').oneOf([true],('Xin vui lòng chọn có hoặc không')),
  // haveTravel: Yup.bool(),
  // haveSick: Yup.bool(),
  // meetCovidPatient: Yup.boolean(),
  // fromCountryCovid: Yup.boolean(),
  // peopleHaveSick: Yup.boolean(),
})
//   .test(
//   'myCustomTest',
//   null,
//   (obj) => {
//     if ( obj.haveTravel || obj.haveSick ) {
//       return true; // everything is fine
//     }
//
//     return new Yup.ValidationError(
//       'Xin vui lòng chọn có hoặc không',
//       null,
//       'myCustomFieldName'
//     );
//   }
// );

const MedicalForm = () => {
  const router = useRouter();
  const [member, setMember] = useState();

  useEffect( () => {
    if( !router.isReady ) return;
    loadInit();
  }, [router.isReady])

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
    console.log('values', values);
    const { id } = router.query;
    const result = await memberService.addHealthDeclaration(id, values);

    if(result){
      swal({
        text: "Cập nhật thành công",
        icon: "success"
      })
      .then( () => router.push(`/hoc-sinh/${router.query.id}/khai-bao-y-te`))
    }
    else{
      swal({
        text: "Cập nhật không thành công",
        icon: "error"
      });
    }s
  };

  return (
    <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex -mb-px">
              <li className="mr-2">
                <a href={`/hoc-sinh/${router.query.id}`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent hover:border-primary-light" aria-current="page">Hồ sơ</a>
              </li>
              <li className="mr-2">
                <a href={`/hoc-sinh/${router.query.id}/kham-suc-khoe`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent hover:border-primary-light">Khám sức khỏe</a>
              </li>
              <li className="mr-2">
                <a href={`/hoc-sinh/${router.query.id}/khai-bao-y-te`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 active text-primary border-primary">Khai báo Y Tế</a>
              </li>
              <li className="mr-2">
                <a href={`/hoc-sinh/${router.query.id}/tiem-chung`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent hover:border-primary-light">Tiêm chủng</a>
              </li>
              
          </ul>
        </div>
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
          enableReinitialize
          initialValues={{
            haveTravel: false,
            haveSick: false,
            meetCovidPatient: false,
            fromCountryCovid: false,
            peopleHaveSick: false,
          }}
        >
          {({
              handleChange,
              handleBlur,
              setFieldValue
            }) => (
            <Form name='myform' className='form mt-5'>
              <h3 className="uppercase">Khai Báo Y Tế</h3>
              <p className='text-danger mb-4'>Khuyến cáo: Khai báo thông tin sai là vi phạm pháp luật Việt Nam và có thể xử lý hình sự</p>
              <div className='bg-gray-100 grid gap-y-4 p-4 rounded-xl mb-4'>
                <div>
                  <p className='font-bold text-base'>Trong vòng 14 ngày qua, Anh/Chị có đến tỉnh/thành phố, quốc gia/vùng lãnh thổ nào (Có thể đi qua nhiều nơi) *</p>
                  <RadioGroup>
                    <Radio name='haveTravel' id='haveTravel-1' useFormik onChange={handleChange} value={true} labelName='Có'/>
                    <Radio name='haveTravel' id='haveTravel-2' useFormik onChange={handleChange} value={false} labelName='Không'/>
                  </RadioGroup>
                </div>
                <div>
                  <p className='font-bold text-base'>Trong vòng 14 ngày qua, Anh/Chị có thấy xuất hiện ít nhất 1 trong các dấu hiệu: sốt, ho, khó thở, viêm phổi, đau họng, mệt mỏi không? *</p>
                  <RadioGroup>
                    <Radio name='haveSick' onChange={handleChange} useFormik id='haveSick-1' value={true} labelName='Có'/>
                    <Radio name='haveSick' onChange={handleChange} useFormik id='haveSick-2' value={false} labelName='Không'/>
                  </RadioGroup>
                </div>
                <div>
                  <p className='font-bold text-base'>Trong vòng 14 ngày qua, Anh/Chị có tiếp xúc với *</p>
                  <RadioGroup label='Người bệnh hoặc nghi ngờ, mắc bệnh COVID-19	'>
                    <Radio name='meetCovidPatient' checked={values.meetCovidPatient} onChange={handleChange} id='meetCovidPatient-1' value={true} labelName='Có'/>
                    <Radio name='meetCovidPatient' checked={!values.meetCovidPatient} onChange={handleChange} id='meetCovidPatient-2' value={false} labelName='Không'/>
                  </RadioGroup>
                  <RadioGroup label='Người từ nước có bệnh COVID-19	'>
                    <Radio name='fromCountryCovid' checked={values.fromCountryCovid} onChange={handleChange} id='fromCountryCovid-1' value={true} labelName='Có'/>
                    <Radio name='fromCountryCovid' checked={!values.fromCountryCovid} onChange={handleChange} id='fromCountryCovid-2' value={false} labelName='Không'/>
                  </RadioGroup>
                  <RadioGroup label='Người có biểu hiện (Sốt, ho, khó thở , Viêm phổi)'>
                    <Radio name='peopleHaveSick' checked={values.peopleHaveSick} onChange={handleChange} id='peopleHaveSick-1' value={true} labelName='Có'/>
                    <Radio name='peopleHaveSick' checked={!values.peopleHaveSick} onChange={handleChange} id='peopleHaveSick-2' value={false} labelName='Không'/>
                  </RadioGroup>
                </div>
              </div>
              <Button type='submit' className='mr-2'>Lưu</Button>
              <Link href='/hoc-sinh/them-hoc-sinh/covid-19'>
                <a><Button type='text'>Huỷ</Button></a>
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    
  )
}
export default MedicalForm

MedicalForm.getLayout = (page) => <Layout>{page}</Layout>;
