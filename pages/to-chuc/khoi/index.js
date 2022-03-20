import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import _ from "lodash";
import swal from "sweetalert";

import Input from "@components/form/input";
import {classroomService} from "@services";
import {PencilIcon, TrashIcon} from "@heroicons/react/outline";
import Pagination from "@components/table/pagination";
import {schoolService, schoolYearService} from "@services";
import Select from "@components/form/select";
import Button from "@components/button";

let skip = 0;

const GroupList = () => {
  const router = useRouter();
  const {query} = router;
  const [isLoading, setIsLoading] = useState(false)

  const [listGroup, setListGroup] = useState({})

  const [schoolOptions, setSchoolOptions] = useState([]);
  const [schoolYearOptions, setSchoolYearOptions] = useState([])

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
    return () => setListGroup({})
  }, [router.isReady, router.asPath])

  const loadInit = async () => {

    if (_.isEmpty(query)) {
      const listGroup = await classroomService.listGroup();
      setListGroup(listGroup);

      const schools = await schoolService.list({limit: 100});
      if (schools.total) {
        setSchoolOptions(schools.data.map((data) => ({
          value: data._id,
          label: data.schoolname,
        })));
      }

    } else {
      // await setIsLoading(true);

      const listGroup = await classroomService.listGroup(query);
      if (filter.s) {
        const filteredData = listGroup.data?.filter((item) => {
          return Object.values(item.className)
            .join("")
            .toLowerCase()
            .includes(filter.s?.toLowerCase());
        });
        return setListGroup({...listGroup, data: filteredData});
      } else {
        setListGroup(listGroup);
      }

      const schools = await schoolService.list({limit: 100});
      if (schools.total) {
        setSchoolOptions(schools.data.map((data) => ({
          value: data._id,
          label: data.schoolname,
        })));
      }

      const res = await classroomService.listGroup(
        _.pickBy({...query}, _.identity)
      )
      setListGroup(res);

      //region init selected
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
        }
        const schoolYears = await schoolYearService.list({schoolId: query.schoolId})
        if (schoolYears && schoolYears.total) {
          setSchoolYearOptions(schoolYears.data.map((data) => ({
            value: data._id,
            label: data.schoolYearName,
          })));
        }
      }
      // endregion

      // await setIsLoading(false);
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
        const result = await classroomService.deleteGroup(id);
        if (result) {
          router.reload();
        } else {
          swal('Xóa không thành công!!', '', 'error');
          s
        }
      }
    });
  }

  const handleSubmitSearch = async (values) => {
    values.preventDefault();
    const newFilter = _.omitBy(filter, _.isEmpty);

    router.push({
        pathname: router.pathname,
        query: _.pickBy(newFilter, _.identity),
      },
      undefined,
      {shallow: true}
    );

    let res = await classroomService.listGroup(_.pickBy(newFilter, _.identity))

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
        return setListGroup({...listGroup, data: filteredData});
      } else {
        return setListGroup(res);
      }
    }
  };

  const onChangeSchool = async (e) => {
    const schoolYears = await schoolYearService.list({schoolId: e.value})
    if (schoolYears.total) {
      setSchoolYearOptions(schoolYears.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      })));
    }
  };

  return (
    <>
      {isLoading ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <svg className="animate-spin h-5 w-5 text-primary" xmlns="http:www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
          </div>
        )
        : (
          <>
            <h4>Khối</h4>
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
                    setSelect({...selects, schoolYear: e});
                    setFilter({...filter, schoolYearId: e.value})
                  }}
                  options={schoolYearOptions}
                />
              </div>
              <Button type='submit'>Tìm kiếm</Button>
            </form>
            <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
              <div className='container-table w-[800px] lg:w-full'>
                <table className='table'>
                  <thead>
              <tr>
                <th className='text-center w-1'>STT</th>
                <th>Tên khối</th>
                <th>Trường</th>
                <th className="w-[100px]"/>
              </tr>
                  </thead>
                  <tbody>
                    {!_.isEmpty(listGroup.data)
                      ? listGroup.data.map((group, index) => (
                        <tr key={index}>
                        <td>{skip + index + 1}</td>
                        <td className='text-center'>{group.className}</td>
                        <td/>
                        <td>
                          <Link href={`/to-chuc/khoi/${group._id}`}>
                            <a><PencilIcon className='h-5 w-5 inline'/></a>
                          </Link>
                          <TrashIcon
                            className='h-5 w-5 inline ml-4 cursor-pointer'
                            onClick={() => handleDelete(group._id)}
                          />
                        </td>
                    </tr>
                      ))
                      : (<tr><td colSpan={4}>Chưa có dữ liệu</td></tr>)
                    }
                  </tbody>
                </table>
                {/*<Pagination data={listClassroom}/>*/}
              </div>
            </div>
          </>
        )}
    </>
  );
}

export default GroupList;

