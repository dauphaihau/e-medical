import {useEffect} from "react";
import Link from "next/link";

import Input from "../../../components/form/input";
import Table from "../../../components/table";
import Select from "../../../components/form/select";
import Layout from "../../../components/layout";
import {editIcon} from "../../../utils/icons";
import classService from "../../../services/organize/class";
import Button from "../../../components/button";

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

  useEffect(async () => {
    try {
      const {...response} = await classService.getAllClass()
      console.log(response);
    } catch (error) {
      console.log({error})
    }
  }, []);

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
      <Link href='/to-chuc/lop/them-lop'>
        <a>
          <Button>Tạo lớp</Button>
        </a>
      </Link>
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <Table theadData={theadData} tbodyData={tbodyData}/>
      </div>
    </>
  );
}

export default ClassList;

ClassList.getLayout = (page) => <Layout>{page}</Layout>;