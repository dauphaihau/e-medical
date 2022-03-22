import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from 'next/link'
import _ from "lodash";
import swal from "sweetalert";

import {memberService} from "@services";
import Input from "@components/form/input";
import Button from "@components/button";
import {PencilIcon} from "@heroicons/react/outline";
import Select from "@components/form/select";
import {classroomService, schoolService} from "@services";
import {useAuth} from "../../../context/auth";

const Teacher = () => {
  const router = useRouter();
  const {query} = router;
  const [members, setMembers] = useState();

  const [schoolOptions, setSchoolOptions] = useState([]);
  const [groupOptions, setGroupOptions] = useState([])

  const [selects, setSelect] = useState({
    s: '',
    school: {
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
    return () => setMembers([]);
  }, [router.isReady]);

  const loadInit = async () => {
    const schools = await schoolService.list({limit: 100});
    if (schools.total) {
      setSchoolOptions(schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      })));
    }

    if (_.isEmpty(query)) {
      const listMember = await memberService.list({type: 'teacher'});
      setMembers(listMember);
    } else {
      const listMember = await memberService.list({...query, type: 'teacher'});
      setMembers(listMember);
      if (query.schoolId) {
        let schoolOption = await schoolService.detail(query.schoolId);
        schoolOption = {
          value: schoolOption._id,
          label: schoolOption.schoolname
        };
        setSelect({...selects, ...{school: schoolOption}});

        if (query.parentId) {
          let groupOption = await classroomService.listGroup({schoolId: query.schoolId})
          groupOption = groupOption.data.map(group => ({
            value: group._id,
            label: group.className,
          }))
          setSelect({
            ...selects,
            ...{school: schoolOption, parent: groupOption}
          });
        }
      }
    }
  }

  const onChangeSchool = async (e) => {
    const groups = await classroomService.listGroup({schoolId: e.value, limit: 10});
    if (groups.total) {
      setGroupOptions(groups.data?.map((data) => ({
        value: data._id,
        label: data.className,
      })));
    }
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
    console.log('res', res);

    if (!res) {
      swal({
        text: "Nội dung tìm kiếm ít nhất là 3 ký tự",
        icon: "error"
      });
    }
    setMembers(res.data);
  };

  return (
    <>
      <h4>Danh sách giáo viên</h4>
      <form onSubmit={handleSubmitSearch}>
        <div className='grid-container'>
          <Input
            label='Tìm kiếm'
            placeholder='Tìm kiếm giáo viên..'
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
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <div className='container-table'>
          <table className='table'>
            <thead>
            <tr>
              <th className="w-3">STT</th>
              <th className="text-left">Nhân viên</th>
              <th className="text-left">Phone</th>
              <th className="text-left">Lớp CN</th>
              <th className="w-2"/>
            </tr>
            </thead>
            <tbody>
              {members?.total
                ? members.data.map((row, idz) => (
                  <tr key={idz}>
                        <td>{idz + 1}</td>
                        <td>{row.fullName}</td>
                        <td>{row.phoneNumber}</td>
                        <td>{(row.schoolWorking) ? row.schoolWorking?.className : ''}</td>
                        <td>
                          <Link href={router.pathname + '/' + row._id}>
                               <a><PencilIcon className='h-5 w-5 inline'/></a>
                          </Link>
                        </td>
                    </tr>
                ))
                : (<tr><td colSpan='4'>Chưa có dữ liệu</td></tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Teacher;
