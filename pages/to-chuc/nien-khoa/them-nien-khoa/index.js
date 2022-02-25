import Select from "../../../../components/form/select";
import Input from "../../../../components/form/input";
import Button from "../../../../components/button";
import Layout from "../../../../components/layout";

const options = [
  {value: '2009-2010', label: '2009-2010'},
  {value: '2019-2012', label: '2009-2010'},
  {value: '2009-2012', label: '2009-2010'},
]

const AddNienKhoa = () => {
  return (
    <form className='form'>
      <div className='grid-container'>
        <Input label='Niên khoá*'/>
        <Select
          label='Kế thừa dữ liệu nếu có'
          name=''
          options={options}
        />
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
  );
}

export default AddNienKhoa;

AddNienKhoa.getLayout = (page) => <Layout>{page}</Layout>;