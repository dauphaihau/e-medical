import Select from "../../components/form/select";
import Input from "../../components/form/input";
import TitleContent from "../../components/title-contet";

const KhoiForm = ({stateSidebar}) => {

  return (
    <TitleContent title='Khối' stateSidebar={stateSidebar}>
      <form className='form'>
        <h3>Thiết lập khối</h3>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <Input label='Tên khối'/>
          <Select label='Niên khoá' options={['one', 'two', 'three']}/>
          <Input label='Khối trưởng'/>
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

export default KhoiForm;