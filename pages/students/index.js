import Table from "../../components/table";
import TitleContent from "../../components/title-content";

const columns = [
    {
      dataField: 'stt',
      text: 'STT',
    },
    {
      dataField: 'Data Check In',
      text: 'Họ và tên',
    },
    {
      dataField: 'Patient Name',
      text: 'Tên lớp'
    },
    {
      dataField: 'Patient Name',
      text: 'Xem chi tiết'
    },
  ];
  // //data demo
  const data = [
    {
      id: 1,
      fullName: 'A',
      className: 'nặng',
    },
    {
      id: 1,
      fullName: 'B',
      className: 'nặng',
    },
    {
      id: 1,
      fullName: 'C',
      className: 'nặng',
    },
    {
      id: 1,
      fullName: 'D',
      className: 'nặng',
    },
    {
      id: 1,
      fullName: 'E',
      className: 'nặng',
      status: 'nặng',
    },
  ];
const Student=()=>{
    return(
        <TitleContent title="Danh sách lớp học">
            {/* <Table
                columns={columns}
                data={data}
            /> */}
            <StaffForm/>
        </TitleContent>
    )
}
export default Student