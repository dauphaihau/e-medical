import Link from "next/link";

import Input from "../../../components/form/input";
import Table from "../../../components/table";
import Layout from "../../../components/layout";
import Select from "../../../components/form/select";
import Button from "../../../components/button";
import {editIcon, deleteIcon} from "../../../utils/icons";

const theadData = [
  'STT',
  'Mã nhân viên',
  'Thông  nhân viên',
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
      <h2>Nhân viên</h2>
      <div className='grid-container'>
        <Input
          name='search' placeholder='Tìm kiếm...'/>
        <Select
          name='thoiGian'
          // onChange={e => setFieldValue('thoiGian', e.value)}
          options={options}
          placeholder='Thời gian'
          // error={errors.thoiGian && touched.thoiGian ? errors.thoiGian : null}
        />
      </div>
      <Link href='/nhan-su/nhan-vien/them-nhan-vien'>
        <a>
          <Button>Tạo nhân viên</Button>
        </a>
      </Link>
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <Table theadData={theadData} tbodyData={tbodyData}/>
      </div>
    </>
  );
}

export default StaffList;

StaffList.getLayout = (page) => <Layout>{page}</Layout>;
