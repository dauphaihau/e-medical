import Link from "next/link";

import Input from "../../../components/form/input";
import Table from "../../../components/table";
import Layout from "../../../components/layout";
import Select from "../../../components/form/select";
import {editIcon} from "../../../utils/icons";
import Button from "../../../components/button";

const theadData = [
  'STT',
  'Tên khối',
  'Số lớp',
  'Số học sinh',
  'Khối trưởng'
  , 'Chỉnh sửa'
];


const tbodyData = [
  {
    id: "1",
    items: ["1", "A", "A1", '100', 'Nguyen Van A', editIcon],
  },
  {
    id: "2",
    items: ["2", "A", "A1", '100', 'Nguyen Van A', editIcon],
  },
  {
    id: "3",
    items: ["3", "A", "A1", '100', 'Nguyen Van A', editIcon],
  },
];


const options = [
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'strawberry', label: 'Strawberry'},
  {value: 'vanilla', label: 'Vanilla'}
]

const UnitList = () => {
  return (
    <>
      <h4>Tổ chức</h4>
      <div className='grid-container'>
        <Input placeholder='Tìm kiếm ..'/>
        <Select

          options={options}
          placeholder='Chọn niên khoá'
        />
      </div>
      <Link href='/to-chuc/khoi/them-khoi'>
        <a>
          <Button>Thêm mới</Button>
        </a>
      </Link>
      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <Table
          titleTable='Khối'
          theadData={theadData} tbodyData={tbodyData}
        />
      </div>
    </>
  );
}

export default UnitList;


UnitList.getLayout = (page) => <Layout>{page}</Layout>;
