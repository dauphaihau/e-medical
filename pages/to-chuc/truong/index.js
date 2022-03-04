import {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {PencilIcon, TrashIcon} from "@heroicons/react/outline";

import Input from "../../../components/form/input";
import Layout from "../../../components/layout";
import Button from "../../../components/button";
import {schoolService} from "../../../services";
import Pagination from "../../../components/table/pagination";

const SchoolList = () => {

  const [schools, setSchools] = useState([])
  const router = useRouter();

  useEffect(async () => {
    try {
      const {...response} = await schoolService.list()
      setSchools(response.data)
    } catch (error) {
      console.log({error})
    }
  }, []);

  let skip = 0;

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
        <a>
          <Button>Thêm mới</Button>
        </a>
      </Link>
      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <div className='container-table'>
          <h4>Danh sách trường</h4>
          <table className='table'>
            <thead>
              <tr>
                <th className='text-center'>STT</th>
                <th>Tên trường</th>
                <th>Địa chỉ</th>
                <th>Tỉnh</th>
                <th>Quận</th>
                <th>Phường</th>
                <th>Nhóm trường</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              {schools?.map((school, index) => (
                <tr key={index}>
                  <td>{parseInt(skip) + index + 1}</td>
                  <td>{school.schoolname}</td>
                  <td>{school.address}</td>
                  <td>{school.province}</td>
                  <td>{school.district}</td>
                  <td>{school.ward}</td>
                  <td>{school.civilGroup}</td>
                  <td>
                     <Link href={`/to-chuc/truong/${school._id}`}>
                       <a><PencilIcon className='h-5 w-5 inline'/></a>
                     </Link>
                     <TrashIcon
                       className='h-5 w-5 inline ml-4 cursor-pointer'
                       onClick={() => handleDelete(school._id)}
                     />
                  </td>
              </tr>
              ))}
            </tbody>
          </table>
          <Pagination data={schools}/>
        </div>
      </div>
    </>
  );
}

export default SchoolList;

SchoolList.getLayout = (page) => <Layout>{page}</Layout>;
