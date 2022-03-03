import {Formik, Form} from "formik";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import * as Yup from "yup";

import Select from "../../../../components/form/select";
import Input from "../../../../components/form/input";
import Button from "../../../../components/button";
import Layout from "../../../../components/layout";
import schoolYearService from "../../../../services/organize/school-year";
import {schoolService} from "../../../../services";

const validationSchema = Yup.object().shape({
  schoolYearName: Yup.string().required('Tên niên khoá trường không được để trống'),
  schoolId: Yup.string().required('Mã trường không được để trống'),
});

const optionsKeThuaDuLieu = [
  {value: 'Không', label: 'Không'},
  {value: 'Có', label: 'Có'},
]

const AddSchoolYear = () => {

  const [listSchool, setListSchool] = useState();
  const router = useRouter();

  useEffect( () => {
    if (!router.isReady) return;
    let abortController = new AbortController();

    loadInit();
    return () => abortController.abort();
  }, [router.isReady, router.asPath]);

  const loadInit = async () => {
    const schools = await schoolService.list({limit:20});
    if(schools.total){
      setListSchool(schools.data.map((data) => ({
        value: data._id,
        label: data.schoolname,
      })));
    }
  }

  const handleSubmitForm = async (dataSchoolYear) => {
    console.log(dataSchoolYear);
    try {
      await schoolYearService.create(dataSchoolYear)
      swal('Tạo Niên Khoá thành công')
    } catch ({response}) {
      console.log(response);
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolYearName: '',
        schoolId: '',
        keThuaDuLieu: '',
        thoiGianBatDau: '',
        thoiGianKetThuc: '',
        status: 1,
      }}
    >
      {({
          handleChange,
          setFieldValue
        }) => (
        <Form className='form'>
          <h3>Thêm niên khoá</h3>
          <div className='flex flex-wrap gap-x-4 lg:grid-container'>
            <Input
              name='schoolYearName' label='Tên niên khoá trường *'
              useFormik='true'
              onChange={handleChange}
            />
            <Select
              label='Mã trường'
              name='schoolId'
              onChange={e => setFieldValue('schoolId', e.value)}
              options={listSchool}
              placeholder='Chọn trường'
            />
            <div>
              <Select
                label='Kế thừa dữ liệu ( nếu có )'
                name='keThuaDuLieu'
                onChange={e => setFieldValue('keThuaDuLieu', e.value)}
                options={optionsKeThuaDuLieu}
                placeholder='Chọn niên khoá kế thừa'
              />
              <p className='text-[0.8rem]'>Dữ liệu được kế thừa bao gồm các thông: </p>
              <p className='text-[0.8rem]'>- Thông tin và hồ sơ sức khoẻ học sinh </p>
              <p className='text-[0.8rem]'>- Danh sách học sinh </p>
            </div>
          </div>
          <h3 className='mt-8'>Thời gian</h3>
          <div className='grid-container'>
            <Input
              name='thoiGianBatDau' label='Thời gian bắt đầu'
              onChange={handleChange}
            />
            <Input
              name='thoiGianKetThuc' label='Thời gian kết thúc'
              onChange={handleChange}
            />
          </div>
          <div className='my-4'>
            <Button className='mr-4' type='submit'>Thêm</Button>
            <Button>Huỷ</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddSchoolYear;

AddSchoolYear.getLayout = (page) => <Layout>{page}</Layout>;