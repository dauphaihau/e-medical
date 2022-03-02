import {useEffect, useState} from "react";
import Link from "next/link";

import schoolService from "../../../services/organize/school";
import Input from "../../../components/form/input";
import Table from "../../../components/table";
import Layout from "../../../components/layout";
import Button from "../../../components/button";

const theadData = [
  'STT',
  'Tên trường', 'Niên khoá',
  'Số lớp',
  'Số học sinh',
  'Thời gian bắt đầu',
  'Thời gian kết thúc'
  , '', ' '
];

const tbodyData = [
  {
    id: "1",
    items: ['1', "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', '', ''],
  },
  {
    id: "2",
    items: ["2", "Harvard", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', '', ''],
  },
];

const SchoolList = () => {

  const [schools, setSchools] = useState([])

  useEffect(async () => {
    try {
      const {...response} = await schoolService.getAllSchool()
      console.log(response.data);
    } catch (error) {
      console.log({error})
    }
  }, []);

  return (
    <>
      <h4>Tổ chức</h4>
      <Input className='md:w-1/2 lg:w-1/4' placeholder='Tìm kiếm...'/>
      <Link href='/to-chuc/truong/them-truong'>
        <a>
          <Button>Thêm mới</Button>
        </a>
      </Link>
      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <Table
          titleTable='Danh sách trường'
          theadData={theadData} tbodyData={tbodyData}
        />
      </div>
    </>
  );
}

export default SchoolList;

SchoolList.getLayout = (page) => <Layout>{page}</Layout>;
