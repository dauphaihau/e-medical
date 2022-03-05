import {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {PencilIcon, TrashIcon} from "@heroicons/react/outline";

import Input from "@components/form/input";
import Layout from "@components/layout";
import Button from "@components/button";
import {schoolService} from "@services";
import Table from "@components/table";

const SchoolList = () => {

  const [schools, setSchools] = useState([])
  const router = useRouter();
  console.log('schools', schools);

  const columns = [
    {
      id: 'id',
      title: 'STT',
      key: 'id'
    },
    {
      id: 'schoolname',
      title: 'Tên trường',
    },
    {
      id: 'address',
      title: 'Địa chỉ',
    },
    {
      id: 'province',
      title: 'Tỉnh',
    },
    {
      id: 'district',
      title: 'Quận',
    },
    {
      id: 'ward',
      title: 'Phường',
    },
    {
      id: 'civilGroup',
      title: 'Nhóm trường',
    },
    {
      id: 'action',
      title: 'Thao tác',
      render: (element) => (
        <>
          <Link href={`/to-chuc/truong/${element._id}`}>
            <a><PencilIcon className='h-5 w-5 inline'/></a>
          </Link>
          <TrashIcon
            className='h-5 w-5 inline ml-4 cursor-pointer'
            onClick={() => handleDelete(element._id)}
          />
        </>
      )
    }
  ]

  useEffect(async () => {
    try {
      const {...response} = await schoolService.list()
      setSchools(response.data)
    } catch (error) {
      console.log({error})
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      await schoolService.delete(id)
      await swal('Xoá thành công');
      router.reload();
    } catch (error) {
      console.log({error})
    }
  };

  return (
    <>
      <h4>Tổ chức</h4>
      <Input className='md:w-1/2 lg:w-1/4' placeholder='Tìm kiếm...'/>
      <Link href='/to-chuc/truong/them-truong'>
        <a><Button>Thêm mới</Button></a>
      </Link>
      <Table columns={columns} rows={schools} widthContainer='w-[1200px]'/>
    </>
  );
}

export default SchoolList;

SchoolList.getLayout = (page) => <Layout>{page}</Layout>;
