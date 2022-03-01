import Input from "../../../components/form/input";
import Table from "../../../components/table";
import Select from "../../../components/form/select";
import Layout from "../../../components/layout";
import {editIcon} from "../../../utils/icons";

const theadData = [
  'STT',
  'Tên lớp',
  'Số học sinh',
  'Giáo viên chủ nhiệm',
  'Chỉnh sửa'
];

const tbodyData = [
  {
    id: "1",
    items: ["1", "A1", '10', 'Hau', editIcon],
  },
  {
    id: "2",
    items: ["1", "A1", '10', 'Hau', editIcon],
  },
];


const options = [
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'strawberry', label: 'Strawberry'},
  {value: 'vanilla', label: 'Vanilla'}
]


const ClassList = () => {
  return (
    <>
      <h2>Danh sách lớp học</h2>
      <div className='grid-container'>
        <Input name='search' placeholder='Tìm kiếm...'/>
        <Select
          name='nienKhoa'
          options={options}
          placeholder='Chọn niên khoá'
        />
        <Select
          name='khoi'
          options={options}
          placeholder='Khối'
        />
      </div>
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <Table theadData={theadData} tbodyData={tbodyData}/>
      </div>
    </>
  );
}

export default ClassList;

ClassList.getLayout = (page) => <Layout>{page}</Layout>;