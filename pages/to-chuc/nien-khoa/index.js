import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";

import Input from "@components/form/input";
import Button from "@components/button";
import { schoolYearService } from "@services";
import Pagination from "@components/table/pagination";
import swal from "sweetalert";
import {PencilIcon, TrashIcon} from "@heroicons/react/outline";

const SchoolYearList = () => {

  const [listSchoolYear, setListSchoolYear] = useState([])
  const router = useRouter();

  useEffect(async () => {
    try {
      const {...response} = await schoolYearService.list()
      setListSchoolYear(response.data)
    } catch (error) {
      console.log({error})
    }
  }, []);

  const handleDelete = async (id) => {
    swal({
      title: "Bạn chắc chắn muốn xóa?",
      text: "",
      icon: "warning",
      buttons: true,
      successMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await schoolYearService.delete(id)
        if(result){
          router.reload();
        }
        else{
          swal('Xóa không thành công!!', '', 'error');s
        }
      }
    });
  };

  return (
    <>
      <h4>Tổ chức</h4>
      <Input className='md:w-1/2 lg:w-1/4' placeholder='Tìm kiếm...'/>
      <Link href='/to-chuc/nien-khoa/them'>
        <a><Button>Thêm mới</Button></a>
      </Link>
        <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
          <div className='container-table'>
            <h4>Niên Khoá</h4>
            <table className='table'>
              <thead>
              <tr>
                <th className='text-center'>STT</th>
                <th>Niên khoá</th>
                <th>Số lớp</th>
                <th>Số học sinh</th>
                <th/>
              </tr>
              </thead>
              <tbody>
                {listSchoolYear?.map((item, idz) => (
                  <tr key={idz}>
                    <td>{skip + idz + 1}</td>
                    <td>{item.schoolYearName}</td>
                    <td/>
                    <td/>
                    <td>
                      <Link href={`/to-chuc/nien-khoa/${item._id}`}>
                        <a><PencilIcon className='h-5 w-5 inline'/></a>
                      </Link>
                      <TrashIcon
                        className='h-5 w-5 inline ml-4 cursor-pointer'
                        onClick={() => handleDelete(item._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination data={listSchoolYear}/>
          </div>
        </div>
    </>
  );
}
export default SchoolYearList;
