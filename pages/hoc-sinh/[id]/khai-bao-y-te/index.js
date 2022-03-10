import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import Link from "next/link";

import { memberService } from "@services";
import Input from "@components/form/input";
import Select from "@components/form/select";
import Button from "@components/button";
import {EyeIcon, PencilAltIcon} from "@heroicons/react/outline";

const HealthDeclaration = () => { 
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
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <ul className="flex -mb-px">
                <li className="mr-2">
                  <a href={`/hoc-sinh/${router.query.id}`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent hover:border-primary-light" aria-current="page">Hồ sơ</a>
                </li>
                <li className="mr-2">
                  <a href={`/hoc-sinh/${router.query.id}/kham-suc-khoe`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent hover:border-primary-light">Khám sức khỏe</a>
                </li>
                <li className="mr-2">
                  <a href={`/hoc-sinh/${router.query.id}/khai-bao-y-te`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 active text-primary border-primary">Khai báo Y Tế</a>
                </li>
                <li className="mr-2">
                  <a href={`/hoc-sinh/${router.query.id}/tiem-chung`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent hover:border-primary-light">Tiêm chủng</a>
                </li>
                
            </ul>
          </div>
          <div className='container-table lg:w-full mt-5'>
            <div className="flex justify-between">
              <h1>Lịch sử khai báo y tế</h1>
              <Link href={`${router.asPath}/them`}>
                <Button>Khai báo y tế</Button>
              </Link>
            </div>
            
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

export default HealthDeclaration
