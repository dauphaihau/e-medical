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
import {schoolYearService} from "@services";

let skip = 0;

const ClassroomList = () => {

  const router = useRouter();
  const {query} = router;
  const [listClassroom, setListClassroom] = useState()

  const [schoolOptions, setSchoolOptions] = useState([]);
  const [schoolYearOptions, setSchoolYearOptions] = useState([])
  const [groupOptions, setGroupOptions] = useState([])

  const [schoolSelected, setSchoolSelected] = useState();
  const [schoolYearSelected, setSchoolYearSelected] = useState()
  const [groupSelected, setGroupSelected] = useState()

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady]);

  const loadInit = async () => {
    const listClass = await classroomService.list();
    setListClassroom(listClass);

    const schools = await schoolService.list({limit: 100});
    if (schools.total) {
      setSchoolOptions(schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      })));
    }

    if (
      query &&
      query.s &&
      query.s.length <= 3
    ) {
      swal("", "Số ký tự tìm kiếm phải lớn hơn 3", "warning", {
        button: "Tôi đã hiểu",
        dangerMode: true,
      });
    } else {
      const {...res} = await classroomService.list(
        _.pickBy({...query}, _.identity)
      )
      setListClassroom(res);

      // region load init selected
      if (query.schoolId) {
        const schoolOption = await schoolService.detail(query.schoolId);
        setSchoolSelected({
          value: schoolOption._id,
          label: schoolOption.schoolname
        })
        const schoolYears = await schoolYearService.list({schoolId: query.schoolId})
        if (schoolYears && schoolYears.total) {
          setSchoolYearOptions(schoolYears.data.map((data) => ({
            value: data._id,
            label: data.schoolYearName,
          })));
        }
        const group = await classroomService.listGroup({schoolId: query.schoolId})
        console.log('group', group);
        if (group && group.total) {
          setGroupSelected(group.data?.map((data) => ({
            value: data._id,
            label: data.className,
          })));
        }
      }
      if (query.schoolYearId) {
        const {...schoolYearOpts} = await schoolYearService.list({
          params: _.pickBy({...query}, _.identity)
        })
        setSchoolYearSelected({
          value: schoolYearOpts.data[0]?._id,
          label: schoolYearOpts.data[0]?.schoolYearName
        })
      }
      //endregion
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
    if (data.schoolYearId === '') delete data.schoolYearId;
    if (data.parentId === '') delete data.parentId;

    router.push({
        pathname: router.pathname,
        query: _.pickBy({...query, ...data}, _.identity),
      },
      undefined,
      {shallow: true}
    );

    const {...res} = await classroomService.list(
      _.pickBy({...query, ...data}, _.identity)
    )

    if (_.isEmpty(res)) {
      swal({
        text: "Tìm kiếm không thành công",
        icon: "error"
      });
    }
    setListClassroom(res)
  };

  const onChangeSchool = async (e) => {
    const schoolYear = await schoolYearService.list({schoolId: e.value})
    if (schoolYear.total) {
      setSchoolYearOptions(schoolYear.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      })));
    }
  };

  const onChangeSchoolYear = async (e) => {
    const groups = await classroomService.listGroup({schoolId: e.value, limit: 10});
    console.log('groups', groups);
    if (groups.total) {
      setGroupOptions(groups.data?.map((data) => ({
        value: data._id,
        label: data.className,
      })));
    }
  }

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
                  onChangeSchool(e);
                  onChangeSchoolYear(e)
                  setSchoolSelected(e);
                }}
                value={schoolSelected}
                options={schoolOptions}
                placeholder='Chọn trường'
              />
              <Select
                label='Niên khoá trường'
                name='schoolYearId'
                value={schoolYearSelected}
                onChange={e => {
                  // onChangeSchoolYear(e.value);
                  setFieldValue('schoolYearId', e.value)
                  // setSchoolYearSelected(e);
                }}
                options={schoolYearOptions}
              />
              <Select
                label='Khối'
                name='parentId'
                value={groupSelected}
                onChange={e => setFieldValue('parentId', e.value)}
                options={groupOptions}
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