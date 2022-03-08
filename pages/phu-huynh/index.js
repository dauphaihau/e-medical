import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import { memberService } from "@services";
import Link from 'next/link'
import { PencilAltIcon } from '@heroicons/react/solid';
import Input from "@components/form/input";

const Teacher = () => {
  const router = useRouter();
  const [members, setMembers] = useState();

  useEffect(() => {
    loadInit();
  }, []);

  const loadInit = async () => {
    const listMember = await memberService.listParent();
    setMembers(listMember);
  }

  return (
    <>
      <h4>Danh sách phụ huynh</h4>
      <Input className='md:w-1/2 lg:w-1/4' name='search' placeholder='Tìm kiếm...'/>
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <div className='container-table'>
          <table className='table'>
            <thead>
            <tr>
              <th className="w-3">STT</th>
              <th className="text-left">Họ tên</th>
              <th className="text-left">Phone</th>
              <th className="text-left"></th>
              <th className="w-2"/>
            </tr>
            </thead>
            <tbody>
              {members?.total?
                members.data.map( (row, idz) => (
                  <tr key={idz}>
                    <td>{idz+1}</td>
                    <td>{row.fullName}</td>
                    <td>{row.phoneNumber}</td>
                    <td>{(row.schoolWorking) ? row.schoolWorking?.className : ''}</td>
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