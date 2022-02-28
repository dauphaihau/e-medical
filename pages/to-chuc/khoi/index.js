import Input from "../../../components/form/input";
import Table from "../../../components/table";
import Layout from "../../../components/layout";
import Card from "../../../components/card";
import Select from "../../../components/form/select";
import {editIcon} from "../../../utils/icons";
import Link from "next/link";
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
    id: "1",
    items: ["1", "A", "A1", '100', 'Nguyen Van A', editIcon],
  },
  {
    id: "1",
    items: ["1", "A", "A1", '100', 'Nguyen Van A', editIcon],
  },
  {
    id: "1",
    items: ["1", "A", "A1", '100', 'Nguyen Van A', editIcon],
  },
  {
    id: "1",
    items: ["1", "A", "A1", '100', 'Nguyen Van A', editIcon],
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
      <h2>Khối</h2>
      <div className='grid-container'>
        <Input name='search' placeholder='Search anything...'/>
        <Select
          name='nienKhoa'
          options={options}
          defaultValue='Chọn niên khoá'
          placeholder='Chọn niên khoá'
        />
      </div>
      <Link href='/to-chuc/khoi/them-khoi'>
        <a>
          <Button>Tạo khối</Button>
        </a>
      </Link>
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <Table theadData={theadData} tbodyData={tbodyData}/>
      </div>
    </>
  );
}

export default UnitList;


UnitList.getLayout = (page) => <Layout>{page}</Layout>;
