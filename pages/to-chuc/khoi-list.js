import Input from "../../components/form/input";
import Table from "../../components/table";
import Select from "../../components/form/select";
import TitleContent from "../../components/title-contet";

const theadData = [
  'STT',
  'Tên khối',
  'Số lớp',
  'Số học sinh',
  'Khối trưởng'
  , 'Chỉnh sửa'
];

const editIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
</svg>;

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


const KhoiList = ({stateSidebar}) => {
  return (
    <TitleContent stateSidebar={stateSidebar}>
      <div className='grid w-1/2 lg:grid-cols-4 lg:gap-8'>
        <Input name='search' placeholder='Search anything...'/>
        <Select options={['Nien Khoa', '2009-2011']}/>
      </div>
      <div className="box mt-[50px] drop-shadow-2xl overflow-x-auto">
        <Table theadData={theadData} tbodyData={tbodyData}/>
      </div>
    </TitleContent>
  );
}

export default KhoiList;