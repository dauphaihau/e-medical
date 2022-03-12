import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Form, Formik} from "formik";
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

const defaultSelectValue = {
  value: "",
  label: "",
};

const GroupList = () => {
  const router = useRouter();
  const {query} = router;
  const [listGroup, setListGroup] = useState()
  const [schoolOptions, setSchoolOptions] = useState([]);
  const [schoolYearOptions, setSchoolYearOptions] = useState([])

  const [schoolSelected, setSchoolSelected] = useState();
  const [schoolYearSelected, setSchoolYearSelected] = useState()

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady, router.asPath])

  const loadInit = async () => {
    const listGroup = await classroomService.listGroup();
    setListGroup(listGroup);

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
      const {...res} = await classroomService.listGroup(
        _.pickBy({...query}, _.identity)
      )
      setListGroup(res);

      //region reload init filter select
      if (query.schoolId) {
        const schoolOption = await schoolService.detail(query.schoolId);
        setSchoolSelected({
          value: schoolOption._id,
          label: schoolOption.schoolname
        })
        const schoolYears = await schoolYearService.list({schoolId: query.schoolId, limit: 100})
        if (schoolYears && schoolYears.total) {
          setSchoolYearOptions(schoolYears.data.map((data) => ({
            value: data._id,
            label: data.schoolYearName,
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

  const handleSubmitSearch = async (data) => {
    if (data.s === '') delete data.s;
    if (data.schoolId === '') delete data.schoolId;
    if (data.schoolYearId === '') delete data.schoolYearId;
    console.log('data-submit', data);

    router.push({
        pathname: router.pathname,
        query: _.pickBy({...query, ...data}, _.identity),
      },
      undefined,
      {shallow: true}
    );

    const {...res} = await classroomService.listGroup(
      _.pickBy({...query, ...data}, _.identity)
    )

    if (_.isEmpty(res)) {
      swal({
        text: "Tìm kiếm không thành công",
        icon: "error"
      });
    }
    setListGroup(res)
  };

  const onChangeSchool = async (idSchool) => {
    const schoolYears = await schoolYearService.list({schoolId: idSchool, limit: 100})
    if (schoolYears && schoolYears.total) {
      setSchoolYearOptions(schoolYears.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      })));
    } else {
      setSchoolYearOptions();
    }
  };

  return (
    <>
      <h4>Khối</h4>
      <Formik
        onSubmit={handleSubmitSearch}
        enableReinitialize
        initialValues={{s: '', schoolId: '', schoolYearId: '', parentId: null}}
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
                value={schoolSelected}
                onChange={e => {
                  onChangeSchool(e.value);
                  setFieldValue('schoolId', e.value);
                  setSchoolSelected(e);
                  setSchoolYearOptions([]);
                }}
                options={schoolOptions}
                placeholder='Chọn trường'
              />
              <Select
                label='Niên khoá'
                name='schoolYearId'
                value={schoolYearSelected}
                onChange={e => {
                  setFieldValue('schoolYearId', e.value);
                  setSchoolYearSelected(e);
                }}
                options={schoolYearOptions}
                placeholder='Chọn niên khoá'
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
                <th className='text-center w-1'>STT</th>
                <th>Tên khối</th>
                <th>Trường</th>
                <th className="w-[100px]"/>
              </tr>
            </thead>
            <tbody>
              {listGroup && listGroup.total
                ? (
                  listGroup.data.map((group, index) => (
                    <tr key={index}>
                    <td>{skip + index + 1}</td>
                    <td className='text-center'>{group.className}</td>
                    <td></td>
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
                )
                : (
                  <tr><td colSpan={4}>Chưa có dữ liệu</td></tr>
                )
              }
            </tbody>
          </table>
          {/*<Pagination data={listClassroom}/>*/}
        </div>
      </div>
    </>
  );
}

export default GroupList;

