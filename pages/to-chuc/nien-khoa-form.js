import Select from "../../components/form/select";
import Input from "../../components/form/input";
import TitleContent from "../../components/title-contet";
import Button from "../../components/button";

const NienKhoaForm = ({stateSidebar}) => {

  return (
    <TitleContent stateSidebar={stateSidebar}>
      <form className='form'>
        <div className='grid-container'>
          <Input label='Niên khoá*'/>
          <Select label='Kế thừa dữ liệu nếu có' options={['one', 'two', 'three']}/>
        </div>
        <h3 className='mt-8'>Thời gian</h3>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <Input label='Thời gian bắt đầu'/>
          <Input label='Thời gian kết thúc'/>
        </div>
        <div className='ml-2' style={{transform: `translate(-30px, 90px)`}}>
          <Button className='mr-4'>Lưu</Button>
          <Button>Huỷ</Button>
        </div>
      </form>
    </TitleContent>
  );
}

export default NienKhoaForm;