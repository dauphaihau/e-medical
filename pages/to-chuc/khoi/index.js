import Link from "next/link";
import {useEffect, useState} from "react";

import Input from "../../../components/form/input";
import Layout from "../../../components/layout";
import Select from "../../../components/form/select";
import Button from "../../../components/button";
import {classroomService} from "../../../services";
import {PencilIcon, TrashIcon} from "@heroicons/react/outline";
import Pagination from "../../../components/table/pagination";

let skip = 0;

const GroupList = () => {

  const [listGroup, setListGroup] = useState()

  useEffect(async () => {
    try {
      // get class
      const {...res} = await classroomService.list();

      // get group
      // const {...res} = await classroomService.list({type: 'group'});

      console.log('res', res);
      setListGroup(res.data)
      // setListClassroom(response.data)
    } catch (error) {
      console.log({error})
    }
  }, [])

  return (
    <>
      <h4>Tổ chức</h4>
      <div className='grid-container'>
        <Input placeholder='Tìm kiếm ..'/>
        {/*<Select*/}
        {/*  name='schoolYear'*/}
        {/*  options={[]}*/}
        {/*  placeholder='Chọn niên khoá'*/}
        {/*/>*/}
      </div>
      <Link href='/to-chuc/khoi/them-khoi'>
        <a><Button>Thêm mới</Button></a>
      </Link>
      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <div className='container-table'>
          <h4>Khối</h4>
          <table className='table'>
            <thead>
              <tr>
                <th className='text-center'>STT</th>
                <th>Tên khối</th>
                <th>Số học sinh</th>
                {/*<th>Giáo viên chủ nhiệm</th>*/}
                <th/>
                <th/>
              </tr>
            </thead>
            <tbody>
              {listGroup?.map((group, index) => (
                <tr key={index}>
                  <td>{parseInt(skip) + index + 1}</td>
                  <td>{group.className}</td>
                  <td></td>
                  <td></td>
                  <td>
                     <Link href={`/to-chuc/khoi/${group._id}`}>
                       <a><PencilIcon className='h-5 w-5 inline'/></a>
                     </Link>
                     <TrashIcon
                       className='h-5 w-5 inline ml-4 cursor-pointer'
                       // onClick={() => handleDelete(group._id)}
                     />
                  </td>
              </tr>
              ))}
            </tbody>
          </table>
          {/*<Pagination data={listClassroom}/>*/}
      </div>
      </div>
    </>
  );
}

export default GroupList;

GroupList.getLayout = (page) => <Layout>{page}</Layout>;
