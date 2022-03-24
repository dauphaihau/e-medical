import {Formik, Form, Field} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import swal from "sweetalert";
import Router, {useRouter} from "next/router";
import _ from "lodash";

import Button from "@components/button";
import Input from "@components/form/input";
import {memberService, schoolService} from "@services";
import Select from "@components/form/select";
import Region from "@components/form/region";
import {locationService} from "../../../services";

const phoneRegExp = /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/
const validationSchema = Yup.object().shape({
  schoolId: Yup.string().required(),
  fullName: Yup.string()
    .min(5, 'Tên trường ít nhất là 5 ký tự')
    .max(50, 'Tên trường tối đa là 50 ký tự')
    .required('Tên người dùng không được để trống'),
  phoneNumber: Yup.string()
    .required('Vui lòng nhập số điện thoại')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  // address: Yup.string().required('Địa chỉ không được để trống'),
  province: Yup.object().shape({}),
  district: Yup.object().shape({}),
  ward: Yup.object().shape({}),
});

const UpdateStaff = () => {
  const router = useRouter();
  const [member, setMember] = useState();
  const [listSchool, setListSchool] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [initData, setInitData] = useState({
    school: {},
    schoolYear: {},
    classGroup: {},
    class: {},
    province: {},
    district: {},
    ward: {},
  });
  const [selects, setSelect] = useState({
    province: {
      value: '',
      label: '',
      code: '',
    },
    district: {
      value: '',
      label: '',
      code: '',
    },
    ward: {
      value: '',
      label: '',
      code: '',
    },
  })

  useEffect(() => {
    if (!router.isReady) return;

    loadInit();
    return () => setMember({})
  }, [router.isReady]);

  const loadInit = async () => {
    const {id} = router.query;
    if (id) {
      const memberRes = await memberService.detail(id);
      if (memberRes && !_.isEmpty(memberRes) && memberRes.province?.code !== undefined) {
        const provinces = await locationService.listProvince();
        setProvinceOptions(provinces);
        const provinceOption = _.find(provinces, (o) => o.code === memberRes.province.code);
        const districts = await locationService.listDistrict(memberRes.province.code);
        const districtOption = _.find(districts, (o) => o.code === memberRes.district.code);
        const wards = await locationService.listWard(memberRes.district.code);
        const wardOption = _.find(wards, (o) => o.code === memberRes.ward.code);
        setSelect({...selects, ...{ward: wardOption, district: districtOption, province: provinceOption}})
      }
      setMember(memberRes);

      let initDataSelected = {};
      const schools = await schoolService.list({limit: 20});
      if (schools.total) {
        const schoolSelect = schools.data.map((data) => ({
          value: data._id,
          label: data.schoolname,
        }));
        setListSchool(schoolSelect);
        const initSchool = _.find(schoolSelect, {value: memberRes.schoolWorking?.schoolId});
        initDataSelected.school = initSchool;
      }
      setInitData(initDataSelected);
    } else {
      Router.push('/nhan-su/nhan-vien/');
    }
  }

  const handleSubmitForm = async (data) => {
    const {id} = router.query;
    try {
      await memberService.update(id, data);
      swal('Cập nhật thành công', '', 'success')
        .then(() => Router.push('/nhan-su/can-bo/'));
    } catch (error) {
      swal('Cập nhật không thành công.', 'Vui lòng thử lại.', 'error');
    }
  };

  return (
    <Formik
      className='my-4'
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolId: member && member.schoolWorking?.schoolId,
        fullName: member?.fullName ?? '',
        address: member?.address ?? '',
        phoneNumber: member?.phoneNumber ?? '',
        role: member?.role,
        province: selects.province,
        district: selects.district,
        ward: selects.ward,
      }}
    >
      {({
          handleChange,
          values,
          setFieldValue,
        }) => (
        <Form className='form py-8'>
          <h3>Cập nhật thông tin</h3>

          <Select
            label='Tên trường'
            name='schoolId'
            options={listSchool}
            value={initData.school && !_.isEmpty(initData.school) ? initData.school : ''}
            onChange={(e) => {
              setFieldValue('schoolId', e.value);
              setInitData({
                ...initData, ...{
                  school: e,
                  class: {},
                }
              });
            }}
          />
          <Input
            label='Họ tên'
            name='fullName'
            onChange={handleChange}
            value={values.fullName}
          />
          <Input
            label='Phone'
            name='phoneNumber'
            onChange={handleChange}
            value={values.phoneNumber}
          />
          <Input
            label='Địa chỉ'
            name='address'
            onChange={handleChange}
            value={values.address}
          />
          <div className='grid lg:grid-cols-2 gap-x-4'>
            <Field
              component={Region}
              listProvince={provinceOptions}
              provinceSelected={values.province}
              districtSelected={values.district}
              wardSelected={values.ward}
            />
            <Select
              label='Phân quyền'
              name='role'
              value={values.role === 'manager' ? {value: 'manager', label: 'Cán bộ quản lý'} : {
                value: 'staff',
                label: 'Nhân viên'
              }}
              options={[
                {value: 'staff', label: 'Nhân viên'},
                {value: 'manager', label: 'Cán bộ quản lý'},
              ]}
              onChange={(e) => {
                setFieldValue('role', e.value);
              }}
            />
          </div>
          <Button type='submit' className='mr-4'>Cập nhật</Button>
        </Form>
      )}
    </Formik>
  )
}
export default UpdateStaff;
