import Link from "next/link";
import {useRouter} from "next/router";

import Layout from "@components/layout";
import Button from "@components/button";
import Table from "@components/table";
import {EyeIcon} from "@heroicons/react/outline";

const columns1 = [
  {
    id: 'id',
    key: 'id',
    title: 'STT',
  },
  {
    id: 'vaccine',
    title: 'Mũi tiêm',
  },
  {
    id: 'type',
    title: 'Loại Vacccine',
  },
  {
    id: 'date',
    title: 'Ngày tiêm',
  },
  {
    id: 'whoinfect',
    title: 'Đơn vị tiêm chủng',
  },
]
const columns2 = [
  {
    id: 'id',
    key: 'id',
    title: 'STT',
  },
  {
    id: 'date',
    title: 'Ngày khai báo',
  },
  {
    id: 'status',
    title: 'Tình trạng sức khoẻ',
  },
  {
    id: 'action',
    title: 'Xem chi tiết',
    render: (element) => (
      <>
        <Link
          // href={`/hoc-sinh/them-hoc-sinh/${element._id}`}
        >
          <a><EyeIcon className='h-5 w-5 inline'/></a>
        </Link>
      </>
    )
  }
]
const columns3 = [
  {
    id: 'id',
    key: 'id',
    title: 'STT',
  },
  {
    id: 'date2',
    title: 'Ngày phát hiện',
  },
  {
    id: 'date',
    title: 'Ngày khỏi',
  },
  {
    id: 'action',
    title: 'Xem chi tiết',
    render: (element) => (
      <>
        <Link
          // href={`/hoc-sinh/them-hoc-sinh/${element._id}`}
        >
          <a><EyeIcon className='h-5 w-5 inline'/></a>
        </Link>
      </>
    )
  }
]

const CovidForm = () => {

  const router = useRouter();

  return (
    <>
      <div className='flex flex-col lg:flex-row gap-y-4 lg:gap-x-4 mb-4 w-2/3'>
        <Link href={`/hoc-sinh/${router.query.id}`}>
          <a>
            <Button className='bg-primary-light text-black'>SỔ THEO DÕI SỨC KHỎE HỌC SINH</Button>
          </a>
        </Link>
        <Button>THEO DÕI PHÒNG CHỐNG DỊCH COVID-19</Button>
      </div>
      <div className='form'>
        <div className='flex justify-end gap-x-4 mb-8 lg:mb-0'>
          <Link href={`/hoc-sinh/${router.query.id}/covid-19/tiem-chung`}>
            <a><Button>Khai báo thông tin tiêm chủng</Button></a>
          </Link>
          <Link href={`/hoc-sinh/${router.query.id}/covid-19/y-te`}>
            <a><Button>Khai báo y tế</Button></a>
          </Link>
          <Link href={`/hoc-sinh/${router.query.id}/covid-19/f0`}>
            <a><Button>Khai báo F0</Button></a>
          </Link>
        </div>
        <h3>Thông tin liên hệ</h3>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-x-6'>
          <div>
            <p>Họ và tên</p>
            <p>Số điện thoại</p>
            <p>Giới tính</p>
            <p>Địa chỉ</p>
          </div>
          <div>
            {['Cong Hau', '0901111921', 'Nam', 'Q1'].map(item => <p key={item}>{item}</p>)}
          </div>
        </div>
        <Table
          columns={columns1}
          widthContainer='w-[1000px]'
        />
        <Table
          columns={columns2}
          widthContainer='w-[1000px]'
        />
        <Table
          columns={columns3}
          widthContainer='w-[1000px]'
        />
        <div className='flex justify-end gap-x-4 mt-8'>
          <Button>Huỷ</Button>
          <Button type='submit'>Cập nhật thông tin</Button>
        </div>
      </div>
    </>
  );
}
export default CovidForm;

CovidForm.getLayout = (page) => <Layout>{page}</Layout>;
