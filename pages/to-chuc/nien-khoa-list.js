import TitleContent from "../../components/title-content";
import Input from "../../components/form/input";
import Table from "../../components/table";
import Pagination from "../../components/table/pagination";
import {detectDomainLocale} from "next/dist/shared/lib/i18n/detect-domain-locale";

const theadData = [
  'STT',
  'Tên trường', 'Niên khoá',
  'Số lớp',
  'Số học sinh',
  'Thời gian bắt đầu',
  'Thời gian kết thúc'
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
    items: ["1", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "2",
    items: ["2", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "3",
    items: ["2", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "3",
    items: ["2", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "3",
    items: ["2", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "3",
    items: ["2", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "3",
    items: ["2", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "3",
    items: ["2", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "3",
    items: ["2", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "3",
    items: ["2", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
];


const NienKhoaList = () => {
  return (
    <>
      <Input width='md:w-1/2 lg:w-1/4' name='search' placeholder='Search anything...'/>
      <div className="box mt-[50px] drop-shadow-2xl overflow-x-auto">
        <Table theadData={theadData} tbodyData={tbodyData}/>
      </div>
    </>
  );
}

export default NienKhoaList;