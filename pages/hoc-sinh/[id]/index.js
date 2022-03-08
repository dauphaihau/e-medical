import {Formik, Form} from "formik";
import Link from "next/link";
import {useRouter} from "next/router";

import {CheckIcon, EyeIcon} from "@heroicons/react/outline";
import Input from "@components/form/input";
import Radio, {RadioGroup} from "@components/form/radio";
import Layout from "@components/layout";
import Button from "@components/button";
import Textarea from "@components/form/textarea";
import Select from "@components/form/select";
import Table from "@components/table";
import * as Yup from "yup";

const arrData = [
  {type: 'BCG (Lao)', icon: <CheckIcon/>, icon2: <CheckIcon/>,},
  {type: 'Bạch hầu, ho gà, uốn ván', icon: <CheckIcon/>, icon2: <CheckIcon/>},
  {type: 'Bại liệt', icon: <CheckIcon/>, icon2: <CheckIcon/>, icon3: ''},
  {type: 'Viêm gan B', icon: <CheckIcon/>, icon2: '', icon3: <CheckIcon/>},
  {type: 'Sởi', icon: <CheckIcon/>, icon2: '', icon3: <CheckIcon/>},
  {type: 'Viêm não Nhật bản B', icon: <CheckIcon/>, icon2: '', icon3: <CheckIcon/>},
];


const validationSchema = Yup.object().shape({
  schoolname: Yup.string().required('Họ Tên không được để trống').min(5, 'Họ Tên ít nhất là 5 ký tự').max(50, 'Họ Tên tối đa là 50 ký tự'),
  schoolname2: Yup.string().required('Ngày sinh không được để trống'),
  schoolname3: Yup.string().required('Địa chỉ không được để trống'),
  schoolname4: Yup.string().required('Chiều cao không được để trống'),
  schoolname5: Yup.string().required('Cân nặng không được để trống'),
  schoolname6: Yup.string().required('Thời gian không được để trống'),
  schoolname7: Yup.string().required('Loại không được để trống'),
});

const DetailStudent = () => {

  const router = useRouter();

  const handleSubmitForm = async (values) => {
    console.log(values);
  };

  const columns = [
    {
      id: 'time',
      title: 'Thời gian',
    },
    {
      id: 'type',
      title: 'Loại theo dõi',
    },
    {
      id: 'note',
      title: 'Ghi chú',
    },
    {
      id: 'action',
      title: 'Xem chi tiết',
      render: (element) => (
        <>
          <Link href={`/hoc-sinh/them-hoc-sinh/${element._id}`}>
            <a><EyeIcon className='h-5 w-5 inline'/></a>
          </Link>
        </>
      )
    }
  ]

  const rows = [
    {
      time: "08:00 - 12/04/2021",
      type: 'Theo dõi thể lực, huyết áp, Nhịp tim & Thị lực',
      note: 'Bình thường',
    },
  ];

  return (
    <>
      <div className='flex flex-col lg:flex-row gap-y-4 lg:gap-x-4 mb-4'>
        <Button>SỔ THEO DÕI SỨC KHỎE HỌC SINH</Button>
        <Link href={`/hoc-sinh/${router.query.id}/covid-19`}>
          <a>
            <Button className='bg-primary-light text-black'>THEO DÕI PHÒNG CHỐNG DỊCH COVID-19</Button>
          </a>
        </Link>
      </div>
      <Formik
        onSubmit={handleSubmitForm}
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={{}}
      >
        {({
            handleChange,
            values
          }) => (
          <Form className='form'>
            <div className='flex flex-col lg:flex-row gap-y-4 lg:gap-x-4 mb-4 lg:justify-end'>
              <Button>Thêm thông tin theo dõi sức khỏe</Button>
              <Button>Hồ sơ KSK định kỳ</Button>
            </div>
            <h3>Thông tin cá nhân</h3>
            <div className='grid lg:grid-cols-2 gap-x-6'>
              <Input label='Họ và tên'/>
              <Input label='Ngày sinh'/>
            </div>
            <RadioGroup label='Giới Tính'>
              <Radio
                className='mb-4'
                name='hoTen'
                value='Hình chữ S'
              />
              <Radio
                className='mb-4'
                name='hoTen'
                value='Hình chữ C'
              />
            </RadioGroup>
            <Input label='Địa chỉ'/>
            <h3 className='mt-16'>Thông tin liên hệ</h3>
            <div className="grid lg:grid-cols-2 gap-x-6">
              <Input label='Tên cha'/>
              <Input label='Tên mẹ'/>
              <Input label='SDT cha'/>
              <Input label='SDT mẹ'/>
              <Input label='Người thân'/>
              <Input label='SDT người thân'/>
            </div>
            <h3 className='mt-16'>Thông tin sức khỏe cơ bản</h3>
            <div className="grid lg:grid-cols-2 gap-x-6">
              <Input label='Chiều cao (m)'/>
              <Input label='Cân nặng (kg)'/>
            </div>
            <RadioGroup label='Sản khoa' direction='flex-col'>
              <Radio
                name='hoTen'
                value='Bình thường'
              />
              <Radio
                name='hoTen'
                value='Mẹ mắc bệnh khi mang thai'
              />
            </RadioGroup>
            <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
              <div className='container-table w-[800px] lg:w-[47%]'>
                <h4>Tiêm chủng</h4>
                <table className='table'>
                  <thead className='bg-gray-100'>
                    <tr>
                      <th className='text-center' rowSpan='2'>STT</th>
                      <th rowSpan='2'>Loại Vacxin</th>
                      <th colSpan='3' className=''>Tình trạng tiêm/uống </th>
                    </tr>
                    <tr>
                      <th rowSpan='1'>Có</th>
                      <th colSpan='1'>Không</th>
                      <th colSpan='1'>Không nhớ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arrData?.map((benh, index) => (
                     <tr key={index}>
                        <td>{parseInt(0) + index + 1}</td>
                        <td>{benh.type}</td>
                        <td><figure className='h-4 w-4'>{benh.icon}</figure></td>
                        <td><figure className='h-4 w-4'>{benh.icon2}</figure></td>
                        <td><figure className='h-4 w-4'>{benh.icon3}</figure></td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Textarea
              classNameLabel='font-medium'
              className='w-full mt-8' label='Các bệnh đang điều trị:'
            />
            <h3 className='mt-16'>Lịch sử theo dõi sức khỏe</h3>
            <div className="grid lg:grid-cols-6 gap-x-6">
              <Select placeholder='Thời gian' options={[]}/>
              <Select placeholder='Loại theo dõi' options={[]}/>
            </div>
            <Table columns={columns} rows={rows} widthContainer='w-[800px]'/>
            <div className='flex justify-end gap-x-4 mt-8'>
              <Button>Huỷ</Button>
              <Button type='submit'>Cập nhật thông tin</Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default DetailStudent;

DetailStudent.getLayout = (page) => <Layout>{page}</Layout>;
