import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import swal from "sweetalert";
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

  const [selects, setSelect] = useState({
    s: '',
    school: {
      value: '',
      label: ''
    },
    schoolYear: {
      value: '',
      label: ''
    },
    parent: {
      value: '',
      label: ''
    },
  })
  const [filter, setFilter] = useState({
    s: '',
    schoolId: '',
    schoolYearId: '',
    parentId: '',
  })

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
      const res = await classroomService.list(_.pickBy({...query}, _.identity))
      setListClassroom(res);

      if (query.schoolId) {
        let schoolOption = await schoolService.detail(query.schoolId);
        schoolOption = {
          value: schoolOption._id,
          label: schoolOption.schoolname
        };
        setSelect({...selects, ...{school: schoolOption}});

        if (query.schoolYearId) {
          let schoolYearOpts = await schoolYearService.list(
            _.pickBy(query.schoolYearId, _.identity)
          )
          schoolYearOpts = {
            value: schoolYearOpts.data[0]?._id,
            label: schoolYearOpts.data[0]?.schoolYearName
          };
          setSelect({...selects, ...{school: schoolOption, schoolYear: schoolYearOpts}});
          const schoolYears = await schoolYearService.list({schoolId: query.schoolId})
          if (schoolYears && schoolYears.total) {
            setSchoolYearOptions(schoolYears.data.map((data) => ({
              value: data._id,
              label: data.schoolYearName,
            })));
          }
          if (query.parentId) {
            let groupOption = await classroomService.listGroup({schoolId: query.schoolId})
            groupOption = groupOption.data.map(group => ({
              value: group._id,
              label: group.className,
            }))
            setSelect({
              ...selects,
              ...{
                school: schoolOption, schoolYear: schoolYearOpts, parent: groupOption
              }
            });
          }
        }
      }
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

  const onChangeSchool = async (e) => {
    const schoolYear = await schoolYearService.list({schoolId: e.value})
    if (schoolYear) {
      setSchoolYearOptions(schoolYear.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      })));
    }
  };

  const onChangeSchoolYear = async (e) => {
    const groups = await classroomService.listGroup({schoolId: e.value, limit: 10});
    if (groups.total) {
      setGroupOptions(groups.data?.map((data) => ({
        value: data._id,
        label: data.className,
      })));
    }
  }

  const handleSubmitSearch = async (values) => {
    values.preventDefault();

    if (filter.s === '') delete filter.s;
    if (filter.schoolId === '') delete filter.schoolId;
    if (filter.schoolYearId === '') delete filter.schoolYearId;
    if (filter.parentId === '') delete filter.parentId;

    router.push({
        pathname: router.pathname,
        query: _.pickBy(filter, _.identity),
      },
      undefined,
      {shallow: true}
    );

    const res = await classroomService.list(_.pickBy(filter, _.identity))

    if (_.isEmpty(res)) {
      swal({
        text: "Nội dung tìm kiếm ít nhất là 3 ký tự",
        icon: "error"
      });
    } else {
      if (filter.s) {
        const filteredData = res.data?.filter((item) => {
          return Object.values(item.className)
            .join("")
            .toLowerCase()
            .includes(filter.s?.toLowerCase());
        });
        return setListClassroom({...listClassroom, data: filteredData});
      } else {
        return setListClassroom(res);
      }
    }
  };

  return (
    <>
      <h4>Lớp</h4>
      <form onSubmit={handleSubmitSearch}>
        <div className='grid-container'>
          <Input
            label='Tìm kiếm'
            placeholder='Tìm kiếm..'
            name="s"
            onChange={e => setFilter({...filter, s: e.target.value})}
          />
          <Select
            label='Tên trường'
            placeholder='Chọn trường'
            name='schoolId'
            onChange={e => {
              onChangeSchool(e);
              onChangeSchoolYear(e);
              setSelect({...selects, ...{school: e, schoolYear: null, parent: null}})
              setFilter({...filter, schoolId: e.value, schoolYearId: '', parentId: ''})
            }}
            value={selects.school}
            options={schoolOptions}
          />
          <Select
            label='Niên khoá trường'
            name='schoolYearId'
            value={selects.schoolYear}
            onChange={e => {
              setSelect({...selects, ...{schoolYear: e}});
              setFilter({...filter, schoolYearId: e.value})
            }}
            options={schoolYearOptions}
          />
          <Select
            label='Khối'
            name='parentId'
            value={selects.parent}
            onChange={e => {
              setSelect({...selects, ...{parent: e}})
              setFilter({...filter, parentId: e.value})
            }}
            options={groupOptions}
          />
        </div>
        <Button type='submit'>Tìm kiếm</Button>
      </form>
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
              {!_.isEmpty(listClassroom?.data)
                ? listClassroom.data?.map((cr, index) => (
                  <tr key={index}>
                      <td>{parseInt(skip) + index + 1}</td>
                      <td className='text-center'>{cr.className}</td>
                      <td/>
                      <td/>
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
                : (<tr><td colSpan={5}>Chưa có dữ liệu</td></tr>)
              }
            </tbody>
          </table>
          <Pagination data={listClassroom}/>
        </div>
      </div>
    </>
  );
}

export default ClassroomList;