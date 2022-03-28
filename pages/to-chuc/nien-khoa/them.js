import {Formik, Form} from "formik";
import {useRouter} from "next/router";
import * as Yup from "yup";
import swal from "sweetalert";

import Select from "@components/form/select";
import Input from "@components/form/input";
import Button from "@components/button";
import {schoolYearService} from "@services";
import {useAuth} from "../../../context/auth";
import {useEffect, useState} from "react";
import _ from "lodash";
import {schoolService} from "../../../services";

const validationSchema = Yup.object().shape({
  schoolYearName: Yup.string().required('Vui lòng nhập niên khóa.'),
});

const AddSchoolYear = () => {
  const {user} = useAuth();
  const router = useRouter();
  const [listSchool, setListSchool] = useState();
  const [initData, setInitData] = useState({
    school: {},
  });

  useEffect(() => {
    if(!router.isReady) return;
    loadInit();
  }, [router.isReady])

  const loadInit = async () => {
    let initDataSelected = {};
    const schools = await schoolService.list({limit: 100});
    if (schools.total) {
      const schoolSelect = schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      }))
      setListSchool(schoolSelect);
      if(user && user?.role !== 'admin'){
        const initSchool = _.find(schoolSelect, {value: user.schoolWorking[0]?.schoolId});
        initDataSelected.school = initSchool;
      }
    }
    setInitData(initDataSelected);
  }

  const handleSubmitForm = async (data) => {
    const result = await schoolYearService.create(data);
    swal({
      title: result.message,
      icon: result.status?"success":"error"
    })
      .then(() => (result.status || result.statusCode === 403) && router.push('/to-chuc/nien-khoa'))
  };

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolId: initData.school?.value,
        schoolYearName: '',
      }}
    >
      {({handleChange, setFieldValue}) => (
        <Form className='form lg:w-1/2'>
          <h3>Thêm niên khoá</h3>
          <div>
            <Select
              label='Tên trường'
              placeholder='Chọn trường'
              name='schoolId'
              options={listSchool}
              isDisable={user && user?.role !== 'admin'}
              value={initData.school}
              onChange={(e) => {
                setFieldValue('schoolId', e.value);
              }}
            />
            <Input
              name='schoolYearName'
              label='Niên khoá trường *'
              useFormik
              onChange={handleChange}
            />
          </div>
          <div className='my-4'>
            <Button className='mr-4' type='submit'>Thêm</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddSchoolYear;
