import {Formik, Form} from "formik";
import * as Yup from "yup";

import Input from "../../../../../components/form/input";
import Button from "../../../../../components/button";
import Radio from "../../../../../components/form/radio";
import Layout from "../../../../../components/layout";
import Table from "../../../../../components/table";
import Textarea from "../../../../../components/form/textarea";
import Select from "../../../../../components/form/select";
import {checkIcon} from "../../../../../utils/icons";

const loginSchema = Yup.object().shape({
  nienKhoa: Yup.string().required('Niên khoá không được để trống'),
  thoiGianBatDau: Yup.string().required('Thời gian bắt đầu không được để trống'),
  thoiGianKetThuc: Yup.string().required('Thời gian kết thúc không được để trống'),
});

const options = [
  {value: '2009-2010', label: '2009-2010'},
  {value: '2019-2012', label: '2009-2010'},
  {value: '2009-2012', label: '2009-2010'},
]

const theadData = [
  'STT',
  'Loại Vacxin',
  'Có',
  'Không',
  'Không nhớ',
];

const tbodyData = [
  {
    id: "1",
    items: ["1", "Bại Liệt", checkIcon, '', ''],
  },
  {
    id: "2",
    items: ["1", "Bại Liệt", '', checkIcon, checkIcon],
  },
  {
    id: "3",
    items: ["1", "Bại Liệt", checkIcon, '', ''],
  },
  {
    id: "4",
    items: ["1", "Bại Liệt", checkIcon, '', checkIcon],
  },
  {
    id: "5",
    items: ["1", "Bại Liệt", checkIcon, checkIcon, ''],
  },
  {
    id: "6",
    items: ["1", "Bại Liệt", checkIcon, checkIcon, ''],
  },
];

const theadDataLTDSK = [
  'Thời gian',
  'Loại theo dõi',
  'Ghi ',
  'Xem chi tiết',
];

const tbodyDataLTDSK = [
  {
    id: "1",
    items: [" 08 : 00\n12 / 04 / 2021\n", "Theo dõi thể lực, huyết áp,\nNhịp tim & Thị lực", 'Bình thường', 'xem chi tiết'],
  },
  {
    id: "1",
    items: [" 08 : 00\n12 / 04 / 2021\n", "Theo dõi thể lực, huyết áp,\nNhịp tim & Thị lực", 'Bình thường', 'xem chi tiết'],
  },
  {
    id: "1",
    items: [" 08 : 00\n12 / 04 / 2021\n", "Theo dõi thể lực, huyết áp,\nNhịp tim & Thị lực", 'Bình thường', 'xem chi tiết'],
  },
  {
    id: "1",
    items: [" 08 : 00\n12 / 04 / 2021\n", "Theo dõi thể lực, huyết áp,\nNhịp tim & Thị lực", 'Bình thường', 'xem chi tiết'],
  },
];

const handleSubmitForm = (values) => {
  console.log(values);
};

const AddStudent = () => {
  return (
    <>
      <Formik
        validationSchema={loginSchema}
        onSubmit={handleSubmitForm}
        enableReinitialize
        initialValues={{
          hoTen: '',
          ngaySinh: '',
          gioiTinh: '',
          diaChi: '',
        }}
      >
        {({
            handleChange,
            setFieldValue
          }) => (
          <Form className='form'>
            <div className='ml-2 my-8 flex justify-end'>
              <Button className='mr-4'>Thêm thông tin theo dõi sức khoẻ</Button>
              <Button>Hồ sơ khám sức khoẻ định kỳ</Button>
            </div>
            <h2>Thông tin cá nhân</h2>
            <div className='grid-container gap-8'>
              <Input
                name='hoTen' label='Họ Tên'
                onChange={handleChange}
              />
              <Input
                name='ngaySinh' label='Ngày Sinh'
                onChange={handleChange}
              />
              <Input
                name='gioiTinh' label='Giới Tính'
                onChange={handleChange}
              />
              <div className='form-radio-input'>
                <p>Giới tính</p>
                <div>
                  <Radio
                    name='hoTen'
                    onChange={handleChange}
                    value='Nam'
                  />
                  <Radio
                    name='hoTen'
                    onChange={handleChange}
                    value='Nữ'
                  />
                </div>
              </div>
            </div>
            <h2>Thông tin liên hệ</h2>
            <div className='grid-container gap-8'>
              <Input
                name='tenCha' label='Tên Cha'
                onChange={handleChange}
              />
              <Input
                name='tenMe' label='Tên Mẹ'
                onChange={handleChange}
              />
              <Input
                name='sdtCha' label='SDT Cha'
                onChange={handleChange}
              />
              <Input
                name='sdtMe' label='SDT Mẹ'
                onChange={handleChange}
              />
              <Input
                name='nguoiThanKhac' label='Người thân khác'
                onChange={handleChange}
              />
              <Input
                name='sdtNguoiThan' label='SDT người thân'
                onChange={handleChange}
              />
            </div>
            <h2>Thông tin sức khoẻ cơ bản</h2>
            <div className='grid-container lg:grid-cols-3 gap-8'>
              <Input
                name='chieuCao' label='Chiều cao (m)'
                onChange={handleChange}
              />
              <Input
                name='hoTen' label='Cân nặng (kg)'
                onChange={handleChange}
              />
              <div className='form-radio-input'>
                <p>Sản khoa</p>
                <div>
                  <Radio
                    name='hoTen'
                    onChange={handleChange}
                    value='Bình thường'
                  />
                  <Radio
                    name='hoTen'
                    onChange={handleChange}
                    value='Mẹ mắc bệnh khi mang thai'
                  />
                </div>
              </div>
            </div>
            <div>
              <p className='my-4'>Tiêm chủng</p>
              <Table theadData={theadData} tbodyData={tbodyData}/>
              <Textarea
                className='my-8'
                label='Các bệnh đang điều trị'
                name='cacBenhDieuTri'
                onChange={handleChange}
              />
            </div>
            <h2>Lịch sử theo dõi sức khoẻ</h2>
            <div className='grid-container gap-8'>
              <Select
                label='Niên khoá'
                name='thoiGian'
                onChange={e => setFieldValue('thoiGian', e.value)}
                options={options}
                placeholder='Thời gian'
              />
              <Select
                label='Niên khoá'
                name='loaiTheoDoi'
                onChange={e => setFieldValue('loaiTheoDoi', e.value)}
                options={options}
                placeholder='Loại theo dõi'
              />
            </div>
            <Table theadData={theadDataLTDSK} tbodyData={tbodyDataLTDSK}/>
            <div className="flex justify-end my-8">
              <Button className='mr-4'>Thêm thông tin theo dõi sức khoẻ</Button>
              <Button>Hồ sơ khám sức khoẻ định kỳ</Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddStudent;

AddStudent.getLayout = (page) => <Layout>{page}</Layout>;
