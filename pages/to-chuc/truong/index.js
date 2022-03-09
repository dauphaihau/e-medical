import {useEffect, useState} from "react";
import Link from "next/link";
import swal from "sweetalert";
import {Field, Form, Formik} from "formik";
import {useRouter} from "next/router";
import _ from "lodash";

import {PencilIcon, TrashIcon} from "@heroicons/react/outline";
import Input from "@components/form/input";
import Pagination from "@components/pagination";
import {schoolService} from "@services";
import Button from "@components/button";
import Region from "@components/form/region";
import {locationService} from "@services";

const SchoolList = () => {
  const [schools, setSchools] = useState([])
  const [listProvince, setListProvince] = useState([]);
  const router = useRouter();
  let skip = 0;

  useEffect(async () => {
    try {
      const {...response} = await schoolService.list()
      setSchools(response.data)

      const provinces = await locationService.listProvince();
      setListProvince(provinces);
    } catch (error) {
      console.log({error})
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
        const result = await schoolService.delete(id);
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
    let bodyData = {
      s: data.s,
      province: data.province.code,
      district: data.district.code,
      ward: data.ward.code,
    };
    if (bodyData.s === '') delete bodyData.s;
    const test = _.pickBy({limit: 12, ...router.query}, _.identity);
    console.log('test', test);
    router.push({
        // pathname: '/organization/school/',
        // query: {
        //   province: bodyData.province,
        //   // district: bodyData.district,
        //   // ward: bodyData.ward,
        // }
        query: _.pickBy({...router.query, ...bodyData}, _.identity),
      },
      undefined,
      {shallow: true}
    );
    const {...res} = await schoolService.list({
      params: _.pickBy({limit: '0', ...router.query, ...bodyData}, _.identity())
    })
    if (_.isEmpty(res)) {
      swal({
        text: "Tìm kiếm không thành công",
        icon: "error"
      });
    }
    setSchools(res.data);
  };

  return (
    <>
      <h4>Tổ chức</h4>
      <Formik
        onSubmit={handleSubmit}
        enableReinitialize
        initialValues={{
          s: '',
          province: {},
          district: {},
          ward: {},
        }}
      >
        {({handleChange, values}) => (
          <Form>
            <div className='grid-container'>
              <Input
                label='Tìm kiếm'
                placeholder='Tên trường...' name="s"
                onChange={handleChange}
              />
              <Field
                component={Region}
                listProvince={listProvince}
              />
            </div>
            <Button type='submit'>Tìm kiếm</Button>
          </Form>
        )}
      </Formik>
      <div className="mt-8 overflow-x-auto lg:overflow-x-visible">
        <div className='container-table'>
          <h4>Danh sách trường</h4>
          <table className='table'>
            <thead>
              <tr>
                <th className='text-center'>STT</th>
                <th className='text-left'>Tên trường</th>
                <th className='text-left'>Địa chỉ</th>
                <th className='text-left'>Tỉnh/thành</th>
                <th className='text-left'>Quận/Huyện</th>
                <th className='text-left'>Phường/Xã</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              {schools?.map((school, index) => (
                <tr key={index}>
                  <td>{skip + index + 1}</td>
                  <td>{school.schoolname}</td>
                  <td>{school.address}</td>
                  <td>{school.province?.provinceName}</td>
                  <td>{school.district?.districtName}</td>
                  <td>{school.ward?.wardName}</td>
                  <td>
                     <Link href={`/to-chuc/truong/${school._id}`}>
                       <a><PencilIcon className='h-5 w-5 inline'/></a>
                     </Link>
                     <TrashIcon
                       className='h-5 w-5 inline ml-4 cursor-pointer'
                       onClick={() => handleDelete(school._id)}
                     />
                  </td>
              </tr>
              ))}
            </tbody>
          </table>
          {/* <Pagination data={schools}/> */}
        </div>
      </div>

    </>
  );
}

export default SchoolList;

