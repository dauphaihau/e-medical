import Input from "../../components/form/input";
import Radio from "../../components/form/radio";
import Select from "../../components/form/select";
import TitleContent from "../../components/title-content";
import { useMainContext } from "../../context/main-context";

const AddStudents = () => {
    const { isSidebarOpen } = useMainContext();
    return (
        <TitleContent title='Thêm mới học sinh'>
            <form className='form'>
                <h3>Thông tin cá nhân</h3>
                <Input label='Họ và tên' />
                <Input label='Ngày sinh' />
                <div className={`${isSidebarOpen && 'lg:mr-[63.5rem]'} form-radio-input`}>
                    <p>Giới tính</p>
                    <div>
                        <Radio value='1'>Nam</Radio>
                        <Radio value='2'>Nu</Radio>
                    </div>
                </div>
                <Input label='Địa chỉ' />
                <h3 className='mt-16'>Thông tin liên hệ</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Input label='Tên cha' />
                    <Input label='Tên mẹ' />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Input label='SDT cha' />
                    <Input label='SDT mẹ' />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Input label='Người thân' />
                    <Input label='SDT người thân' />
                </div>
                <h3 className='mt-16'>Thông tin sức khỏe cơ bản</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Input label='Chiều cao(m)' />
                    <Input label='Cân nặng(kg)' />
                </div>
                <div className={`${isSidebarOpen && 'lg:mr-[63.5rem]'} form-radio-input`}>
                    <div>
                        <Radio value='1'>Bình thường</Radio>
                        <Radio value='2'>Mẹ mắc bệnh khi mang thai</Radio>
                    </div>
                </div>
                <button className="btn ml-[7px]" style={{ transform: `translate(-30px, 90px)` }}>
                    Lưu thông tin
                </button>
            </form>
        </TitleContent>
    )
}
export default AddStudents;