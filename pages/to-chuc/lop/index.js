import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import swal from "sweetalert";
import {Form, Formik} from "formik";
import _ from "lodash";

import {PencilIcon, TrashIcon} from "@heroicons/react/outline";
import Input from "@components/form/input";
import Select from "@components/form/select";
import Button from "@components/button";
import {classroomService} from "@services";
import Pagination from "@components/table/pagination";
import {schoolService} from "@services";

let skip = 0;

const ClassroomList = () => {

  const router = useRouter();
  const [listClassroom, setListClassroom] = useState()
  const [listSchool, setListSchool] = useState([]);
  const [listSchoolYear, setListSchoolYear] = useState()
  const [listGroup, setListGroup] = useState()

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady]);

  const loadInit = async () => {
    const listClass = await classroomService.list();
    setListClassroom(listClass);

    const schools = await schoolService.list({limit: 100});
    if (schools.total) {
      setListSchool(schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      })));
    }
  }

  const handleDelete = async (id) => {
    swal({
      title: "Bạn chắc chắn muốn xóa?",
      text: "",
      icon: "warning",
      buttons: true,
      successMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await classroomService.delete(id)
        if (result) {
          router.reload();
        } else {
          swal('Xóa không thành công!!', '', 'error');
        }
      }
    });
  };

  const handleSubmit = async (data) => {
    if (data.s === '') delete data.s;
    if (data.schoolId === '') delete data.schoolId;
    const {...res} = await classroomService.list(data);
    if (_.isEmpty(res)) {
      swal({
        text: "Tìm kiếm không thành công",
        icon: "error"
      });
    }
    setListClassroom(res)
  };

  const onChangeSchool = async (idSchool) => {
    const schoolYear = await schoolYearService.list({schoolId: idSchool})
    if (schoolYear.total) {
      setListSchoolYear(schoolYear.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      })));
    }
  };

  const onChangeSchoolYear = async (schoolYearId) => {
    const clsGrp = await classroomService.listGroup({schoolYearId, limit: 100});
    if (clsGrp.total) {
      setListGroup(clsGrp.data.map((data) => ({
        value: data._id,
        label: data.className,
      })));
    }
  }

  const onChangeGroup = async (idSchool) => {
    const group = await classroomService.list({schoolId: idSchool, type: 'class'})
    console.log('group', group);
    if (group.total) {
      setListGroup(group.data.map((data) => ({
        value: data._id,
        label: data.className,
      })));
    }
  };

  return (
    <>
      <h4>Lớp</h4>
      <Formik
        onSubmit={handleSubmit}
        enableReinitialize
        initialValues={{
          s: '',
          schoolYearId: '',
          schoolId: '',
          parentId: '',
        }}
      >
        {({handleChange, setFieldValue}) => (
          <Form>
            <div className='grid-container'>
              <Input
                label='Tìm kiếm'
                placeholder='Tìm kiếm..'
                name="s"
                onChange={handleChange}
              />
              <Select
                label='Tên trường'
                name='schoolId'
                onChange={e => {
                  setFieldValue('schoolId', e.value)
                  onChangeSchool(e.value);
                  onChangeGroup(e.value);
                }}
                options={listSchool}
                placeholder='Chọn trường'
                useFormik='true'
              />
              <Select
                label='Niên khoá trường'
                name='schoolYearId'
                onChange={e => {
                  onChangeSchoolYear(e.value);
                  setFieldValue('schoolYearId', e.value)
                }}
                options={listSchoolYear}
                useFormik='true'
              />
              <Select
                label='Khối'
                name='parentId'
                useFormik='true'
                onChange={e => setFieldValue('parentId', e.value)}
                options={listGroup}
              />
            </div>
            <Button type='submit'>Tìm kiếm</Button>
          </Form>
        )}
      </Formik>
      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <div className='container-table'>
          <table className='table'>
            <thead>
              <tr>
                <th className='w-2 text-center'>STT</th>
                <th>Tên lớp</th>
                <th>Số học sinh</th>
                <th>Giáo viên chủ nhiệm</th>
                <th className="w-[100px]"/>
              </tr>
            </thead>
            <tbody>
              {listClassroom && listClassroom.total
                ? (
                  listClassroom.data.map((cr, index) => (
                    <tr key={index}>
                    <td>{parseInt(skip) + index + 1}</td>
                    <td className='text-center'>{cr.className}</td>
                    <td></td>
                    <td></td>
                    <td>
                       <Link href={`/to-chuc/lop/${cr._id}`}>
                         <a><PencilIcon className='h-5 w-5 inline'/></a>
                       </Link>
                       <TrashIcon
                         className='h-5 w-5 inline ml-4 cursor-pointer'
                         onClick={() => handleDelete(cr._id)}
                       />
                    </td>
                </tr>
                  ))
                )
                : (<tr><td colSpan={5}>Chưa có dữ liệu</td></tr>)
              }
              {}
            </tbody>
          </table>
          <Pagination data={listClassroom}/>
        </div>
      </div>
    </>
  );
}

export default ClassroomList;