import Link from "next/link";

import Input from "../../../components/form/input";
import Table from "../../../components/table";
import Layout from "../../../components/layout";
import Button from "../../../components/button";
import {editIcon} from "../../../utils/icons";

const theadData = [
  'STT',
  'Niên khoá',
  'Số lớp',
  'Số học sinh',
  'Thời gian bắt đầu',
  'Thời gian kết thúc'
  , 'Chỉnh sửa'
];

const tbodyData = [
  {
    id: "1",
    items: ["1", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "2",
    items: ["2", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "3",
    items: ["3", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
];

const NienKhoaList = () => {
  return (
    <>
      <h2>Niên khoá</h2>
      <Input className='md:w-1/2 lg:w-1/4' name='search' placeholder='Tìm kiếm...'/>
      <Link href='/to-chuc/nien-khoa/them-nien-khoa'>
        <a>
          <Button>Thêm niên khoá</Button>
        </a>
      </Link>
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <Table theadData={theadData} tbodyData={tbodyData}/>
      </div>
    </>
  );
}

export default NienKhoaList;

NienKhoaList.getLayout = (page) => <Layout>{page}</Layout>;
