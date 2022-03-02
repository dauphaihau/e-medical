import {useEffect} from "react";
import Link from "next/link";

import Input from "../../../components/form/input";
import Table from "../../../components/table";
import Layout from "../../../components/layout";
import {editIcon} from "../../../utils/icons";
import schoolYearService from "../../../services/organize/school-year";
import Button from "../../../components/button";

const theadData = [
  'STT',
  'Niên khoá',
  'Số lớp',
  'Số học sinh',
  'Thời gian bắt đầu',
  'Thời gian kết thúc'
  , 'Chỉnh sửa'
];

const tbodyData = [
  {
    id: "1",
    items: ["1", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "2",
    items: ["2", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
  {
    id: "3",
    items: ["3", "2000-2001", "A1", '10', '10/20/1990', '10/20/1991', editIcon],
  },
];

const SchoolYearList = () => {

  useEffect(async () => {
    try {
      const {...response} = await schoolYearService.getAllSchoolYear()
      console.log(response);
    } catch (error) {
      console.log({error})
    }
  }, []);

  return (
    <>
      <h4>Tổ chức</h4>
      <Input className='md:w-1/2 lg:w-1/4' placeholder='Tìm kiếm...'/>
      <Link href='/to-chuc/nien-khoa/them-nien-khoa'>
        <a>
          <Button>Thêm mới</Button>
        </a>
      </Link>
      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <Table
          titleTable='Niên khoá'
          theadData={theadData} tbodyData={tbodyData}
        />
      </div>
    </>
  );
}

export default SchoolYearList;

SchoolYearList.getLayout = (page) => <Layout>{page}</Layout>;
