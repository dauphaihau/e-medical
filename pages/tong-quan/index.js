import Card from "@components/card";
import Layout from "@components/layout";
import Select from "@components/form/select";

const cards = [
  {title: 'Tổng số lớp học', valueNumber: 48},
  {title: 'Tổng số Giáo viên, Cán bộ, Nhân viên ', valueNumber: 89},
  {title: 'Tổng số Học sinh', valueNumber: 1000},
];

const twoCards = [
  {title: 'Tổng số lớp học', valueNumber: 48},
  {title: 'Tổng số lớp học', valueNumber: 48},
];

const students = [
  {title: 'Thứ 2, 18/10/2021 - 10:21', content: 'Học sinh Nguyễn A, lớp 12A2, khối 12 đã khai báo F0'},
  {title: 'Thứ 2, 18/10/2021 - 10:21', content: 'Học sinh Nguyễn A, lớp 12A2, khối 12 đã khai báo F0'}
];

const Summary = () => {
  return (
    <div>
      <div className='lg:flex justify-between mb-6'>
        <p className='text-[1.8rem]'>Tổng quan</p>
        <div className='lg:flex'>
          <p className='hidden lg:block leading-[3.5rem] mr-4 text-base'>Niên khoá</p>
          <Select
            width='w-[250px]'
            name='nienKhoa'
            options={[]}
            placeholder='Chọn niên khoá'
          />
        </div>
      </div>
      <div className='box-container'>
        <div className='box'>
          <h3>Thống kê niên khoá hiện tại</h3>
          <div className='box-grid'>
            {cards.map((card, index) => (
              <Card key={index}>
                <p className='card-title'>{card.title}</p>
                <p className='card-body'>{card.valueNumber}</p>
              </Card>
            ))}
          </div>
        </div>
        <div className='box'>
          <h3>Thống kê chiến dịch Phòng, Chống dịch Covid-19</h3>
          <div className='box-grid'>
            {cards.map((card, index) => (
              <Card key={index}>
                <p className='card-title'>{card.title}</p>
                <p className='card-body'>{card.valueNumber}</p>
              </Card>
            ))}
          </div>
        </div>
        <div className='box'>
          <h3>Thống kê khám sức khoẻ định kỳ</h3>
          <div className='box-grid grid-cols-2'>
            {twoCards.map((card, index) => (
              <Card key={index}>
                <p className='card-title'>{card.title}</p>
                <p className='card-body'>{card.valueNumber}</p>
              </Card>
            ))}
          </div>
        </div>
        <div className='box'>
          <h3>Thông tin mới cập nhật</h3>
          <Card>
            {students.map((sd, index) => (
              <div key={index} className='mb-4'>
                <p>{sd.title}</p>
                <p>{sd.content}</p>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Summary;

Summary.getLayout = (page) => <Layout>{page}</Layout>;
