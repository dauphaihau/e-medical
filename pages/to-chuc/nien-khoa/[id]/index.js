import {Formik, Form} from "formik";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import swal from "sweetalert";
import * as Yup from "yup";

import Button from "../../../../components/button";
import Input from "../../../../components/form/input";
import Layout from "../../../../components/layout";
import Select from "../../../../components/form/select";
import schoolYearService from "../../../../services/organize/school-year";

const validationSchema = Yup.object().shape({
  schoolYearName: Yup.string().required('Tên niên khoá trường không được để trống'),
});

const options = [
  {value: true, label: 'Có'},
  {value: false, label: 'Không'},
]

const DetailSchoolYear = () => {

  const router = useRouter();
  const [schoolYear, setSchoolYear] = useState([]);

  const getDetailSchoolYear = async (id) => {
    try {
      const {...response} = await schoolYearService.detail(id);
      setSchoolYear(response)
    } catch (error) {
      console.log({error});
    }
  };

  useEffect(async () => {
    await getDetailSchoolYear(router.query.id)
  }, []);

  const handleSubmitForm = async (data) => {
    try {
      await schoolYearService.update(router.query.id, data);
      swal({
        text: "Cập nhật thành công",
        icon: "success",
      });
      router.back();
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
        status: '1',
      }}
    >
      {({
          handleChange,
          setFieldValue,
          values
        }) => (
        <Form className='form'>
          <h3>Thông tin niên khoá</h3>
          <div className='grid-container gap-8'>
            <Input
              name='schoolYearName' label='Niên khoá *'
              value={values.schoolYearName}
              useFormik='true'
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
          <div className='mt-4'>
            <Button className='mr-4' type='submit'>Cập nhật</Button>
            <Button type='text' onClick={() => router.back()}>Huỷ</Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
export default DetailSchoolYear

DetailSchoolYear.getLayout = (page) => <Layout>{page}</Layout>;

