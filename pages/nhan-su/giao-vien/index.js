import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from 'next/link'
import _ from "lodash";
import swal from "sweetalert";

import {memberService} from "@services";
import Input from "@components/form/input";
import Button from "@components/button";
import {PencilIcon, TrashIcon} from "@heroicons/react/outline";
import Select from "@components/form/select";
import {classroomService, schoolService} from "@services";
import {useAuth} from "../../../context/auth";
import {schoolYearService} from "../../../services";

const Teacher = () => {
  const [members, setMembers] = useState();
  const {schoolId} = useAuth();
  const router = useRouter();

  const [schoolYearOptions, setSchoolYearOptions] = useState([])
  const [groupOptions, setGroupOptions] = useState([])
  const [classroomOptions, setClassroomOptions] = useState([])

  const [selects, setSelects] = useState({
    s: '',
    schoolYear: {
      value: '',
      label: '',
    },
    group: {
      value: '',
      label: '',
    },
    class: {
      value: '',
      label: '',
    },
  })
  const [filter, setFilter] = useState({
    s: '',
    schoolYearId: '',
    parentId: '',
  })

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
    return () => {};
  }, [router.isReady]);

  const loadInit = async () => {

    const schoolYear = await schoolYearService.list({schoolId})
    if (schoolYear) {
      setSchoolYearOptions(schoolYear.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      })));
    }

    if (_.isEmpty(router.query)) {
      const listMember = await memberService.list({type: 'teacher'});
      setMembers(listMember);

    } else {
      const listMember = await memberService.list({...router.query, type: 'teacher'});
      setMembers(listMember);

      if (router.query.schoolId) {
        let schoolOption = await schoolService.detail(router.query.schoolId);
        schoolOption = {
          value: schoolOption._id,
          label: schoolOption.schoolname
        };
        setSelects({...selects, ...{school: schoolOption}});

        if (router.query.parentId) {
          let groupOption = await classroomService.listGroup({schoolId: query.schoolId})
          groupOption = groupOption.data.map(group => ({
            value: group._id,
            label: group.className,
          }))
          setSelects({
            ...selects,
            ...{school: schoolOption, parent: groupOption}
          });
        }
      }
    }
  }

  const onChangeSchoolYear = async (e) => {
    const groups = await classroomService.listGroup({schoolId, limit: 10});
    if (groups.total) {
      setGroupOptions(groups.data?.map((data) => ({
        value: data._id,
        label: data.className,
      })));
    }
  }

  const onChangeGroup = async (e) => {
    const classes = await classroomService.list({schoolId, limit: 10});
    if (classes.total) {
      setClassroomOptions(classes.data?.map((data) => ({
        value: data._id,
        label: data.className,
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
        const result = await memberService.remove(id);
        swal({
          title: result.message,
          icon: result.status?"success":"error"
        })
          .then(() => router.reload())
      }
    });
  };

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    const newFilter = _.omitBy(filter, _.isEmpty);

    router.push({
        pathname: router.pathname,
        query: _.pickBy(newFilter, _.identity),
      },
      undefined,
      {shallow: true}
    );

    const res = await memberService.list({...newFilter, type: 'teacher'})

    if (!res) {
      swal({
        text: "Nội dung tìm kiếm ít nhất là 3 ký tự",
        icon: "error"
      });
    }
    setMembers(res);
  };

  return (
    <>
      <h4>Danh sách giáo viên</h4>
      <form onSubmit={handleSubmitSearch}>
        <div className='grid-container'>
          <Input
            label='Tìm kiếm'
            placeholder='Tên giáo viên'
            name="s"
            onChange={e => setFilter({...filter, s: e.target.value})}
          />
          <Select
            label='Niên khoá trường'
            name='schoolYearId'
            value={selects.schoolYear}
            onChange={e => {
              onChangeSchoolYear(e)
              setSelects({...selects, ...{schoolYear: e}});
              setFilter({...filter, schoolYearId: e.value})
            }}
            options={schoolYearOptions}
          />
          <Select
            label='Tên khối'
            name='classGroupId'
            value={selects.parent}
            onChange={e => {
              onChangeGroup(e)
              setSelects({...selects, ...{group: e}})
              setFilter({...filter, classGroupId: e.value})
            }}
            options={groupOptions}
          />
          <Select
            label='Tên lớp'
            name='classId'
            value={selects.parent}
            onChange={e => {
              setSelects({...selects, ...{class: e}})
              setFilter({...filter, classId: e.value})
            }}
            options={classroomOptions}
          />
        </div>
        <Button type='submit'>Tìm kiếm</Button>
      </form>
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <div className='container-table w-[1000px] lg:w-full'>
          <table className='table'>
            <thead>
            <tr>
              <th className="w-3">STT</th>
              <th className="text-left">Nhân viên</th>
              <th className="text-left">Phone</th>
              <th className="text-left">Lớp CN</th>
              <th/>
            </tr>
            </thead>
            <tbody>
              {!_.isEmpty(members?.data)
                ? members.data?.map((row, idz) => (
                  <tr key={idz}>
                        <td>{idz + 1}</td>
                        <td>{row.fullName}</td>
                        <td>{row.phoneNumber}</td>
                        <td>{(row.schoolWorking) ? row.schoolWorking[0]?.className : ''}</td>
                        <td className='text-center'>
                          <Link href={router.pathname + '/' + row._id}>
                               <a><PencilIcon className='h-5 w-5 inline'/></a>
                          </Link>
                          <TrashIcon
                            className='h-5 w-5 inline ml-4 cursor-pointer'
                            onClick={() => handleDelete(row._id)}
                          />
                        </td>
                    </tr>
                ))
                : (<tr><td colSpan='5'>Chưa có dữ liệu</td></tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Teacher;
