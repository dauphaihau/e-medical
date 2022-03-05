import {Formik, Form} from "formik";
import {useState} from "react";
import * as Yup from "yup";
import {useRouter} from "next/router";
import swal from "sweetalert";
import Link from "next/link";

import Button from "@components/button";
import Input from "@components/form/input";
import Layout from "@components/layout";
import Radio, {RadioGroup} from "../../../../../components/form/radio";

const validationSchema = Yup.object().shape({});

const MedicalForm = () => {
  const router = useRouter();

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

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{}}
    >
      {({
          handleChange,
          handleBlur,
          setFieldValue
        }) => (
        <Form className='form lg:w-1/2'>
          <h3>KHAI BÁO Y TẾ</h3>
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
          <div className='bg-gray-100 grid gap-y-4 p-4 rounded-xl mb-4'>
            <div>
              <p className='font-bold text-base'>Trong vòng 14 ngày qua, Anh/Chị có đến tỉnh/thành phố, quốc gia/vùng lãnh thổ nào (Có thể đi qua nhiều
                nơi) *</p>
              <RadioGroup>
                <Radio
                  name='hoTen'
                  value='Có'
                />
                <Radio
                  name='hoTen'
                  value='Không'
                />
              </RadioGroup>
            </div>
            <div>
              <p className='font-bold text-base'>Trong vòng 14 ngày qua, Anh/Chị có thấy xuất hiện ít nhất 1 trong các dấu hiệu: sốt, ho, khó thở, viêm phổi, đau họng, mệt mỏi không? *</p>
              <RadioGroup>
                <Radio
                  name='hoTen'
                  value='Có'
                />
                <Radio
                  name='hoTen'
                  value='Không'
                />
              </RadioGroup>
            </div>
            <div>
              <p className='font-bold text-base'>Trong vòng 14 ngày qua, Anh/Chị có tiếp xúc với *</p>
              <RadioGroup label='Người bệnh hoặc nghi ngờ, mắc bệnh COVID-19	'>
                <Radio
                  name='hoTen'
                  value='Có'
                />
                <Radio
                  name='hoTen'
                  value='Không'
                />
              </RadioGroup>
              <RadioGroup label='Người từ nước có bệnh COVID-19	'>
                <Radio
                  name='hoTen'
                  value='Có'
                />
                <Radio
                  name='hoTen'
                  value='Không'
                />
              </RadioGroup>
              <RadioGroup label='Người có biểu hiện (Sốt, ho, khó thở , Viêm phổi)	'>
                <Radio
                  name='hoTen'
                  value='Có'
                />
                <Radio
                  name='hoTen'
                  value='Không'
                />
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
  )
}
export default MedicalForm

MedicalForm.getLayout = (page) => <Layout>{page}</Layout>;
