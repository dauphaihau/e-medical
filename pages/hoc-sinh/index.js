import Link from "next/link";
import {useRouter} from "next/router";

import Input from "@components/form/input";
import Select from "@components/form/select";
import Table from "@components/table";
import Layout from "@components/layout";
import Button from "@components/button";
import {EyeIcon} from "@heroicons/react/outline";

const Student = () => {

  const router = useRouter();

  const columns = [
    {
      id: 'id',
      title: 'STT',
      key: 'id'
    },
    {
      id: 'name',
      title: 'Họ và tên',
    },
    {
      id: 'className',
      title: 'Tên lớp',
    },
    {
      id: 'action',
      title: 'Xem chi tiết',
      align: 'center',
      render: (element) => (
        <>
          <Link href={router.pathname + '/' + element._id}>
            <a><EyeIcon className='h-5 w-5 inline'/></a>
          </Link>
        </>
      )
    }
  ]

  const rows = [
    {
      _id: "1",
      name: 'Sir Tran',
      className: '1A'
    },
  ];

  return (
    <>
      <h4>Hồ sơ học sinh</h4>
      <div className="grid-container">
        <Input placeholder="Tìm kiếm"/>
        <Select name='test' options={[]}/>
        <Select name='test2' options={[]}/>
        <Select name='test3' options={[]}/>
      </div>
      <Link href='/hoc-sinh/them-hoc-sinh'>
        <a><Button className='mr-4 mb-4 lg:mb-0'>Thêm học sinh</Button></a>
      </Link>
      <Link href='/hoc-sinh/them-kskdk'>
        <a><Button>Tạo mẫu quản lý sức khoẻ định kỳ</Button></a>
      </Link>
      <Table
        columns={columns} rows={rows}
        titleTable="Danh sách hồ sơ học sinh"
        widthContainer='w-[1200px]'
      />
    </>
  )
}
export default Student

Student.getLayout = (page) => <Layout>{page}</Layout>;
