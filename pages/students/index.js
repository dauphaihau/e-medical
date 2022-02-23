import Table from "../../components/table";
import TitleContent from "../../components/title-content";

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
const Student=()=>{
    return(
        <TitleContent title="Danh sách lớp học">
            <Table
                theadData={theadData}
                tbodyData={tbodyData}
            />
        </TitleContent>
    )
}
export default Student