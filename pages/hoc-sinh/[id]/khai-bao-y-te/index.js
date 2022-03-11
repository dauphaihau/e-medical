import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import Link from "next/link";

import { memberService } from "@services";
import Button from "@components/button";
import {EyeIcon, PencilAltIcon} from "@heroicons/react/outline";
import swal from "sweetalert";
import moment from "moment";

const HealthDeclaration = () => { 
  const router = useRouter();
  const [member, setMember] = useState();

  useEffect(() => {
    if(!router.isReady) return;
    loadInit();
  }, [router.isReady]);

  const loadInit = async () => {
    const {id} = router.query;
    const memberRes = await memberService.detail(id);
    if(!memberRes) {
      swal('Thông tin này không tồn tại!!', '', 'error')
        .then( () => router.push('/hoc-sinh') );
    }
    setMember(memberRes);
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
                <a><Button>Khai báo y tế</Button></a>
              </Link>
            </div>
            
            <table className='table'>
              <thead>
              <tr>
                <th className="w-2">STT</th>
                <th>Ngày khai báo</th>
                <th>Tình trạng</th>
                <th>Xem chi tiết</th>
              </tr>
              </thead>
              <tbody>
              {member && member.healthDeclaration ?
                member.healthDeclaration.map( (row, idz) => (
                  <tr key={idz}>
                    <td>{idz+1}</td>
                    <td>{moment(row.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>
                    <td>{row.haveSick?"Bất thường":"Bình thường"}</td>
                    <td>
                      <Link href={`/phu-huynh/`}>
                        <a><EyeIcon className="h-5 w-5 text-primary"/></a>
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
      </div>
    </>
  )
}

export default HealthDeclaration
