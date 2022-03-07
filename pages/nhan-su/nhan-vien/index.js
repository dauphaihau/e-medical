import Link from "next/link";
import {useRouter} from "next/router";

import Input from "@components/form/input";
import Table from "@components/table";
import Layout from "@components/layout";
import Select from "@components/form/select";
import Button from "@components/button";
import {EyeIcon} from "@heroicons/react/outline";


const StaffList = () => {

  const router = useRouter();

  const columns = [
    {
      id: 'id',
      title: 'STT',
      key: 'id'
    },
    {
      id: 'idStaff',
      title: 'Mã nhân viên',
    },
    {
      id: 'info',
      title: 'Thông tin nhân viên',
    },
    {
      id: 'action',
      title: 'Thao tác',
      render: (element) => (
        <>
          <Link href={router.pathname + '/' + element._id}>
          </Link>
            <a><EyeIcon className='h-5 w-5 inline'/></a>
        </>
      )
    }
  ]

  return (
    <>
      <h4>Nhân viên</h4>
      <div className='grid-container'>
        <Input placeholder='Tìm kiếm...'/>
        <Select options={[]} placeholder='Thời gian'/>
      </div>
      <Link href='/nhan-su/nhan-vien/them'>
        <a><Button>Thêm mới</Button></a>
      </Link>
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <Table
          titleTable='Nhân viên y tế'
          columns={columns}
        />
      </div>
    </>
  );
}

export default StaffList;

StaffList.getLayout = (page) => <Layout>{page}</Layout>;
