import Select from "../../components/form/select";
import Input from "../../components/form/input";
import {useMainContext} from "../../context/main-context";
import TitleContent from "../../components/title-content";
import Radio from "../../components/form/radio";

const StaffForm = () => {
  const {isSidebarOpen} = useMainContext();

  return (
    <TitleContent title='Danh sách Nhân Viên'>
      <form className='form'>
        <h3>Thông tin chung</h3>
        <Input label='Họ và tên'/>
        <Input label='Ngày tháng năm sinh'/>
        <div className={`${isSidebarOpen && 'lg:mr-[63.5rem]'} form-radio-input`}>
          <p>Giới tính</p>
          <div>
            <Radio value='1'>Nam</Radio>
            <Radio value='2'>Nu</Radio>
          </div>
        </div>
        <Input label='Địa chỉ'/>
        <Select label='Tỉnh thành' options={['one', 'two', 'three']}/>
        <Select label='Quận' options={['one', 'two', 'three']}/>
        <Select label='Phường' options={['one', 'two', 'three']}/>
        <Select label='Khu phố' options={['one', 'two', 'three']}/>
        <Select label='' options={['one', 'two', 'three']}/>
        <Input label='Số điện thoại thường dùng'/>
        <Input label='Số Zalo/Facetime'/>
        <Select label={'Tỉnh thành'} options={['one', 'two', 'three']}/>
        <h3 className='mt-16'>Khu vực làm việc</h3>
        <Select label='Tỉnh thành' options={['one', 'two', 'three']}/>
        <Select label='Quận' options={['one', 'two', 'three']}/>
        <Select label='Phường' options={['one', 'two', 'three']}/>
        <Select label='Khu phố' options={['one', 'two', 'three']}/>
        <button className="btn ml-[7px]" style={{transform: `translate(-30px, 90px)`}}>
          Lưu thông tin
        </button>
      </form>
    </TitleContent>
  );
}

export default StaffForm;