import Link from "next/link";
import {useEffect, useState} from "react";

import Table from "@components/table";
import Layout from "@components/layout";
import Input from "@components/form/input";
import Button from "@components/button";
import schoolService from "@services/organize/school";

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
      <h2>Trường</h2>
      <Input className='md:w-1/2 lg:w-1/4' name='search' placeholder='Tìm kiếm...'/>
      <Link href='/to-chuc/truong/them-truong'>
        <a>
          <Button>Tạo trường</Button>
        </a>
      </Link>
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <Table theadData={theadData} tbodyData={tbodyData}/>
      </div>
    </>
  );
}

export default SchoolList;

SchoolList.getLayout = (page) => <Layout>{page}</Layout>;
