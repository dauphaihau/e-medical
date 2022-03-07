import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";

import {PencilIcon, TrashIcon} from "@heroicons/react/outline";
import Input from "@components/form/input";
import Select from "@components/form/select";
import Layout from "@components/layout";
import Button from "@components/button";
import {classroomService} from "@services";
import Table from "@components/table";


const ClassroomList = () => {

  const [listClassroom, setListClassroom] = useState()
  const router = useRouter();

  useEffect(async () => {
    try {
      const {...response} = await classroomService.list()
      console.log(response);
      setListClassroom(response.data)
    } catch (error) {
      console.log({error})
    }
  }, []);


  const handleDelete = async (id) => {
    try {
      await classroomService.delete(id)
      await swal('Xoá thành công');
      router.reload();
    } catch (error) {
      console.log({error})
    }
  };

  const columns = [
    {
      id: 'id',
      title: 'STT',
      key: 'id'
    },
    {
      id: 'className',
      title: 'Tên lớp',
    },
    {
      id: 'amountStudent',
      title: 'Số học sinh',
    },
    {
      id: 'teacher',
      title: 'Giáo viên chủ nhiệm',
    },
    {
      id: 'action',
      title: 'Xem chi tiết',
      render: (element) => (
        <>
          <Link href={router.pathname + '/' + element._id}>
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

  return (
    <>
      <h4>Tổ chức</h4>
      <div className='grid-container'>
        <Input placeholder='Tìm kiếm...'/>
        <Select
          options={[]}
          placeholder='Chọn niên khoá'
        />
        <Select
          options={[]}
          placeholder='Khối'
        />
      </div>
      <Link href={router.pathname + '/' + 'them'}>
        <a><Button>Thêm mới</Button></a>
      </Link>
      <Table columns={columns} rows={listClassroom} titleTable='Lớp' widthContainer='w-[1200px]'/>
    </>
  );
}

export default ClassroomList;

ClassroomList.getLayout = (page) => <Layout>{page}</Layout>;