import Link from "next/link";
import {useEffect, useState} from "react";

import Input from "@components/form/input";
import Layout from "@components/layout";
import Select from "@components/form/select";
import Button from "@components/button";
import {classroomService} from "@services";
import {PencilIcon, TrashIcon} from "@heroicons/react/outline";
import Table from "@components/table";

const GroupList = () => {

  const [listGroup, setListGroup] = useState()

  useEffect(async () => {
    try {
      // get class
      const {...res} = await classroomService.list();

      // get group
      // const {...res} = await classroomService.list({type: 'group'});

      console.log('res', res);
      setListGroup(res.data)
      // setListClassroom(response.data)
    } catch (error) {
      console.log({error})
    }
  }, [])

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
      title: 'Tên khối',
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
      title: 'Thao tác',
      render: (element) => (
        <>
          <Link href={`/to-chuc/khoi/${element._id}`}>
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
        <Input placeholder='Tìm kiếm ..'/>
        <Select
          name='schoolYear'
          options={[]}
          placeholder='Chọn niên khoá'
        />
      </div>
      <Link href='/to-chuc/khoi/them-khoi'>
        <a><Button>Thêm mới</Button></a>
      </Link>
      <Table
        columns={columns} rows={listGroup}
        widthContainer='w-[1200px]'
        titleTable='Khối'
      />
    </>
  );
}

export default GroupList;

GroupList.getLayout = (page) => <Layout>{page}</Layout>;
