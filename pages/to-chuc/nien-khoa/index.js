import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import swal from "sweetalert";
import {Form, Formik} from "formik";
import _ from "lodash";

import Input from "@components/form/input";
import {schoolYearService} from "@services";
import Pagination from "@components/table/pagination";
import {PencilIcon, TrashIcon} from "@heroicons/react/outline";
import {schoolService} from "@services";
import Button from "@components/button";
import Select from "@components/form/select";

let skip = 0;

const SchoolYearList = () => {
  const router = useRouter();
  const [listSchoolYear, setListSchoolYear] = useState([])
  const [listSchool, setListSchool] = useState([]);
  const [schoolSelected, setSchoolSelected] = useState();

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady]);

  useEffect(() => {
    setSchoolSelected(schoolSelected)
  }, [schoolSelected])

  const loadInit = async () => {
    const {query} = router;
    const {...response} = await schoolYearService.list();
    setListSchoolYear(response.data);

    const schools = await schoolService.list({limit: 100});
    if (schools.total) {
      const schoolOptions = schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      }));
      setListSchool(schoolOptions);
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
      const res = await schoolYearService.list(_.pickBy({...query}, _.identity))
      setListSchoolYear(res.data);

      if (query.schoolId) {
        const schoolOption = await schoolService.detail(query.schoolId);
        setSchoolSelected({
          value: schoolOption._id,
          label: schoolOption.schoolname
        })
      }
    }
  };

  const handleDelete = async (id) => {
    swal({
      title: "Bạn chắc chắn muốn xóa?",
      text: "",
      icon: "warning",
      buttons: true,
      successMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const result = await schoolYearService.delete(id)
        if (result) {
          router.reload();
        } else {
          swal('Xóa không thành công!!', '', 'error');
        }
      }
    });
  };

  const handleSubmitSearch = async (data) => {
    if (data.s === '') delete data.s;
    if (data.schoolId === '') delete data.schoolId;

    await router.push({
        pathname: router.pathname,
        query: _.pickBy({...router.query, ...data}, _.identity),
      },
      undefined,
      {shallow: true}
    );

    const {...res} = await schoolYearService.list(
      _.pickBy({...router.query, ...data}, _.identity)
    )

    if (_.isEmpty(res)) {
      swal({
        text: "Tìm kiếm không thành công",
        icon: "error"
      });
    }
    setListSchoolYear(res.data)
  };

  return (
    <>
      <h4>Tổ chức</h4>
      <Formik
        onSubmit={handleSubmitSearch}
        enableReinitialize
        initialValues={{s: '', schoolId: '',}}
      >
        {({handleChange, setFieldValue, values}) => (
          <Form>
            <div className='grid-container'>
              <Input
                label='Tìm kiếm'
                placeholder='Tên niên khoá...' name="s"
                onChange={handleChange}
              />
              <Select
                label='Tên trường'
                name='schoolId'
                id="schoolId"
                instanceId="schoolId"
                value={schoolSelected}
                onChange={e => {
                  setFieldValue('schoolId', e.value);
                  setSchoolSelected(e)
                }}
                options={listSchool}
                placeholder='Chọn trường'
              />
            </div>
            <Button type='submit'>Tìm kiếm</Button>
          </Form>
        )}
      </Formik>
      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <div className='container-table'>
          <h4>Niên Khoá</h4>
          <table className='table'>
            <thead>
            <tr>
              <th className='w-2 text-center'>STT</th>
              <th>Niên khoá</th>
              <th>Số lớp</th>
              <th>Số học sinh</th>
              <th className="w-[100px]"/>
            </tr>
            </thead>
            <tbody>
              {listSchoolYear?.map((item, idz) => (
                <tr key={idz}>
                  <td>{skip + idz + 1}</td>
                  <td className='text-center'>{item.schoolYearName}</td>
                  <td/>
                  <td/>
                  <td>
                    <Link href={`/to-chuc/nien-khoa/${item._id}`}>
                      <a><PencilIcon className='h-5 w-5 inline'/></a>
                    </Link>
                    <TrashIcon
                      className='h-5 w-5 inline ml-4 cursor-pointer'
                      onClick={() => handleDelete(item._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination data={listSchoolYear}/>
        </div>
      </div>
    </>
  );
}
export default SchoolYearList;


