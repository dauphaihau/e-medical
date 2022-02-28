import Button from "../../../../components/button";
import Input from "../../../../components/form/input";
import Table from "../../../../components/table";
import Layout from "../../../../components/layout";

const theadData = [
  'STT',
  'Tên học sinh',
  'Xem chi tiết'
];

const tbodyData = [
  {
    id: "1",
    items: ["1", "Sir Tran", 'xem chi tiết'],
  },
  {
    id: "1",
    items: ["1", "Sir Tran", 'xem chi tiết'],
  },
  {
    id: "1",
    items: ["1", "Sir Tran", 'xem chi tiết'],
  },
  {
    id: "1",
    items: ["1", "Sir Tran", 'xem chi tiết'],
  },
  {
    id: "1",
    items: ["1", "Sir Tran", 'xem chi tiết'],
  },
];


const StudentList = () => {
  return (
    <>
      <h2>Thêm mới lớp học</h2>
      <div className='mb-4 flex flex-col md:flex-row gap-4 lg:w-1/2'>
        <Button variant='danger'>
          Tổng quan
        </Button>
        <Button variant='danger'>
          Danh sách học sinh
        </Button>
        <Button variant='danger'>
          Xuất báo cáo
        </Button>
        <Button variant='danger'>
          Thêm mới
        </Button>
      </div>
      <Input className='md:w-2/3 lg:w-1/4' name='search' placeholder='Search anything...'/>
      <Table theadData={theadData} tbodyData={tbodyData}/>
    </>
  );
}

export default StudentList;

StudentList.getLayout = (page) => <Layout>{page}</Layout>;