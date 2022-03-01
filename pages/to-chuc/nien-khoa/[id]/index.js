import {Formik, Form} from "formik";
import swal from "sweetalert";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import * as Yup from "yup";

import Button from "../../../../components/button";
import Input from "../../../../components/form/input";
import Layout from "../../../../components/layout";
import schoolYearService from "../../../../services/organize/school-year";
import Select from "../../../../components/form/select";

const validationSchema = Yup.object().shape({
  schoolYearName: Yup.string().required('Tên niên khoá trường không được để trống'),
});

const DetailSchoolYear = () => {

  const router = useRouter();
  const [schoolYear, setSchoolYear] = useState([]);

  const getSchoolYear = async (idSchoolYear) => {
    try {
      const {request, ...response} = await schoolYearService.getAllSchoolYear(idSchoolYear);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    await getSchoolYear(router.query.id)
  }, []);

  const handleSubmitForm = async (dataUpdateSchoolYear) => {
    console.log(dataUpdateSchoolYear);
    try {
      await schoolYearService.updateSchoolYear(router.query.id, dataUpdateSchoolYear);
      await swal('Cap nhat thanh cong')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolId: schoolYear.schoolId,
        schoolYearName: schoolYear.schoolYearName,
        keThuaDuLieu: schoolYear,
        thoiGianBatDau: schoolYear,
        thoiGianKetThuc: schoolYear,
        status: 1,
      }}
    >
      {({
          handleChange,
          setFieldValue
        }) => (
        <Form className='form'>
          <div className='grid-container gap-8'>
            <Input
              name='schoolYearName' label='Niên khoá *'
              onChange={handleChange}
            />
            <div>
              <Select
                label='Kế thừa dữ liệu ( nếu có )'
                name='keThuaDuLieu'
                onChange={e => setFieldValue('keThuaDuLieu', e.value)}
                options={options}
                placeholder='Chọn niên khoá kế thừa'
              />
              <p>Dữ liệu được kế thừa bao gồm các thông: </p>
              <p>- Thông tin và hồ sơ sức khoẻ học sinh </p>
              <p>- Danh sách học sinh </p>
            </div>
          </div>
          <h3 className='mt-8'>Thời gian</h3>
          <div className='grid-container gap-8'>
            <Input
              name='thoiGianBatDau' label='Thời gian bắt đầu'
              onChange={handleChange}
            />
            <Input
              name='thoiGianKetThuc' label='Thời gian kết thúc'
              onChange={handleChange}
            />
          </div>
          <div className='ml-2' style={{transform: `translate(-30px, 90px)`}}>
            <Button className='mr-4'>Lưu</Button>
            <Button>Huỷ</Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
export default DetailSchoolYear

DetailSchoolYear.getLayout = (page) => <Layout>{page}</Layout>;

