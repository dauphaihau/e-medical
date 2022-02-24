import Input from "../../components/form/input";
import Select from "../../components/form/select";
import Table from "../../components/table";
import TitleContent from "../../components/title-content";

const theadData = ['STT', 'Họ và tên', 'Tên lớp', 'Xem chi tiết'];



const tbodyData = [

  {

    id: "1",

    items: ["1", "Effort", "2000-2001", "A1"],

  },

  {

    id: "2",

    items: ["2", "Effort", "2000-2001", "A1"],

  },

  {

    id: "3",

    items: ["2", "Effort", "2000-2001", "A1"],

  },

];
const Student = () => {
  return (
    <TitleContent title="Hồ sơ học sinh">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          name="name"
          placeholder="Tìm kiếm"
        />
        <Select options={['one', 'two', 'three']}/>
        <Select options={['one', 'two', 'three']}/>
        <Select options={['one', 'two', 'three']}/>
      </div>
      <Table theadData={theadData} tbodyData={tbodyData} title={"Danh sách hồ sơ học sinh"}/>
    </TitleContent>
  )
}
export default Student