import {Formik, Form} from "formik";
import {useRouter} from "next/router";
import * as Yup from "yup";
import swal from "sweetalert";

import Select from "@components/form/select";
import Input from "@components/form/input";
import Button from "@components/button";
import {schoolYearService} from "@services";
import {useAuth} from "../../../context/auth";

const validationSchema = Yup.object().shape({
  schoolYearName: Yup.string().required('Vui lòng nhập niên khóa.'),
});

const AddSchoolYear = () => {
  const {school} = useAuth();
  const router = useRouter();

  const handleSubmitForm = async (data) => {
    const result = await schoolYearService.create(data);
    if (result.message === 'account existed') {
      swal({
        text: "Mỗi trường chỉ tạo được 1 niên khoá",
        icon: "error"
      });
    } else {
      swal({
        text: "Tạo Niên Khoá thành công",
        icon: "success"
      }).then(() => router.push('/to-chuc/nien-khoa/'));
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
      initialValues={{
        schoolId: school?._id,
        schoolYearName: '',
      }}
    >
      {({handleChange}) => (
        <Form className='form lg:w-1/2'>
          <h3>Thêm niên khoá</h3>
          <div>
            <Select
              label='Tên trường'
              placeholder='Chọn trường'
              name='schoolId'
              isDisable={true}
              value={{value: school?._id, label: school?.schoolname}}
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
