import { useEffect } from "react";
import Router from "next/router";
import Button from "../components/button";
import Badge from "../components/badge";
import Table from "../components/table";

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
export default function App() {

  return (
    <div className="homepage">
      <main>
        {/* <h1 className="text-primary-light">ACME Login</h1>
        <p>Build Something Brilliant</p> */}

        <Button className="anhquoc" onClick={() => console.log('click ne')}>Anh Quốc</Button>
        <Badge variant={"danger"}>badge12</Badge>
        <Table 
          // pagination
          columns={columns}
          data={data}
        />
        <br />
      </main>
    </div>
  );
}
