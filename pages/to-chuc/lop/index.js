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
  const [isLoading, setIsLoading] = useState(false)
  const [listClassroom, setListClassroom] = useState()

  const [schoolOptions, setSchoolOptions] = useState([]);
  const [schoolYearOptions, setSchoolYearOptions] = useState([])
  const [groupOptions, setGroupOptions] = useState([])

  const [selects, setSelects] = useState({
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
    return () => {};
  }, [router.isReady]);

  const loadInit = async () => {

    if (_.isEmpty(query)) {
      const listClass = await classroomService.list();
      setListClassroom(listClass);

      const schools = await schoolService.list({limit: 100});
      if (schools.total) {
        setSchoolOptions(schools.data.map((data) => ({
          value: data._id,
          label: data.schoolname,
        })));
      }
    } else {
      await setIsLoading(true);
      const listClass = await classroomService.list(query);
      setListClassroom(listClass);

      const schools = await schoolService.list({limit: 100});
      if (schools.total) {
        setSchoolOptions(schools.data.map((data) => ({
          value: data._id,
          label: data.schoolname,
        })));
      }

      if (query.schoolId) {
        let {data: schoolOption} = await schoolService.detail(query.schoolId);
        schoolOption = {
          value: schoolOption._id,
          label: schoolOption.schoolname
        };
        setSelects({...selects, ...{school: schoolOption}});

        if (query.schoolYearId) {
          let schoolYearOpts = await schoolYearService.list(
            _.pickBy(query.schoolYearId, _.identity)
          )
          schoolYearOpts = {
            value: schoolYearOpts.data[0]?._id,
            label: schoolYearOpts.data[0]?.schoolYearName
          };
          setSelects({...selects, ...{school: schoolOption, schoolYear: schoolYearOpts}});
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
            setSelects({
              ...selects,
              ...{
                school: schoolOption, schoolYear: schoolYearOpts, parent: groupOption
              }
            });
          }
        }
      }

      await setIsLoading(false);
    }
  }

  const handleDelete = async (id) => {
    swal({
      title: "B???n ch???c ch???n mu???n x??a?",
      text: "",
      icon: "warning",
      buttons: true,
      successMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await classroomService.delete(id)
        swal({
          title: result.message,
          icon: result.status?"success":"error"
        })
          .then(() => router.reload())
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
    const newFilter = _.omitBy(filter, _.isEmpty);

    router.push({
        pathname: router.pathname,
        query: _.pickBy(newFilter, _.identity),
      },
      undefined,
      {shallow: true}
    );

    const res = await classroomService.list(_.pickBy(newFilter, _.identity))

    if (_.isEmpty(res)) {
      swal({
        text: "N???i dung t??m ki???m ??t nh???t l?? 3 k?? t???",
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
      <h4>L???p</h4>
      <form onSubmit={handleSubmitSearch}>
        <div className='grid-container'>
          <Input
            label='T??m ki???m'
            placeholder='T??n l???p'
            name="s"
            onChange={e => setFilter({...filter, s: e.target.value})}
          />
          <Select
            label='T??n tr?????ng'
            placeholder='Ch???n tr?????ng'
            name='schoolId'
            onChange={e => {
              onChangeSchool(e);
              onChangeSchoolYear(e);
              setSelects({...selects, ...{school: e, schoolYear: null, parent: null}})
              setFilter({...filter, schoolId: e.value, schoolYearId: '', parentId: ''})
            }}
            value={selects.school}
            options={schoolOptions}
          />
          <Select
            label='Ni??n kho?? tr?????ng'
            name='schoolYearId'
            value={selects.schoolYear}
            onChange={e => {
              setSelects({...selects, ...{schoolYear: e}});
              setFilter({...filter, schoolYearId: e.value})
            }}
            options={schoolYearOptions}
          />
          <Select
            label='Kh???i'
            name='parentId'
            value={selects.parent}
            onChange={e => {
              setSelects({...selects, ...{parent: e}})
              setFilter({...filter, parentId: e.value})
            }}
            options={groupOptions}
          />
        </div>
        <Button type='submit'>T??m ki???m</Button>
      </form>

      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <div className='container-table w-[700px] lg:w-full'>
          <table className='table'>
            <thead>
              <tr>
                <th className='w-2 text-center'>STT</th>
                <th>T??n l???p</th>
                <th>S??? h???c sinh</th>
                <th>Gi??o vi??n ch??? nhi???m</th>
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
                      </td>
                    </tr>
                ))
                : (<tr><td colSpan={5}>Ch??a c?? d??? li???u</td></tr>)
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

export default ClassroomList;