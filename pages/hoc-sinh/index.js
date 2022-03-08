import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import Link from "next/link";

import { memberService } from "@services";
import Input from "@components/form/input";
import Select from "@components/form/select";
import Button from "@components/button";
import {EyeIcon, PencilAltIcon} from "@heroicons/react/outline";

const Student = () => {
  const router = useRouter();
  const [members, setMembers] = useState();

  useEffect(() => {
    loadInit();
  }, []);

  const loadInit = async () => {
    const listMember = await memberService.listStudent();
    setMembers(listMember);
  }

  return (
    <>
      <h4>Hồ sơ học sinh</h4>
      <div className="grid-container">
        <Input placeholder="Tìm kiếm" name="s"/>
      </div>

      {/* <Link href='/hoc-sinh/them-hoc-sinh'>
        <a><Button className='mr-4'>Thêm học sinh</Button></a>
      </Link>
      <Link href='/hoc-sinh/them-kskdk'>
        <a><Button>Tạo mẫu quản lý sức khoẻ định kỳ</Button></a>
      </Link> */}
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
          <div className='container-table lg:w-full'>
            <table className='table'>
              <thead>
              <tr>
                <th className="w-2">STT</th>
                <th>Họ và tên</th>
                <th>Tên lớp</th>
                <th>Phụ Huynh</th>
                <th className="w-[100px]"/>
              </tr>
              </thead>
              <tbody>
              {members?.total?
                members.data.map( (row, idz) => (
                  <tr key={idz}>
                    <td>{idz+1}</td>
                    <td>{row.fullName}</td>
                    <td>{(row.schoolWorking) ? row.schoolWorking?.className : ''}</td>
                    <td>
                      <Link href={`/phu-huynh/${row.parent[0].parentId}`}>
                        <a>{row.parent && row.parent[0].fullName}</a>
                      </Link>
                    </td>
                    <td>
                      <Link href={router.pathname + '/' + row._id}>
                        <a href=""><PencilAltIcon className="h-5 w-5 text-primary"/></a>
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
            {/* <Pagination
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              rows={rows}
              onPageChange={page => setCurrentPage(page)}
            /> */}
          </div>
        </div>
      </div>
    </>
  )
}
export default Student

