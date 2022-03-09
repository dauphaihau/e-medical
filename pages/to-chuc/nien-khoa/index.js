import {useEffect, useRef, useState} from "react";
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

export function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => isMounted.current = false;
  }, []);

  return isMounted;
}

const SchoolYearList = () => {
  const router = useRouter();
  const isMounted = useIsMounted();
  const [listSchoolYear, setListSchoolYear] = useState([])
  const [listSchool, setListSchool] = useState([]);
  let skip = 0;

  useEffect(async () => {
    const {...response} = await schoolYearService.list();
    setListSchoolYear(response.data);

    const schools = await schoolService.list({limit: 100});
    if (schools.total && isMounted.current) {
      setListSchool(schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      })));
    }
  }, []);

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
          s
        }
      }
    });
  };

  const handleSubmit = async (data) => {
    if (data.s === '') delete data.s;
    if (data.schoolId === '') delete data.schoolId;
    const {...res} = await schoolYearService.list(data);
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
        onSubmit={handleSubmit}
        enableReinitialize
        initialValues={{s: '', schoolId: '',}}
      >
        {({handleChange, setFieldValue}) => (
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
                onChange={e => setFieldValue('schoolId', e.value)}
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
