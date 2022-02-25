import Card from "../../components/card";

const cards = [
  {title: 'Tổng số lớp học', valueNumber: 48},
  {title: 'Tổng số lớp học', valueNumber: 48},
  {title: 'Tổng số lớp học', valueNumber: 48},
];

const twoCards = [
  {title: 'Tổng số lớp học', valueNumber: 48},
  {title: 'Tổng số lớp học', valueNumber: 48},
];

const TongQuan = () => {
  return (
    <div className='md:px-8'>
      <h2 className='font-black'>TỔNG QUAN</h2>
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
        <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-4'>
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

export default TongQuan;