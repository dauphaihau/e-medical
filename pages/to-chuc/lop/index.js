import {useEffect} from "react";
import Link from "next/link";

import Input from "../../../components/form/input";
import Table from "../../../components/table";
import Select from "../../../components/form/select";
import Layout from "../../../components/layout";
import {editIcon} from "../../../utils/icons";
import Button from "../../../components/button";
import {classService} from "../../../services";

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
    items: ["2", "A1", '10', 'Hau', editIcon],
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
      const {...response} = await classService.list()
      console.log(response);
    } catch (error) {
      console.log({error})
    }
  }, []);

  return (
    <>
      <h4>Tổ chức</h4>
      <div className='grid-container'>
        <Input placeholder='Tìm kiếm...'/>
        <Select
          options={options}
          placeholder='Chọn niên khoá'
        />
        <Select
          options={options}
          placeholder='Khối'
        />
      </div>
      <Link href='/to-chuc/lop/them-lop'>
        <a>
          <Button>Thêm mới</Button>
        </a>
      </Link>
      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <Table
          titleTable='Lớp'
          theadData={theadData} tbodyData={tbodyData}
        />
      </div>
    </>
  );
}

export default ClassList;

ClassList.getLayout = (page) => <Layout>{page}</Layout>;