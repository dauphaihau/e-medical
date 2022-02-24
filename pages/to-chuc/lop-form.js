import Select from "../../components/form/select";
import Input from "../../components/form/input";
import Badge from "../../components/badge";
import Index from "../../components/button";
import TitleContent from "../../components/title-contet";

const LopForm = ({stateSidebar}) => {

  return (
    <TitleContent stateSidebar={stateSidebar}>
      <h2>Thêm mới lớp học</h2>
      <div className='mb-4 flex gap-4'>
        <Index variant='danger'>
          Tổng quan
        </Index>
        <Index variant='danger'>
          Danh sách học sinh
        </Index>
        <Index variant='danger'>
          Xuất báo cáo
        </Index>
      </div>
      <form className='form'>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-12'>
          <Input label='Tên lớp'/>
          <Select label='Niên khoá' options={['Chọn niên khoá', 'two', 'three']}/>
          <Select label='Khối' options={['one', 'two', 'three']}/>
          <Select label='Giáo viên chủ nhiệm' options={['one', 'two', 'three']}/>
        </div>
        <button className="btn ml-[7px]" style={{transform: `translate(-30px, 90px)`}}>
          Lưu
        </button>
        <button className="btn ml-[7px]" style={{transform: `translate(-30px, 90px)`}}>
          Huỷ
        </button>
      </form>
    </TitleContent>
  );
}

export default LopForm;
