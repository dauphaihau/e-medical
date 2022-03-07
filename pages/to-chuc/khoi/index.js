import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import swal from "sweetalert";
import Input from "@components/form/input";
import Button from "@components/button";
import {classroomService} from "@services";
import {PencilIcon, TrashIcon} from "@heroicons/react/outline";
import Pagination from "@components/table/pagination";

let skip = 0;

const GroupList = () => {
  const router = useRouter();
  const [listGroup, setListGroup] = useState()
  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady])

  const loadInit = async () => {
    const listGroup = await classroomService.listGroup();
    setListGroup(listGroup);
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
        const result = await classroomService.deleteGroup(id);
        if(result){
          router.reload();
        }
        else{
          swal('Xóa không thành công!!', '', 'error');s
        }
      }
    });  
  }

  return (
    <>
      <h4>Khối</h4>
      <div className='grid-container'>
        <Input placeholder='Tìm kiếm ..'/>
      </div>
      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <div className='container-table'>
          <table className='table'>
            <thead>
              <tr>
                <th className='text-center w-1'>STT</th>
                <th>Tên khối</th>
                <th>Trường</th>
                <th className="w-[100px]"/>
              </tr>
            </thead>
            <tbody>
            {listGroup && listGroup.total
              ? (
                listGroup.data.map((group, index) => (
                  <tr key={index}>
                    <td>{skip + index + 1}</td>
                    <td>{group.className}</td>
                    <td></td>
                    <td>
                      <Link href={`/to-chuc/khoi/${group._id}`}>
                        <a><PencilIcon className='h-5 w-5 inline'/></a>
                      </Link>
                      <TrashIcon
                        className='h-5 w-5 inline ml-4 cursor-pointer'
                        onClick={() => handleDelete(group._id)}
                      />
                    </td>
                  </tr>
                ))
              )
              :(
                <tr><td colSpan={4}>Chưa có dữ liệu</td></tr>
              )
            }
            </tbody>
          </table>
          {/*<Pagination data={listClassroom}/>*/}
      </div>
      </div>
    </>
  );
}

export default GroupList;
