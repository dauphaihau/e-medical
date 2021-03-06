import {Formik, Form, Field} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import swal from "sweetalert";
import Router, {useRouter} from "next/router";

import Button from "@components/button";
import Input from "@components/form/input";
import {memberService, schoolYearService, schoolService, classroomService} from "@services";
import Select from "@components/form/select";
import Region from "@components/form/region";
import _ from "lodash";
import {locationService} from "../../../services";
import {useAuth} from "../../../context/auth";

const phoneRegExp = /^[+|0]?\d+$/;
const validationSchema = Yup.object().shape({
  schoolId: Yup.string().required('Trường không được để trống'),
  schoolYearId: Yup.string().required('Niên khoá không được để trống'),
  classGroupId: Yup.string().required('Khối không được để trống'),
  classId: Yup.string().required('Lớp không được để trống'),
  fullName: Yup.string()
    .min(5, 'Tên trường ít nhất là 5 ký tự')
    .max(50, 'Tên trường tối đa là 50 ký tự')
    .required('Tên người dùng không được để trống'),
  phoneNumber: Yup.string()
    .required('Vui lòng nhập số điện thoại')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  address: Yup.string().required('Địa chỉ không được để trống'),
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

const UpdateTeacher = () => {
  const router = useRouter();
  const [member, setMember] = useState();
  const {user} = useAuth();
  const [listSchool, setListSchool] = useState([]);
  const [listSchoolYear, setListSchoolYear] = useState();
  const [listGroup, setListGroup] = useState();
  const [listClass, setListClass] = useState([]);
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
    return () => {}
  }, [router.isReady]);

  const loadInit = async () => {
    const provinces = await locationService.listProvince();
    setProvinceOptions(provinces);

    const {id} = router.query;
    const {status, data: memberRes} = await memberService.detail(id);
    if(!status || !memberRes){
      router.push('/nhan-su/giao-vien/');
      return;
    }
    setMember(memberRes);

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

    const schools = await schoolService.list({limit: 100});
    if (schools.total) {
      const schoolSelect = schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      }));
      setListSchool(schoolSelect);
      const initSchool = _.find(schoolSelect, {value: memberRes.schoolWorking[0]?.schoolId});
      initDataSelected.school = initSchool;

      if (initSchool && !_.isEmpty(initSchool)) {
        const schoolYears = await schoolYearService.list({schoolId: initSchool.value});
        if (schoolYears && schoolYears.total) {
          const schoolYearSelect = schoolYears.data.map((data) => ({
            value: data._id,
            label: data.schoolYearName,
          }));
          setListSchoolYear(schoolYearSelect);

          const initYear = _.find(schoolYearSelect, {value: memberRes.schoolWorking[0]?.schoolYearId});
          initDataSelected.schoolYear = initYear;

          if (!_.isEmpty(initYear)) {
            const clsGroup = await classroomService.listGroup({
              schoolYearId: memberRes.schoolWorking?.schoolYearId,
              limit: 100
            });
            if (clsGroup && clsGroup.total) {
              const clsGroupOpt = clsGroup.data.map((data) => ({
                value: data._id,
                label: data.className,
              }));
              setListGroup(clsGroupOpt);
              const clsGroupSelected = _.find(clsGroupOpt, {value: memberRes.schoolWorking[0]?.classGroupId});
              if (clsGroupSelected) {
                initDataSelected.classGroup = clsGroupSelected;

                const listCls = await classroomService.list({parentId: clsGroupSelected.value})
                if (listCls && listCls.total) {
                  const listClsOpt = listCls.data.map((data) => ({
                    value: data._id,
                    label: data.className,
                  }));
                  setListClass(listClsOpt);
                  const clsSelected = _.find(listClsOpt, {value: memberRes.schoolWorking[0]?.classId});
                  initDataSelected.class = clsSelected;
                }
              }
            }
          }
        }
      }
    }
    setInitData(initDataSelected);
    // } else {
    //   Router.push('/nhan-su/giao-vien/');
    // }
  }

  const handleSubmitForm = async (data) => {
    const {id} = router.query;
    const result = await memberService.update(id, data);
    swal({
      title: result.message,
      icon: result.status?"success":"error"
    })
      .then(() => (result.status || result.statusCode === 403) && router.push('/nhan-su/giao-vien'))
  };

  const onChangeSchool = async (idSchool) => {
    const schoolYear = await schoolYearService.list({schoolId: idSchool})
    if (schoolYear.total) {
      setListSchoolYear(schoolYear.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      })));
    } else setListSchoolYear([]);
  };

  const onChangeSchoolYear = async (schoolYearId) => {
    const clsGrp = await classroomService.listGroup({schoolYearId, limit: 100, type: 'group'});
    if (clsGrp.total) {
      setListGroup(clsGrp.data.map((data) => ({
        value: data._id,
        label: data.className,
      })));
    }
  }

  const onChangeGroup = async (id) => {
    const classes = await classroomService.list({parentId: id, type: 'class'})
    if (classes.total) {
      setListClass(classes.data.map((data) => ({
        value: data._id,
        label: data.className,
      })));
    }
  };

  return (
    <Formik
      className='my-4'
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolId: member && member.schoolWorking[0]?.schoolId,
        schoolYearId: member && member.schoolWorking[0]?.schoolYearId,
        classGroupId: member && member.schoolWorking[0]?.classGroupId,
        classId: member && member.schoolWorking[0]?.classId,
        fullName: member?.fullName ?? '',
        address: member?.address ?? '',
        phoneNumber: member?.phoneNumber ?? '',
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
          <div className='grid lg:grid-cols-2 gap-x-4'>
            <Select
              label='Tên trường'
              name='schoolId'
              isDisable={user?.role !== 'admin'}
              options={listSchool}
              value={initData.school}
              onChange={(e) => {
                onChangeSchool(e.value);
                setFieldValue('schoolId', e.value);
                setInitData({
                  ...initData, ...{
                    school: e,
                    class: {},
                  }
                });
              }}
            />
            <Select
              label='Niên khoá'
              name='schoolYearId'
              onChange={e => {
                onChangeSchoolYear(e.value);
                setFieldValue('schoolYearId', e.value)
              }}
              options={listSchoolYear}
              value={initData.schoolYear && !_.isEmpty(initData.schoolYear) ? initData.schoolYear : ''}
              useFormik='true'
            />
            <Select
              label='Khối'
              name='classGroupId'
              useFormik='true'
              onChange={e => {
                onChangeGroup(e.value);
                setFieldValue('classGroupId', e.value)
              }}
              value={initData.classGroup && !_.isEmpty(initData.classGroup) ? initData.classGroup : ''}
              options={listGroup}
            />
            <Select
              label='Lớp chủ nhiệm'
              name='classId'
              options={listClass}
              value={initData.class && !_.isEmpty(initData.class) ? initData.class : ''}
              onChange={(e) => {
                setFieldValue('classId', e.value)
                setInitData({
                  ...initData, ...{
                    class: e,
                  }
                });
              }}
            />
          </div>
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
          </div>
          <Button type='submit' className='mr-4'>Cập nhật</Button>
        </Form>
      )}
    </Formik>
  )
}
export default UpdateTeacher;
