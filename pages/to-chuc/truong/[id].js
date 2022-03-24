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
  const {school, user} = useAuth();
  const [listProvince, setListProvince] = useState([]);
  const [schoolSelected, setSchoolSelected] = useState()
  console.log('school', school)
  console.log('school-selected', schoolSelected)

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady])

  const loadInit = async () => {
    const provinces = await locationService.listProvince();
    setListProvince(provinces);

    // if (user.role === 'admin') {
    //   const {id} = router.query;
    //   const school = await schoolService.detail(id);
    //   if (!school) {
    //     swal('Truờng này không tồn tại', '', 'error')
    //       .then(Router.push('/to-chuc/truong'))
    //   }
    //   setSchoolSelected(school);
    // } else {
    // }
      setSchoolSelected(school)
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
        schoolname: school?._id,
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
      {({handleChange, values, errors}) => (
        <Form className='form'>
          <h3>Cập nhật thông tin trường</h3>
          <Select
            label='Tên trường'
            name='schoolId'
            isDisable={true}
            value={{value: school?._id, label: school?.schoolname}}
          />
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
          {user.role !== 'staff' && <Button type='submit' className='mr-4'>Cập nhật</Button>}
        </Form>
      )}
    </Formik>
  )
}
export default UpdateSchool;