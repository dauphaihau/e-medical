import SchoolTable from "./school-table";
import TitleContent from "../../../components/title-content";
import Input from "../../../components/form/input";
import Table from "../../../components/table";

const columns = [
  {
    dataField: 'STT',
    text: 'STT',
  },
  {
    dataField: 'School Name',
    text: 'Tên trường',
  },
  {
    dataField: 'years',
    text: 'Niên khoá'
  },
  {
    dataField: 'number class',
    text: 'Số lớp'
  },
  {
    dataField: 'number students',
    text: 'Số học sinh'
  },
  {
    dataField: 'time-start',
    text: 'Thời gian bắt đầu'
  },
  {
    dataField: 'time-end',
    text: 'Thời gian kết thúc'
  },
  {
    dataField: 'edit',
    text: 'Chỉnh sửa'
  },
];
//data demo
const data = [
  {
    id: 1,
    fullName: 'Nguyễn Thị Lý',
    className: '1A',

    // phone: '909880882',
    // province: 'Long An',
    // district: 'Huyện Mộc Hóa',
    // ward: 'Xã Tân Lập'
  },
  // {
  //   text: '1'
  // }
];


const SchoolList = () => {
  return (
    <TitleContent title='Tổ chức'>
      <form className='navbar-search-form'>
        <Input name='search' placeholder='Search anything...'/>
      </form>
      <div className="box mt-[50px] drop-shadow-2xl overflow-x-auto">
        <Table data={data} columns={columns}/>
      </div>
      {/*<SchoolTable*/}
      {/*  pagination*/}
      {/*  data={data}*/}
      {/*  columns={columns}*/}
      {/*/>*/}
    </TitleContent>
  );
}

export default SchoolList;