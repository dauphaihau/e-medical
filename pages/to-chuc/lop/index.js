import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {PencilIcon, TrashIcon} from "@heroicons/react/outline";

import Input from "@components/form/input";
import Select from "@components/form/select";
import Button from "@components/button";
import {classroomService} from "@services";
import Pagination from "@components/table/pagination";
import swal from "sweetalert";

let skip = 0;

const ClassroomList = () => {

  const [listClassroom, setListClassroom] = useState()
  const router = useRouter();

  useEffect( () => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady]);

  const loadInit = async () => {
    const listClass = await classroomService.list();
    setListClassroom(listClass);
  }

  const handleDelete = async (id) => {
    swal({
      title: "Bạn chắc chắn muốn xóa?",
      text: "",
      icon: "warning",
      buttons: true,
      successMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await classroomService.delete(id)
        if(result){
          router.reload();
        }
        else{
          swal('Xóa không thành công!!', '', 'error');
        }
      }
    });
  };

  return (
    <>
      <h4>Lớp</h4>
      <div className='grid-container'>
        <Input name="s" placeholder='Tìm kiếm...'/>
        <Select
          name="schoolYear"
          options={[]}
          placeholder='Chọn niên khoá'
        />
        <Select
          name="classGroup"
          options={[]}
          placeholder='Khối'
        />
      </div>

      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <div className='container-table'>
          <table className='table'>
            <thead>
              <tr>
                <th className='w-2 text-center'>STT</th>
                <th>Tên lớp</th>
                <th>Số học sinh</th>
                <th>Giáo viên chủ nhiệm</th>
                <th className="w-[100px]"/>
              </tr>
            </thead>
            <tbody>
              {listClassroom && listClassroom.total
              ? (
                listClassroom.data.map((cr, index) => (
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
                ))
              )
              : (<tr><td colSpan={5}>Chưa có dữ liệu</td></tr>)
              }
              {}
            </tbody>
          </table>
          <Pagination data={listClassroom}/>
        </div>
      </div>
    </>
  );
}

export default ClassroomList;