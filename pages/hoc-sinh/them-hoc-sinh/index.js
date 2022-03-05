import {Formik, Form} from "formik";
import Link from "next/link";
import {PencilIcon, TrashIcon, CheckIcon} from "@heroicons/react/outline";

import Input from "@components/form/input";
import Radio, {RadioGroup} from "@components/form/radio";
import Layout from "@components/layout";
import Button from "@components/button";
import Textarea from "@components/form/textarea";
import Select from "@components/form/select";
import Pagination from "@components/table/pagination";

const arrData = [
  {type: 'BCG (Lao)', icon: <CheckIcon/>, icon2: <CheckIcon/>,},
  {type: 'Bạch hầu, ho gà, uốn ván', icon: <CheckIcon/>, icon2: <CheckIcon/>},
  {type: 'Bại liệt', icon: <CheckIcon/>, icon2: <CheckIcon/>, icon3: ''},
  {type: 'Viêm gan B', icon: <CheckIcon/>, icon2: '', icon3: <CheckIcon/>},
  {type: 'Sởi', icon: <CheckIcon/>, icon2: '', icon3: <CheckIcon/>},
  {type: 'Viêm não Nhật bản B', icon: <CheckIcon/>, icon2: '', icon3: <CheckIcon/>},
];

const tbodyData = [
  {
    id: "1",
    items: [" 08:00 - 12/04/2021", "Theo dõi thể lực, huyết áp, Nhịp tim & Thị lực", "Bình thường", "Chi tiết"],
  },
  {
    id: "2",
    items: [" 08:00 - 12/04/2021", "Theo dõi thể lực, huyết áp, Nhịp tim & Thị lực", "Bình thường", "Chi tiết"],
  },
  {
    id: "3",
    items: [" 08:00 - 12/04/2021", "Theo dõi thể lực, huyết áp, Nhịp tim & Thị lực", "Bình thường", "Chi tiết"],
  },
];

const AddStudent = () => {

  const handleSubmitForm = async (values) => {
    console.log(values);
  };

  return (
    <Formik
      onSubmit={handleSubmitForm}
      enableReinitialize
    >
      {({
          handleChange,
        }) => (
        <Form className='form'>
          <h3>Thông tin cá nhân</h3>
          <div className='grid lg:grid-cols-2 gap-x-6'>
            <Input label='Họ và tên'/>
            <Input label='Ngày sinh'/>
          </div>
          <RadioGroup label='Giới Tính'>
            <Radio name='sex' value='Nam'/>
            <Radio name='sex' value='Nữ'/>
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
          <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
            <div className='container-table w-[800px] lg:w-full'>
              <table className='table'>
                <thead>
              <tr>
                <th>Thời gian</th>
                <th>Loại theo dõi</th>
                <th>Ghi chú</th>
                <th>Xem chi tiết</th>
              </tr>
                </thead>
                <tbody>
                  {tbodyData.map((e, index) => (
                    <tr key={index}>
                      {e.items.map(item => (
                        <td key={Math.random()}>{item}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination data={[]}/>
            </div>
          </div>

          <div className='flex justify-end gap-x-4 mt-8'>
            <Link href='/hoc-sinh'>
              <a><Button>Huỷ</Button></a>
            </Link>
            <Button type='submit'>Cập nhật thông tin</Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
export default AddStudent;

AddStudent.getLayout = (page) => <Layout>{page}</Layout>;
