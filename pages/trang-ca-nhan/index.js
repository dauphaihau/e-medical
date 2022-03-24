import {Formik, Form, Field} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import _ from "lodash";
import swal from "sweetalert";
import Router, {useRouter} from "next/router";

import Button from "@components/button";
import Input from "@components/form/input";
import {memberService, schoolYearService, schoolService, classroomService} from "@services";
import Select from "@components/form/select";
import Region from "@components/form/region";
import {useAuth} from "../../context/auth";
import {locationService} from "../../services";

const phoneRegExp = /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/
const validationSchema = Yup.object().shape({
  schoolId: Yup.string().required(),
  classId: Yup.string().required(),
  fullName: Yup.string()
    .min(5, 'Tên trường ít nhất là 5 ký tự')
    .max(50, 'Tên trường tối đa là 50 ký tự')
    .required('Tên người dùng không được để trống'),
  phoneNumber: Yup.string()
    .required('Vui logn2 nhập số điện thoại')
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  // address: Yup.string().required('Địa chỉ không được để trống'),
  province: Yup.object().shape({}),
  district: Yup.object().shape({}),
  ward: Yup.object().shape({}),
});
const defaultSelectValue = {
  value: "",
  label: "",
  code: "",
};

const Profile = () => {
  const router = useRouter();
  const [member, setMember] = useState();
  const [listSchool, setListSchool] = useState([]);
  const [listSchoolYear, setListSchoolYear] = useState();
  const [listGroup, setListGroup] = useState();
  const [listClass, setListClass] = useState([]);
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
  const {user} = useAuth();

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

  useEffect(() => {
  }, [listSchool])

  const loadInit = async () => {

    const provinces = await locationService.listProvince();
    setProvinceOptions(provinces);

    if (user && !_.isEmpty(user)) {
      setMember(user);
      const provinceOption = _.find(provinces, (o) => o.code === user.province.code);
      const districts = await locationService.listDistrict(user.province.code);
      const districtOption = _.find(districts, (o) => o.code === user.district.code);
      const wards = await locationService.listWard(user.district.code);
      const wardOption = _.find(wards, (o) => o.code === user.ward.code);
      setSelect({...selects, ...{ward: wardOption, district: districtOption, province: provinceOption}})

      // const memberRes = await memberService.detail(id);
      // console.log('member-res', memberRes)
      // else{
      //   swal("Thành viên này không tồn tại!", "", "error")
      //     .then(() => Router.push('/nhan-su/giao-vien/'));
      // }

      let initDataSelected = {};
      const schools = await schoolService.list({limit: 20});
      if (schools.total) {
        const schoolSelect = schools.data.map((data) => ({
          value: data._id,
          label: data.schoolname,
        }));
        setListSchool(schoolSelect);
        const initSchool = _.find(schoolSelect, {value: user.schoolWorking?.schoolId});
        initDataSelected.school = initSchool;

        if (initSchool && !_.isEmpty(initSchool)) {
          const schoolYears = await schoolYearService.list({schoolId: initSchool.value});
          if (schoolYears && schoolYears.total) {
            const schoolYearSelect = schoolYears.data.map((data) => ({
              value: data._id,
              label: data.schoolYearName,
            }));
            setListSchoolYear(schoolYearSelect);
            const initYear = _.find(schoolYearSelect, {value: user.schoolWorking?.schoolYearId});
            initDataSelected.schoolYear = initYear;

            if (!_.isEmpty(initYear)) {
              const clsGroup = await classroomService.listGroup({
                schoolYearId: user.schoolWorking?.schoolYearId,
                limit: 100
              });
              if (clsGroup && clsGroup.total) {
                const clsGroupOpt = clsGroup.data.map((data) => ({
                  value: data._id,
                  label: data.className,
                }));
                setListGroup(clsGroupOpt);
                const clsGroupSelected = _.find(clsGroupOpt, {value: user.schoolWorking?.classGroupId});
                if (clsGroupSelected) {
                  initDataSelected.classGroup = clsGroupSelected;

                  const listCls = await classroomService.list({parentId: clsGroupSelected.value})
                  if (listCls && listCls.total) {
                    const listClsOpt = listCls.data.map((data) => ({
                      value: data._id,
                      label: data.className,
                    }));
                    setListClass(listClsOpt);
                    const clsSelected = _.find(listClsOpt, {value: user.schoolWorking?.classId});
                    initDataSelected.class = clsSelected;
                  }
                }
              }
            }
          }
        }
      }
      setInitData(initDataSelected);
    } else {
      Router.push('/');
    }
  }

  const handleSubmitForm = async (data) => {
    try {
      await memberService.update(user._id, data);
      swal('Cập nhật thành công', '', 'success')
      // .then(() => Router.push('/nhan-su/giao-vien/'));
    } catch (error) {
      swal('Cập nhật không thành công.', 'Vui lòng thử lại.', 'error');
    }
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
        schoolId: member && member.schoolWorking?.schoolId,
        schoolYearId: member && member.schoolWorking?.schoolYearId,
        classGroupId: member && member.schoolWorking?.classGroupId,
        classId: member && member.schoolWorking?.classId,
        fullName: member?.fullName ?? '',
        address: member?.address ?? '',
        phoneNumber: member?.phoneNumber ?? '',
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
          <h3>Thông tin cá nhân</h3>
          {user.role !== 'admin' &&
            <div className='grid lg:grid-cols-2 gap-x-4'>
              <Select
                label='Tên trường'
                name='schoolId'
                options={listSchool}
                value={initData.school && !_.isEmpty(initData.school) ? initData.school : ''}
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
          }
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
export default Profile;