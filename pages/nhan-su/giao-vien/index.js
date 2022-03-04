import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import { memberService } from "@services";
import Link from 'next/link'
import { PencilAltIcon } from '@heroicons/react/solid';
import Input from "@components/form/input";
import Button from "../../components/button";
import Link from "next/link";

const Teacher = () => {
  const router = useRouter();
  const [members, setMembers] = useState();

  useEffect(() => {
    loadInit();
  }, []);

  const loadInit = async () => {
    const listMember = await memberService.list();
    setMembers(listMember);
  }

  return (
    <>
      <h4>Danh sách giáo viên</h4>
      <Input className='md:w-1/2 lg:w-1/4' name='search' placeholder='Tìm kiếm...'/>
      <Link href='/nhan-su/giao-vien/them'>
        <a><Button>Thêm mới</Button></a>
      </Link>
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <div className='container-table'>
          <table className='table'>
            <thead>
            <tr>
              <th className="w-3">STT</th>
              <th className="text-left">Nhân viên</th>
              <th className="text-left">Phone</th>
              <th className="text-left">Lớp CN</th>
              <th className="w-5"></th>
            </tr>
            </thead>
            <tbody>
              {members?.total?
                members.data.map( (row, idz) => (
                  <tr key={idz}>
                    <td>{idz+1}</td>
                    <td>{row.fullName}</td>
                    <td>{row.phoneNumber}</td>
                    <td>{(row.schoolWorking && row.schoolWorking.length) ? row.schoolWorking[0].className : ''}</td>
                    <td>
                      <Link href={router.pathname + '/' + row._id}>
                        <a><PencilAltIcon className="h-5 w-5 text-primary"/></a>
                      </Link>
                    </td>
                  </tr>
                ))
              :(
                <tr>
                  <td colSpan='4'>Chưa có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Teacher;
