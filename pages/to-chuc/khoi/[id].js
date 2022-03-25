import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import * as Yup from "yup";
import swal from "sweetalert";
import {Formik, Form} from "formik";
import _ from "lodash";

import Input from "@components/form/input";
import Button from "@components/button";
import Select from "@components/form/select";
import {classroomService, schoolService, schoolYearService} from "@services";
import {useAuth} from "../../../context/auth";

const validationSchema = Yup.object().shape({
  className: Yup.string()
    .required('Tên khối không được để trống')
    .max(50, 'Tên khối tối đa là 50 ký tự')
    .min(5, 'Tên khối phải ít nhất 5 ký tự'),
});

const DetailGroup = () => {
  const router = useRouter();
  const {user} = useAuth();
  const [classGroup, setClassGroup] = useState();
  const [listSchoolYear, setListSchoolYear] = useState([])
  const [listSchool, setListSchool] = useState();
  const [initData, setInitData] = useState({
    school: {
      value: "",
      label: "",
    },
    schoolYear: {
      value: "",
      label: "",
    },
    classGroup: {},
  })

  useEffect(() => {
    if (!router.isReady) return;
    loadInit();
  }, [router.isReady]);

  const loadInit = async () => {
    const {id} = router.query;
    const clsGroup = await classroomService.detailGroup(id);
    console.log('cls-group', clsGroup)
    if (clsGroup) {
      setClassGroup(clsGroup);
    } else {
      swal('Thông tin này không tồn tại!!', '', 'error')
        .then(() => router.push('/to-chuc/khoi/'));
    }

    const initDataState = {
      school: {
        value: "",
        label: "",
      },
      schoolYear: {
        value: "",
        label: "",
      }
    };

    const schools = await schoolService.list({limit: 100});
    if (schools.total) {
      const schoolOpts = schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      }));
      setListSchool(schoolOpts);
      const schoolSelected = _.find(schoolOpts, {value: clsGroup.schoolId });

      if (schoolSelected) {
        initDataState.school = schoolSelected;
        const schoolYears = await schoolYearService.list({schoolId: schoolSelected.value, limit: 100})
        if (schoolYears && schoolYears.total) {
          const schoolYearOpt = schoolYears.data.map((data) => ({
            value: data._id,
            label: data.schoolYearName,
          }));
          setListSchoolYear(schoolYearOpt);
          const schoolYearSelected = _.find(schoolYearOpt, {value: clsGroup.schoolYearId});
          if (schoolYearSelected) {
            initDataState.schoolYear = schoolYearSelected;
          }
        }
      }
    }
    setInitData(initDataState);
  }

  const onChangeSchool = async (e) => {
    const schoolYear = await schoolYearService.list({schoolId: e.value})
    if (schoolYear) {
      const schoolYearOptions = schoolYear.data.map((data) => ({
        value: data._id,
        label: data.schoolYearName,
      }));
      setListSchoolYear(schoolYearOptions)
      // const initSchoolYear = _.find(schoolYearOptions, {value: user.schoolWorking?.schoolYearId});
    }
  };

  const handleSubmitForm = async (data) => {
    const {id} = router.query;
    console.log('data', data)
    const result = await classroomService.updateGroup(id, data);
    if (result) {
      swal({
        text: "Cập nhật thành công",
        icon: "success"
      })
        .then(() => router.push('/to-chuc/khoi/'));
    } else {
      swal({
        text: "Cập nhật không thành công",
        icon: "error"
      });
    }
  };

  console.log('class-group', classGroup)
  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolId: classGroup?.schoolId,
        schoolYearId: classGroup?.schoolYearId,
        className: classGroup ? classGroup?.className : '',
        parentId: null,
        status: 1
      }}
    >
      {({handleChange, setFieldValue, values,}) => (
        <Form className='form lg:w-1/2'>
          <h3>Chỉnh Sửa Khối</h3>
          <div>
            <Select
              label='Tên trường'
              name='schoolId'
              isDisable={user?.role !== 'admin'}
              value={initData.school}
              options={listSchool}
              onChange={(e) => {
                onChangeSchool(e)
                setFieldValue('schoolId', e.value);
                setInitData({
                  ...initData, ...{
                    school: e,
                  }
                });
              }}
            />
            <Select
              label='Niên khoá'
              placeholder='Chọn niên khoá'
              isDisable={user.role !== 'admin'}
              name='schoolYearId'
              options={listSchoolYear}
              onChange={(e) => {
                setFieldValue('schoolYearId', e)
                setInitData({
                  ...initData, ...{
                    schoolYear: e,
                  }
                });
              }}
              value={initData.schoolYear}
            />
            <Input
              name='className'
              label='Tên khối'
              onChange={handleChange}
              useFormik
              value={values.className}
            />
          </div>
          <div className='py-4'>
            <Button type='submit' className='mr-4'>Cập nhật</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default DetailGroup;