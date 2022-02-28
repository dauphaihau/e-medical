import Card from "../../components/card";
import Layout from "../../components/layout";
import Select from "../../components/form/select";

const cards = [
  {title: 'Tổng số lớp học', valueNumber: 48},
  {title: 'Tổng số lớp học', valueNumber: 48},
  {title: 'Tổng số lớp học', valueNumber: 48},
];

const twoCards = [
  {title: 'Tổng số lớp học', valueNumber: 48},
  {title: 'Tổng số lớp học', valueNumber: 48},
];

const options = [
  {value: '2009-2010', label: '2009-2010'},
  {value: '2019-2012', label: '2009-2010'},
  {value: '2009-2012', label: '2009-2010'},
]

const Summary = () => {
  return (
    <div>
      <div className='lg:flex justify-between'>
        <h2 className='font-black'>TỔNG QUAN</h2>
        <div className='lg:flex'>
          <p className='leading-[3.5rem] mr-4 text-xl'>Niên khoá</p>
          <Select
            width='w-[250px]'
            name='nienKhoa'
            options={options}
            defaultValue='Chọn niên khoá'
          />
        </div>
      </div>
      <div className='box'>
        <h3>Thống kê niên khoá hiện tại</h3>
        <div className='box-grid'>
          <Card cards={cards}/>
        </div>
      </div>
      <div className='box'>
        <h3>Thống kê chiến dịch Phòng, Chống dịch Covid-19</h3>
        <div className='box-grid'>
          <Card cards={cards}/>
        </div>
      </div>
      <div className='box'>
        <h3>Thống kê khám sức khoẻ định kỳ</h3>
        <div className='box-grid'>
          <Card cards={cards}/>
        </div>
        <div className='box-grid lg:grid-cols-2'>
          <Card cards={twoCards}/>
        </div>
      </div>
      <div className='box py-4'>
        <h3>Thông tin mới cập nhật</h3>
        <div className="px-4">
          <p>Thứ 2, 18/10/2021</p>
          <div className="flex mb-4">
            <p>10:21</p>
            <p>Học sinh Nguyễn A, lớp 12A2, khối 12 đã khai báo F0</p>
          </div>
          <p>Thứ 2, 18/10/2021</p>
          <div className="flex">
            <p>10:21</p>
            <p>Học sinh Nguyễn A, lớp 12A2, khối 12 đã khai báo F0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;

Summary.getLayout = (page) => <Layout>{page}</Layout>;
