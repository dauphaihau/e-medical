import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import _ from "lodash";
import swal from "sweetalert";
import Link from 'next/link'

import {memberService} from "@services";
import Input from "@components/form/input";
import {PencilIcon} from "@heroicons/react/outline";
import Button from "@components/button";

const Staff = () => {
  const router = useRouter();
  const [members, setMembers] = useState();
  const [searchInfo, setSearchInfo] = useState()

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady]);

  const loadInit = async () => {
    const listMember = await memberService.list({type: 'staff'});
    console.log('list-member', listMember);
    setMembers(listMember);
  }

  const handleSearch = async (e) => {
    e.preventDefault();

    router.push({
        pathname: router.pathname,
        query: _.pickBy({s: searchInfo}, _.identity),
      },
      undefined,
      {shallow: true}
    );

    const listStaff = await memberService.list({s: searchInfo});
    if (!listStaff) {
      swal({
        text: "Nội dung tìm kiếm ít nhất là 3 ký tự",
        icon: "error"
      });
    }
    setMembers(listStaff);
  };

  return (
    <>
      <h4>Danh sách nhân viên</h4>
      <div className="grid-container">
        <form onSubmit={handleSearch}>
          <Input
            label='Tìm kiếm'
            placeholder='Tên nhân viên...' name="s"
            onChange={(e) => setSearchInfo(e.target.value)}
          />
          <Button type='submit'>Tìm kiếm</Button>
        </form>
      </div>
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <div className='container-table'>
          <table className='table'>
            <thead>
            <tr>
              <th className="w-3">STT</th>
              <th>Họ tên</th>
              <th>Phone</th>
              <th>Địa chỉ</th>
              <th/>
            </tr>
            </thead>
            <tbody>
              {members?.total
                ? members.data.map((row, idz) => (
                  <tr key={idz}>
                    <td>{idz + 1}</td>
                    <td className='text-center'>{row.fullName}</td>
                    <td className='text-center'>{row.phoneNumber}</td>
                    <td className='text-center'>{row.address}</td>
                    <td>
                      <Link href={router.pathname + '/' + row._id}>
                         <a><PencilIcon className='h-5 w-5 inline'/></a>
                      </Link>
                    </td>
                  </tr>
                ))
                : (<tr><td colSpan='4'>Chưa có dữ liệu</td></tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Staff;