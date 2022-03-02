import Input from "../../../components/form/input";
import Table from "../../../components/table";
import Layout from "../../../components/layout";
import Select from "../../../components/form/select";
import {editIcon} from "../../../utils/icons";

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
      <h4>Tổ chức</h4>
      <div className='grid-container'>
        <Input name='search' placeholder='Tìm kiếm ..'/>
        <Select
          name='nienKhoa'
          options={options}
          defaultValue='Chọn niên khoá'
          placeholder='Chọn niên khoá'
        />
      </div>
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <Table
          pathLinkBtnAdd='/to-chuc/khoi/them-khoi'
          titleTable='Khối'
          theadData={theadData} tbodyData={tbodyData}
        />
      </div>
    </>
  );
}

export default UnitList;


UnitList.getLayout = (page) => <Layout>{page}</Layout>;
