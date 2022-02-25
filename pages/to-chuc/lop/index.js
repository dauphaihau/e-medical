import Input from "../../../components/form/input";
import Table from "../../../components/table";
import Select from "../../../components/form/select";
import Layout from "../../../components/layout";

const theadData = [
  'STT',
  'Tên lớp',
  'Số học sinh',
  'Giáo viên chủ nhiệm',
  'Chỉnh sửa'
];

const editIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
</svg>;

const tbodyData = [
  {
    id: "1",
    items: ["1", "A1", '10', 'Hau', editIcon],
  },
  {
    id: "1",
    items: ["1", "A1", '10', 'Hau', editIcon],
  },
  {
    id: "1",
    items: ["1", "A1", '10', 'Hau', editIcon],
  },
  {
    id: "1",
    items: ["1", "A1", '10', 'Hau', editIcon],
  },
  {
    id: "1",
    items: ["1", "A1", '10', 'Hau', editIcon],
  },
];


const options = [
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'strawberry', label: 'Strawberry'},
  {value: 'vanilla', label: 'Vanilla'}
]


const LopList = () => {
  return (
    <>
      <h2>Danh sách lớp học</h2>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'>
        <Input name='search' placeholder='Tìm kiếm...'/>
        <Select
          name='nienKhoa'
          options={options}
          defaultValue='Chọn niên khoá'
        />
        <Select
          name='khoi'
          options={options}
          defaultValue='Khối'
        />
      </div>
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <Table theadData={theadData} tbodyData={tbodyData}/>
      </div>
    </>
  );
}

export default LopList;

LopList.getLayout = (page) => <Layout>{page}</Layout>;