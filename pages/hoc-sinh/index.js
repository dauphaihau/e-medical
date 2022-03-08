import Link from "next/link";

import Input from "@components/form/input";
import Select from "@components/form/select";
import Layout from "@components/layout";
import Button from "@components/button";
import {EyeIcon} from "@heroicons/react/outline";

const Student = () => {
  

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
                <th className="w-[100px]"/>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
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

Student.getLayout = (page) => <Layout>{page}</Layout>;
