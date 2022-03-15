import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import Link from "next/link";

import { memberService, medicalService } from "@services";
import Input from "@components/form/input";
import Select from "@components/form/select";
import Button from "@components/button";
import {EyeIcon, PencilAltIcon} from "@heroicons/react/outline";
import swal from "sweetalert";

const ListHealth = () => {
  const router = useRouter();
  const [member, setMember] = useState();
  const [listMedical, setListMedical] = useState();

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

    const listMedical = await medicalService.list({memberId: memberRes._id});
    console.log(listMedical);
    setListMedical(listMedical);
  }

  return (
    <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex -mb-px">
              <li className="mr-2">
                <a href={`/hoc-sinh/${router.query.id}`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent hover:border-primary-light" aria-current="page">Hồ sơ</a>
              </li>
              <li className="mr-2">
                <a href={`/hoc-sinh/${router.query.id}/kham-suc-khoe`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 active text-primary border-primary">Khám sức khỏe</a>
              </li>
              <li className="mr-2">
                <a href={`/hoc-sinh/${router.query.id}/khai-bao-y-te`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent hover:border-primary-light">Khai báo Y Tế</a>
              </li>
              <li className="mr-2">
                <a href={`/hoc-sinh/${router.query.id}/tiem-chung`} className="inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent hover:border-primary-light">Tiêm chủng</a>
              </li>
          </ul>
        </div>
        <div className='container-table lg:w-full mt-5'>
          <div className="flex justify-between">
            <h1>Lịch sử theo dõi sức khỏe</h1>
            <Link href={`${router.asPath}/them`}>
              <a><Button>Thêm khám sức khỏe</Button></a>
            </Link>
          </div>
          <table className='table'>
            <thead>
            <tr>
              <th className="w-2">STT</th>
              <th>Tuần hoàn</th>
              <th>Hô hấp</th>
              <th>Tiêu hóa</th>
              <th className="w-[100px]"/>
            </tr>
            </thead>
            <tbody>
            {listMedical && listMedical.total ?
              listMedical.data.map( (row, idz) => (
                <tr key={idz}>
                  <td className='text-center'>{idz+1}</td>
                  <td className='text-center'>{row.cyclic}</td>
                  <td className='text-center'>{row.sespiratory}</td>
                  <td className='text-center'>{row.digest}</td>
                  <td>
                    <EyeIcon className="h-5 w-5 text-primary"/>
                  </td>
                </tr>
              ))
            :(
              <tr>
                <td colSpan='5'>Chưa có dữ liệu</td>
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
  )
}
export default ListHealth
