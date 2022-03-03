import {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {PencilIcon, TrashIcon} from "@heroicons/react/outline";

import Input from "../../../components/form/input";
import Layout from "../../../components/layout";
import Button from "../../../components/button";
import schoolYearService from "../../../services/organize/school-year";
import Pagination from "../../../components/table/pagination";

const skip = 0;

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
    try {
      await schoolYearService.delete(id)
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
      <Link href='/to-chuc/nien-khoa/them-nien-khoa'>
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
                <th>Thời gian bắt đầu</th>
                <th>Thời gian kết thúc</th>
                <th/>
              </tr>
              </thead>
              <tbody>
                {listSchoolYear?.map((item, index) => (
                  <tr key={index}>
                  <td>{parseInt(skip) + index + 1}</td>
                  <td>{item.schoolYearName}</td>
                  <td/>
                  <td/>
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

SchoolYearList.getLayout = (page) => <Layout>{page}</Layout>;
