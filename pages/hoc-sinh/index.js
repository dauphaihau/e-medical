import Link from "next/link";

import Input from "@components/form/input";
import Select from "@components/form/select";
import Table from "@components/table";
import Layout from "@components/layout";
import Button from "@components/button";
import {EyeIcon} from "@heroicons/react/outline";


const Student = () => {

  const rows = [
    {
      id: "1",
      name: 'Sir Tran',
      className: '1A'
    },
  ];

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
      render: (element) => (
        <>
          <Link href={`/hoc-sinh/${element._id}`}>
            <a><EyeIcon className='h-5 w-5 inline'/></a>
          </Link>
        </>
      )
    }
  ]

  return (
    <>
      <h4>Hồ sơ học sinh</h4>
      <div className="grid-container">
        <Input placeholder="Tìm kiếm"/>
        <Select name='ohshit' options={[]}/>
        <Select name='ohshit2' options={[]}/>
        <Select name='ohshit3' options={[]}/>
      </div>

      <Link href='/hoc-sinh/them-hoc-sinh'>
        <a><Button className='mr-4'>Thêm học sinh</Button></a>
      </Link>
      <Link href='/hoc-sinh/them-kskdk'>
        <a><Button>Tạo mẫu quản lý sức khoẻ định kỳ</Button></a>
      </Link>
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <Table
          columns={columns} rows={rows}
          titleTable="Danh sách hồ sơ học sinh"
        />
      </div>
    </>
  )
}
export default Student

Student.getLayout = (page) => <Layout>{page}</Layout>;
