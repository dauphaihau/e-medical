import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {PencilIcon, TrashIcon} from "@heroicons/react/outline";

import Input from "../../../components/form/input";
import Select from "../../../components/form/select";
import Layout from "../../../components/layout";
import Button from "../../../components/button";
import {classroomService} from "../../../services";
import Pagination from "../../../components/table/pagination";

let skip = 0;

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
      <Link href='/to-chuc/lop/them-lop'>
        <a>
          <Button>Thêm mới</Button>
        </a>
      </Link>
      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <div className='container-table'>
          <h4>Lớp</h4>
          <table className='table'>
            <thead>
              <tr>
                <th className='text-center'>STT</th>
                <th>Tên lớp</th>
                <th>Số học sinh</th>
                <th>Giáo viên chủ nhiệm</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              {listClassroom?.map((cr, index) => (
                <tr key={index}>
                  <td>{parseInt(skip) + index + 1}</td>
                  <td>{cr.className}</td>
                  <td></td>
                  <td></td>
                  <td>
                     <Link href={`/to-chuc/lop/${cr._id}`}>
                       <a><PencilIcon className='h-5 w-5 inline'/></a>
                     </Link>
                     <TrashIcon
                       className='h-5 w-5 inline ml-4 cursor-pointer'
                       onClick={() => handleDelete(cr._id)}
                     />
                  </td>
              </tr>
              ))}
            </tbody>
          </table>
          <Pagination data={listClassroom}/>
        </div>
      </div>
    </>
  );
}

export default ClassroomList;

ClassroomList.getLayout = (page) => <Layout>{page}</Layout>;