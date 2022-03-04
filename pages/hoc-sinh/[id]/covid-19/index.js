import Link from "next/link";
import {useRouter} from "next/router";

import Layout from "@components/layout";
import Button from "@components/button";
import Table from "@components/table";

const titleTable1 = ['STT', 'Mũi tiêm', 'Loại Vacccine', 'Ngày tiêm', 'Đơn vị tiêm chủng']
const titleTable2 = ['STT', 'Ngày khai báo', 'Tình trạng sức khoẻ', 'Xem chi tiết']
const titleTable3 = ['STT', 'Ngày khỏi', 'Ngày khỏi', 'Xem chi tiết']

const tbodyData1 = [
  {
    id: "1",
    items: ["1", "1", "AstraZeneca", '01/01/2022', 'Cơ sở y tế Quận 3'],
  },
  {
    id: "2",
    items: ["1", "1", "AstraZeneca", '01/01/2022', 'Cơ sở y tế Quận 3'],
  },
];

const tbodyData2 = [
  {
    id: "1",
    items: ["1", "01/01/2022", "Bình thường", 'Xem chi tiết'],
  },
  {
    id: "2",
    items: ["1", "01/01/2022", "Bình thường", 'Xem chi tiết'],
  },
];

const tbodyData3 = [
  {
    id: "1",
    items: ["1", "01/01/2022", '01/01/2022', 'Xem chi tiết'],
  },
];


const CovidStudent = () => {

  const router = useRouter();

  return (
    <>
      <div className='flex flex-col lg:flex-row gap-y-4 lg:gap-x-4 mb-4 w-2/3'>
        <Link href={`/hoc-sinh/${router.query.id}` }>
          <a>
            <Button className='bg-primary-light text-black'>SỔ THEO DÕI SỨC KHỎE HỌC SINH</Button>
          </a>
        </Link>
        <Button>THEO DÕI PHÒNG CHỐNG DỊCH COVID-19</Button>
      </div>
      <div className='form'>
        <div className='flex justify-end gap-x-4 mb-8 lg:mb-0'>
          <Button>Khai báo thông tin tiêm chủng</Button>
          <Button>Khai báo y tế</Button>
          <Button>Khai báo F0</Button>
        </div>
        <h3>Thông tin liên hệ</h3>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-x-6'>
          <div>
            <p>Họ và tên</p>
            <p>Số điện thoại</p>
            <p>Giới tính</p>
            <p>Địa chỉ</p>
          </div>
          <div>
            {['Cong Hau', '0901111921', 'Nam', 'Q1'].map(item => <p>{item}</p>)}
          </div>
        </div>
        <div className="overflow-table my-8">
          <Table
            theadData={titleTable1}
            widthContainer='w-[1000px] lg:w-full'
            tbodyData={tbodyData1}
          />
        </div>
        <div className="overflow-table my-8">
          <Table
            theadData={titleTable2}
            widthContainer='w-[1000px] lg:w-full'
            tbodyData={tbodyData2}
          />
        </div>
        <div className="overflow-table my-8">
          <Table
            theadData={titleTable3}
            widthContainer='w-[1000px] lg:w-full'
            tbodyData={tbodyData3}
          />
        </div>
        <div className='flex justify-end gap-x-4 mt-8'>
          <Button>Huỷ</Button>
          <Button type='submit'>Cập nhật thông tin</Button>
        </div>
      </div>
    </>
  );
}
export default CovidStudent;

CovidStudent.getLayout = (page) => <Layout>{page}</Layout>;
