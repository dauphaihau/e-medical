import Input from "../../../components/form/input";
import Table from "../../../components/table";
import Layout from "../../../components/layout";
import Select from "../../../components/form/select";
import {editIcon, deleteIcon} from "../../../utils/icons";

const theadData = [
  'STT',
  'Mã nhân viên',
  'Thông tin nhân viên',
  , '', ' '
];


const tbodyData = [
  {
    id: "1",
    items: ["1", '12', 'Nguyen B \n Niên khoá: 2021-2022', editIcon, deleteIcon],
  },
];

const options = [
  {value: '2009-2010', label: '2009-2010'},
  {value: '2019-2012', label: '2009-2010'},
  {value: '2009-2012', label: '2009-2010'},
]

const StaffList = () => {
  return (
    <>
      <h4>Nhân viên</h4>
      <div className='grid-container'>
        <Input placeholder='Tìm kiếm...'/>
        <Select options={options} placeholder='Thời gian'/>
      </div>
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <Table
          pathLinkBtnAdd='/nhan-su/nhan-vien/them-nhan-vien'
          titleTable='Nhân viên y tế'
          theadData={theadData} tbodyData={tbodyData}
        />
      </div>
    </>
  );
}

export default StaffList;

StaffList.getLayout = (page) => <Layout>{page}</Layout>;
