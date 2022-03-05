import {Formik, Form} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/router";
import swal from "sweetalert";
import Link from "next/link";

import Button from "@components/button";
import Input from "@components/form/input";
import Layout from "@components/layout";
import Radio, {RadioGroup} from "@components/form/radio";
import Select from "@components/form/select";
import Checkbox from "@components/form/checkbox";
import Textarea from "@components/form/textarea";

const validationSchema = Yup.object().shape({});

const F0Form = () => {
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
          <div>
            <p className='font-bold text-base'>Chẩn đoán nhiễm Covid-19</p>
            <RadioGroup>
              <Radio name='F10' value='Là F1'/>
              <Radio name='F10' value='Là F0'/>
            </RadioGroup>
          </div>
          <Select
            className='w-1/2'
            name='schoolYearId'
            onChange={e => setFieldValue('schoolYearId', e.value)}
            options={[]}
            placeholder='Ngày phát hiện'
            useFokmik='true'
          />
          <div>
            <RadioGroup>
              <Radio name='test' value='Chưa test'/>
              <Radio name='test' value='Đã test'/>
            </RadioGroup>
          </div>
          <div className='grid-container lg:grid-cols-2 gap-x-8 mb-4'>
            <div>
              <Checkbox label='Test nhanh'/>
              <Input
                label='Ngày test'
                name='name'
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label='Ngày test'
                name='address'
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <Checkbox label='PCR' />
              <Input
                label='Chỉ số CT'
                name='phoneNumber'
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label='Chỉ số CT'
                name='phoneNumber'
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <Textarea
            placeholder='Đã tiếp xúc với abc ở xyz'
            classNameLabel='font-medium'
            className='w-full' label='Tiền sử tiếp xúc gần với F0 (Tiếp xúc ai? Lúc nào?)'
          />
          <Button type='submit' className='mr-2'>Lưu</Button>
          <Link href='/hoc-sinh/them-hoc-sinh/covid-19'>
            <a><Button type='text'>Huỷ</Button></a>
          </Link>
        </Form>
      )}
    </Formik>
  )
}
export default F0Form

F0Form.getLayout = (page) => <Layout>{page}</Layout>;
