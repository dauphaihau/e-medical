import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import Input from "@components/form/input";
import Layout from "@components/layout";
import Select from "@components/form/select";
import Button from "@components/button";
import {classroomService} from "@services";
import {PencilIcon, TrashIcon} from "@heroicons/react/outline";
import Table from "@components/table";
import {schoolService} from "../../../services";
import {schoolYearService} from "../../../services/organize/school-year";

const GroupList = () => {

  const [listSchool, setListSchool] = useState();
  const [schoolYear, setSchoolYear] = useState([])
  const [listGroup, setListGroup] = useState()
  const router = useRouter();
  console.log('list-school', listSchool);

  useEffect(async () => {
    loadInit();
    // try {
    //   // get class
    //   // const {...res} = await classroomService.list();
    //
    //   // get group
    //   const {...res} = await classroomService.list({type: 'group'});
    //
    //   console.log('res', res);
    //   setListGroup(res.data)
    //   // setListClassroom(response.data)
    // } catch (error) {
    //   console.log({error})
    // }
  }, [])


  const loadInit = async () => {
    const schools = await schoolService.list({limit: 20});
    if (schools.total) {
      setListSchool(schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      })));
    }
  }

  const handleDelete = async (id) => {
    try {
      await classroomService.delete(id)
      await swal({text: 'Xoá thành công', icon: 'success'});
      router.reload();
    } catch (error) {
      console.log({error})
    }
  };

  const onChangeSchool = async (idSchool) => {
    const schoolY = await schoolYearService.list({schoolId: idSchool})
    if (schoolY.total) {
      setSchoolYear(schoolY.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      })));
    }
  };

  const onChangeSchoolYear = async (value) => {
    console.log('value', value);
    // const schoolY = await schoolYearService.list({schoolId: idSchool})
    // if (schoolY.total) {
    //   setSchoolYear(schoolY.data.map((data) => ({
    //     value: data._id,
    //     label: data.schoolYearName,
    //   })));
    // }

    const group = await classroomService.list({schoolId: idSchool, type: 'group'})
    console.log('group', group);
    setListGroup(group.data)
  };

  const columns = [
    {
      id: 'id',
      title: 'STT',
      key: 'id'
    },
    {
      id: 'className',
      title: 'Tên khối',
    },
    {
      id: 'amountStudent',
      title: 'Số học sinh',
    },
    {
      id: 'teacher',
      title: 'Giáo viên chủ nhiệm',
    },
    {
      id: 'action',
      title: 'Thao tác',
      render: (element) => {
        console.log('element', element);
        return <>
          <Link href={router.pathname + '/' + element._id}>
            <a><PencilIcon className='h-5 w-5 inline'/></a>
          </Link>
          <TrashIcon
            className='h-5 w-5 inline ml-4 cursor-pointer'
            onClick={() => handleDelete(element._id)}
          />
        </>
      }
    }
  ]

  return (
    <>
      <h4>Tổ chức</h4>
      <div className='grid-container'>
        <Input placeholder='Tìm kiếm ..'/>
        <Select
          // label='Tên trường'
          name='schoolId'
          onChange={(e) => onChangeSchool(e.value)}
          options={listSchool}
          placeholder='Chọn trường'
        />
        <Select
          // label='Niên khoá'
          name='schoolYearId'
          onChange={(e) => onChangeSchoolYear(e.value)}
          options={schoolYear}
          placeholder='Chọn niên khoá'
        />
      </div>
      <Link href={router.pathname + '/' + 'them'}>
        <a><Button>Thêm mới</Button></a>
      </Link>
      <Table
        columns={columns} rows={listGroup}
        widthContainer='w-[1200px]'
        titleTable='Khối'
      />
    </>
  );
}

export default GroupList;

GroupList.getLayout = (page) => <Layout>{page}</Layout>;

