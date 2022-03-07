import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";

import {PencilIcon, TrashIcon} from "@heroicons/react/outline";
import Input from "@components/form/input";
import Layout from "@components/layout";
import Button from "@components/button";
import schoolYearService from "@services/organize/school-year";
import Table from "@components/table";


const SchoolYearList = () => {

  const [listSchoolYear, setListSchoolYear] = useState([])
  const router = useRouter();

  useEffect(async () => {
    try {
      const {...response} = await schoolYearService.list()
      setListSchoolYear(response.data)
      // console.log('response-data', response.data);
    } catch (error) {
      console.log({error})
    }
  }, []);


  const handleDelete = async (id) => {
    try {
      await schoolYearService.delete(id)
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
      id: 'schoolYearName',
      title: 'Niên khoá',
    },
    {
      id: 'address',
      title: 'Số lớp',
    },
    {
      id: 'province',
      title: 'Số học sinh',
    },
    {
      id: 'district',
      title: 'Thời gian bắt đầu',
    },
    {
      id: 'ward',
      title: 'Thời gian kết thúc',
    },
    {
      id: 'action',
      title: 'Thao tác',
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
      <Input className='md:w-1/2 lg:w-1/4' placeholder='Tìm kiếm...'/>
      <Link href={router.pathname + '/' + 'them'}>
        <a><Button>Thêm mới</Button></a>
      </Link>
      <Table
        columns={columns} rows={listSchoolYear}
        widthContainer='w-[1200px]'
        titleTable='Niên Khoá'
      />
    </>
  );
}

export default SchoolYearList;

SchoolYearList.getLayout = (page) => <Layout>{page}</Layout>;
