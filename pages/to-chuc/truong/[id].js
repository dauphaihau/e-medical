import Router, {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import swal from "sweetalert";

import Button from "@components/button";
import Input from "@components/form/input";
import Region from "@components/form/region";
import {schoolService, locationService} from "@services";
import {useAuth} from "../../../context/auth";
import Select from "../../../components/form/select";
import Link from "next/link";
import {PencilIcon} from "@heroicons/react/outline";

const validationSchema = Yup.object().shape({
  schoolname: Yup.string()
    .min(5, 'Tên trường ít nhất là 5 ký tự')
    .max(50, 'Tên trường tối đa là 50 ký tự')
    .required('Tên người dùng không được để trống'),
  address: Yup.string().required('Địa chỉ không được để trống'),
  province: Yup.object().shape({
    value: Yup.string().required('Vui lòng chọn tỉnh/thành'),
  }),
  district: Yup.object().shape({
    value: Yup.string().required('Vui lòng chọn quận/huyện'),
  }),
  ward: Yup.object().shape({
    value: Yup.string().required('Vui lòng chọn phường/xã'),
  }),
});
const defaultSelectValue = {
  value: "",
  label: "",
  code: "",
};

const UpdateSchool = () => {
  const router = useRouter();
  const {school: schoolFormProfile, user} = useAuth();
  const [listProvince, setListProvince] = useState([]);
  const [school, setSchool] = useState()
  const [isAdminOrManager, setIsAdminOrManager] = useState(false)

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
    return () => {};
  }, [router.isReady])

  const loadInit = async () => {
    const {id} = router.query;
    const provinces = await locationService.listProvince();
    setListProvince(provinces);

    if (user.role === 'admin' || user.role === 'manager') {
      setIsAdminOrManager(true)
    }

    if (id) {
      const school = await schoolService.detail(id);
      if (!school) {
        swal('Truờng này không tồn tại', '', 'error')
          .then(Router.push('/to-chuc/truong'))
      }
      setSchool(school);
    }
  }

  const handleSubmitForm = async (data) => {
    let bodyData = {};
    const {id} = router.query;
    if (data.province && !_.isEmpty(data.province)) {
      bodyData.province = {code: data.province.code, provinceName: data.province.label}
    }
    if (data.district && !_.isEmpty(data.district)) {
      bodyData.district = {code: data.district.code, districtName: data.district.label}
    }
    if (data.ward && !_.isEmpty(data.ward)) {
      bodyData.ward = {code: data.ward.code, wardName: data.ward.label}
    }
    bodyData = {...data, ...bodyData};

    const result = await schoolService.update(id, bodyData)
    if (result) {
      swal({
        title: "Cập nhật thành công",
        icon: "success"
      })
        .then(() => Router.push('/to-chuc/truong'))
    } else {
      swal({
        title: "Cập nhật không thành công",
        icon: "error"
      })
    }
  }

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolname: isAdminOrManager ? school?.schoolname : schoolFormProfile?.schoolname,
        address: school ? school.address : '',
        province: school && school.province ? {
          value: school.province.code,
          code: school.province.code,
          label: school.province.provinceName
        } : defaultSelectValue,
        district: school && school.district ? {
          value: school.district.code,
          code: school.district.code,
          label: school.district.districtName
        } : defaultSelectValue,
        ward: school && school.ward ? {
          value: school.ward.code,
          code: school.ward.code,
          label: school.ward.wardName
        } : defaultSelectValue,
      }}
    >
      {({handleChange, values}) => (
        <Form className='form'>
          <h3>Cập nhật thông tin trường</h3>
          {isAdminOrManager ? <>
              <Input
                label='Tên trường'
                name='schoolname'
                onChange={handleChange}
                value={values.schoolname}
              />
            </>
            : <>
              <Select
                label='Tên trường'
                name='schoolId'
                isDisable={true}
                value={{value: schoolFormProfile?._id, label: schoolFormProfile?.schoolname}}
              />
            </>
          }
          <Input
            label='Địa chỉ'
            name='address'
            onChange={handleChange}
            value={values.address}
            useFormik={true}
          />
          <Field
            component={Region}
            listProvince={listProvince}
            provinceSelected={values.province}
            districtSelected={values.district}
            wardSelected={values.ward}
          />
          {user.role !== 'staff'
            ? <Button type='submit' className='mr-4'>Cập nhật</Button>
            : <Link href={'/to-chuc/truong/'}>
              <a><Button type='submit' className='mr-4'>Trở lại</Button></a>
            </Link>
          }
        </Form>
      )}
    </Formik>
  )
}
export default UpdateSchool;