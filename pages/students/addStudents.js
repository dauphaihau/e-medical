import Input from "../../components/form/input";
import Radio from "../../components/form/radio";
import Select from "../../components/form/select";
import TitleContent from "../../components/title-content";
import { useMainContext } from "../../context/main-context";

const AddStudents = () => {
  const {isSidebarOpen} = useMainContext();
    return (
        <TitleContent title='Thêm mới học sinh'>
            <form className='form'>
                <h3>Thông tin cá nhân</h3>
                <Input label='Họ và tên'/>
                <Input label='Ngày sinh'/>
                <div className={`${isSidebarOpen && 'lg:mr-[63.5rem]'} form-radio-input`}>
                    <p>Giới tính</p>
                    <div>
                        <Radio value='1'>Nam</Radio>
                        <Radio value='2'>Nu</Radio>
                    </div>
                </div>
                <Input label='Địa chỉ' />
                <h3 className='mt-16'>Thông tin liên hệ</h3>
                <div>
                    <Select label='Tỉnh thành' options={['one', 'two', 'three']} />
                    <Select label='Quận' options={['one', 'two', 'three']} />

                </div>
                <Select label='Phường' options={['one', 'two', 'three']} />
                <Select label='Khu phố' options={['one', 'two', 'three']} />
                <button className="btn ml-[7px]" style={{ transform: `translate(-30px, 90px)` }}>
                    Lưu thông tin
                </button>

                <h3 className='mt-16'>Thông tin sức khỏe cơ bản</h3>
                <Select label='Tỉnh thành' options={['one', 'two', 'three']} />
                <Select label='Quận' options={['one', 'two', 'three']} />
                <Select label='Phường' options={['one', 'two', 'three']} />
                <Select label='Khu phố' options={['one', 'two', 'three']} />
                <button className="btn ml-[7px]" style={{ transform: `translate(-30px, 90px)` }}>
                    Lưu thông tin
                </button>

                <h3 className='mt-16'>Lịch sử theo dõi sức khỏe</h3>
                <Select label='Tỉnh thành' options={['one', 'two', 'three']} />
                <Select label='Quận' options={['one', 'two', 'three']} />
                <Select label='Phường' options={['one', 'two', 'three']} />
                <Select label='Khu phố' options={['one', 'two', 'three']} />
                <button className="btn ml-[7px]" style={{ transform: `translate(-30px, 90px)` }}>
                    Lưu thông tin
                </button>
            </form>
        </TitleContent>
    )
}
export default AddStudents;