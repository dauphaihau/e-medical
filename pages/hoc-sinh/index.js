import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";

import {memberService} from "@services";
import Input from "@components/form/input";
import Select from "@components/form/select";
import Button from "@components/button";
import {PencilIcon} from "@heroicons/react/outline";
import _ from "lodash";
import swal from "sweetalert";

const Student = () => {
  const router = useRouter();
  const [members, setMembers] = useState();
  const [searchInfo, setSearchInfo] = useState()

  useEffect(() => {
    loadInit();
  }, []);

  const loadInit = async () => {
    const listMember = await memberService.listStudent();
    console.log('list-member', listMember);
    setMembers(listMember);
  }
  
  const handleSearch = async (e) => {
    e.preventDefault();

    router.push({
        pathname: router.pathname,
        query: _.pickBy(e.target.value, _.identity),
      },
      undefined,
      {shallow: true}
    );

    const listMember = await memberService.listStudent({s: searchInfo});
    if (!listMember) {
      swal({
        text: "Nội dung tìm kiếm ít nhất là 3 ký tự",
        icon: "error"
      });
    }
    setMembers(listMember);
  };

  return (
    <>
      <h4>Hồ sơ học sinh</h4>
      <div className="grid-container">
        <form onSubmit={handleSearch}>
          <Input
            label='Tìm kiếm'
            placeholder='Tên học sinh...' name="s"
            onChange={(e) => setSearchInfo(e.target.value)}
          />
          <Button type='submit'>Tìm kiếm</Button>
        </form>
      </div>
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
                {members?.total
                  ? members.data.map((row, idz) => (
                    <tr key={idz}>
                    <td>{idz + 1}</td>
                    <td className='text-center'>{row.fullName}</td>
                    <td className='text-center'>{(row.schoolWorking) ? row.schoolWorking?.className : ''}</td>
                    <td className='text-center'>
                      <Link href={`/phu-huynh/${row.parent[0]?.parentId}`}>
                        <a>{row.parent && row.parent[0]?.fullName}</a>
                      </Link>
                    </td>
                    <td>
                      <Link href={router.pathname + '/' + row._id}>
                         <a><PencilIcon className='h-5 w-5 inline'/></a>
                      </Link>
                    </td>
                  </tr>
                  ))
                  : (
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

