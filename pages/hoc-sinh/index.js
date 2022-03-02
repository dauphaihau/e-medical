import Input from "../../components/form/input";
import Select from "../../components/form/select";
import Table from "../../components/table";
import Layout from "../../components/layout";

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
    <>
      <h4>Hồ sơ học sinh</h4>
      <div className="grid-container">
        <Input name="name" placeholder="Tìm kiếm"/>
        <Select options={['one', 'two', 'three']}/>
        <Select options={['one', 'two', 'three']}/>
        <Select options={['one', 'two', 'three']}/>
      </div>
      <div className="mt-8 drop-shadow-2xl overflow-x-auto lg:overflow-x-visible">
        <Table
          theadData={theadData} tbodyData={tbodyData}
          titleTable="Danh sách hồ sơ học sinh"
        />
      </div>
    </>
  )
}
export default Student

Student.getLayout = (page) => <Layout>{page}</Layout>;
