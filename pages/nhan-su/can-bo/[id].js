import {Formik, Form, Field} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import swal from "sweetalert";
import {useRouter} from "next/router";
import _ from "lodash";

import Button from "@components/button";
import Input from "@components/form/input";
import {memberService, schoolService} from "@services";
import Select from "@components/form/select";
import Region from "@components/form/region";
import {locationService} from "../../../services";
import {useAuth} from "../../../context/auth";

const phoneRegExp = /^[+|0]?\d+$/;
const validationSchema = Yup.object().shape({
  schoolId: Yup.string().required("Trường không được để trống"),
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

const defaultSelectValue = {
  value: '',
  label: '',
};

const defaultSelectValueLocation = {
  value: '',
  label: '',
  code: '',
};

const UpdateStaff = () => {
  const router = useRouter();
  const [member, setMember] = useState();
  const [listSchool, setListSchool] = useState([]);
  const {user} = useAuth();
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [initData, setInitData] = useState({
    school: defaultSelectValue,
    schoolYear: defaultSelectValue,
    classGroup: defaultSelectValue,
    class: defaultSelectValue,
    province: defaultSelectValueLocation,
    district: defaultSelectValueLocation,
    ward: defaultSelectValueLocation,
  });

  useEffect(() => {
    if (!router.isReady) return;

    loadInit();
    return () => setMember({})
  }, [router.isReady]);

  const loadInit = async () => {
    const {id} = router.query;
    
    const {status, data: memberRes} = await memberService.detail(id);
    if(!status || !memberRes){
      router.push('/nhan-su/can-bo');
      return
    }
    setMember(memberRes);
    const provinces = await locationService.listProvince();
    setProvinceOptions(provinces);
    let initDataSelected = {};
    if (memberRes && !_.isEmpty(memberRes) && memberRes.province !== undefined) {
      initDataSelected.province = _.find(provinces, (o) => o.code === memberRes.province.code);
      if (memberRes.district !== undefined) {
        const districts = await locationService.listDistrict(memberRes.province.code);
        initDataSelected.district = _.find(districts, (o) => o.code === memberRes.district.code);
        if (memberRes.ward !== undefined) {
          const wards = await locationService.listWard(memberRes.district.code);
          initDataSelected.ward = _.find(wards, (o) => o.code === memberRes.ward.code);
        }
      }
    }

    const schools = await schoolService.list({limit: 20});
    if (schools.total) {
      const schoolSelect = schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      }));
      setListSchool(schoolSelect);
      
      const initSchool = _.find(schoolSelect, {value: memberRes.schoolWorking[0]?.schoolId});
      initDataSelected.school = initSchool;
    }
    setInitData(initDataSelected);
    
    // } else {
    //   Router.push('/nhan-su/nhan-vien/');
    // }
  }

  const handleSubmitForm = async (data) => {
    const {id} = router.query;
    const result = await memberService.update(id, data);
    swal({
      title: result.message,
      icon: result.status?"success":"error"
    })
      .then(() => (result.status || result.statusCode === 403) && router.push('/nhan-su/can-bo'))
  };

  return (
    <Formik
      className='my-4'
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolId: member && member.schoolWorking[0]?.schoolId,
        fullName: member?.fullName ?? '',
        address: member?.address ?? '',
        phoneNumber: member?.phoneNumber ?? '',
        role: member?.role,
        province: initData.province,
        district: initData.district,
        ward: initData.ward,
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
            isDisable={user?.role !== 'admin'}
            onChange={(e) => {
              setFieldValue('schoolId', e.value);
            }}
            value={initData.school}
            useFormik
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
