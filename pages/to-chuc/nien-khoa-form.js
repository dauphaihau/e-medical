import Select from "../../components/form/select";
import Input from "../../components/form/input";

const NienKhoaForm = () => {

  return (
    <form className='form'>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Input label='Niên khoá*'/>
        <Select label='Kế thừa dữ liệu nếu có' options={['one', 'two', 'three']}/>
      </div>
      <h3 className='mt-8'>Thời gian</h3>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Input label='Thời gian bắt đầu'/>
        <Input label='Thời gian kết thúc'/>
      </div>
      <button className="btn ml-[7px]" style={{transform: `translate(-30px, 90px)`}}>
        Lưu
      </button>
      <button className="btn ml-[7px]" style={{transform: `translate(-30px, 90px)`}}>
        Huỷ
      </button>
    </form>
  );
}

export default NienKhoaForm;