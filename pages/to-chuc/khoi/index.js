import Link from "next/link";

import Input from "../../../components/form/input";
import Table from "../../../components/table";
import Layout from "../../../components/layout";
import Select from "../../../components/form/select";
import Button from "../../../components/button";
import {useEffect} from "react";
import schoolYearService from "../../../services/organize/school-year";
import {classroomService, schoolService} from "../../../services";

const theadData = [
  'STT',
  'Tên khối',
  'Số lớp',
  'Số học sinh',
  'Khối trưởng'
  , 'Chỉnh sửa'
];

const options = [
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'strawberry', label: 'Strawberry'},
  {value: 'vanilla', label: 'Vanilla'}
]

const GroupList = () => {
  // let tbodyData = [];

  useEffect(async () => {
    try {
      const {...res} = await classroomService.list({type: 'group'});
      console.log(res);
      // setListClassroom(response.data)
    } catch (error) {
      console.log({error})
    }
  }, [])


  const loadInit = async () => {
    const group = await classroomService.list({type: 'group'});
    console.log(schoolsYear);
    setListSchoolYear(schoolsYear);
    if (schoolsYear.total) {
      setListSchoolYear(schoolsYear.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      })));
    }
    const schools = await schoolService.list({limit: 20});
    if (schools.total) {
      setListSchool(schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      })));
    }
  }

  return (
    <>
      <h4>Tổ chức</h4>
      <div className='grid-container'>
        <Input placeholder='Tìm kiếm ..'/>
        <Select
          options={options}
          placeholder='Chọn niên khoá'
        />
      </div>
      <Link href='/to-chuc/khoi/them-khoi'>
        <a><Button>Thêm mới</Button></a>
      </Link>
      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        {/*<Table*/}
        {/*  titleTable='Khối'*/}
        {/*  theadData={theadData} tbodyData={tbodyData}*/}
        {/*/>*/}
      </div>
    </>
  );
}

export default GroupList;


GroupList.getLayout = (page) => <Layout>{page}</Layout>;
