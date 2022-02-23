import TitleContent from "../../components/title-content";
import Input from "../../components/form/input";
import Table from "../../components/table";

const theadData = [
  'STT',
  'Tên trường', 'Niên khoá',
  'Số lớp',
  'Số học sinh',
  'Thời gian bắt đầu',
  , 'Thời gian kết thúc'
  , 'Chỉnh sửa'
];

const tbodyData = [
  {
    id: "1",
    items: ["1", "Effort", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', ''],
  },
  {
    id: "2",
    items: ["2", "Effort", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', ''],
  },
  {
    id: "3",
    items: ["2", "Effort", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', ''],
  },
];


const SchoolList = () => {
  return (
    <TitleContent title='Tổ chức'>
      <Input name='search' placeholder='Search anything...'/>
      <div className="box mt-[50px] drop-shadow-2xl overflow-x-auto">
        <Table theadData={theadData} tbodyData={tbodyData}/>
        {/*<Pagination/>*/}
      </div>
    </TitleContent>
  );
}

export default SchoolList;