import StaffTable from "./staff-table";
import Input from "../../../components/form/input";
import Select from "../../../components/form/select";
import TitleContent from "../../../components/title-content";

const columns = [
  {
    dataField: 'stt',
    text: 'STT',
  },
  {
    dataField: 'Staff Name',
    text: 'Họ tên',
  },
  {
    dataField: 'Phone',
    text: 'Phone'
  },
  {
    dataField: 'Tỉnh công tác',
    text: 'Tỉnh công tác'
  },
  {
    dataField: 'Quận/huyện công tác',
    text: 'Quận/huyện công tác'
  },
  {
    dataField: 'Phường công tác',
    text: 'Phường công tác'
  },
  {
    dataField: 'action',
    text: 'Hành động'
  },
];
//data demo
const data = [
  {
    id: 1,
    fullName: 'Nguyễn Thị Lý',
    phone: '909880882',
    province: 'Long An',
    district: 'Huyện Mộc Hóa',
    ward: 'Xã Tân Lập'
  },
  {
    id: 1,
    fullName: 'Nguyễn Thị Lý',
    phone: '909880882',
    province: 'Long An',
    district: 'Huyện Mộc Hóa',
    ward: 'Xã Tân Lập'
  },
  {
    id: 1,
    fullName: 'Nguyễn Thị Lý',
    phone: '909880882',
    province: 'Long An',
    district: 'Huyện Mộc Hóa',
    ward: 'Xã Tân Lập'
  },
  {
    id: 1,
    fullName: 'Nguyễn Thị Lý',
    phone: '909880882',
    province: 'Long An',
    district: 'Huyện Mộc Hóa',
    ward: 'Xã Tân Lập'
  },
  {
    id: 1,
    fullName: 'Nguyễn Thị Lý',
    phone: '909880882',
    province: 'Long An',
    district: 'Huyện Mộc Hóa',
    ward: 'Xã Tân Lập'
  },
  {
    id: 1,
    fullName: 'Nguyễn Thị Lý',
    phone: '909880882',
    province: 'Long An',
    district: 'Huyện Mộc Hóa',
    ward: 'Xã Tân Lập'
  },
  {
    id: 1,
    fullName: 'Nguyễn Thị Lý',
    phone: '909880882',
    province: 'Long An',
    district: 'Huyện Mộc Hóa',
    ward: 'Xã Tân Lập'
  },
  {
    id: 1,
    fullName: 'Nguyễn Thị Lý',
    phone: '909880882',
    province: 'Long An',
    district: 'Huyện Mộc Hóa',
    ward: 'Xã Tân Lập'
  },
  {
    id: 1,
    fullName: 'Nguyễn Thị Lý',
    phone: '909880882',
    province: 'Long An',
    district: 'Huyện Mộc Hóa',
    ward: 'Xã Tân Lập'
  },
  {
    id: 1,
    fullName: 'Nguyễn Thị Lý',
    phone: '909880882',
    province: 'Long An',
    district: 'Huyện Mộc Hóa',
    ward: 'Xã Tân Lập'
  },
  {
    id: 1,
    fullName: 'Nguyễn Thị Lý',
    phone: '909880882',
    province: 'Long An',
    district: 'Huyện Mộc Hóa',
    ward: 'Xã Tân Lập'
  },
];


const Filter = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 lg:gap-6'>
      <Input label='Tìm kiếm' direction='flex-col' placeholder='Tên hoặc số điện thoại'/>
      <Select label='Tỉnh thành' direction='flex-col' options={['one', 'two', 'three']}/>
      <Select label='Quận' direction='flex-col' options={['one', 'two', 'three']}/>
      <Select label='Phường' direction='flex-col' options={['one', 'two', 'three']}/>
      <button className="btn w-[55%] lg:mt-[-40px]">
        Xem danh sách
      </button>
    </div>
  )
};

const StaffList = () => {
  return (
    <TitleContent title='Danh sách nhân viên'>
      <Filter/>
      <StaffTable
        pagination
        data={data}
        columns={columns}
      />
    </TitleContent>
  );
}

export default StaffList;