import React, {useState} from 'react'
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Input from "../../components/form/input";
import Select from "../../components/form/select";
import Form from "./staff-form";
import StaffTable from "./staff-list/staff-table";
import StaffList from "./staff-list/staff-list";
import CbqlList from "./cbql-list";
import StaffDetail from "./staff-detail";
import StaffForm from "./staff-form";
import Table from "@components/table"
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
const Staff = () => {
  return (
    <>
      <Header/>
      <Sidebar/>
      <StaffForm/>
      <Table
        data={data}
        columns={columns}
      />
      {/*<StaffForm/>*/}
      {/*<StaffDetail/>*/}
      {/*<CbqlList pagination/>*/}
      {/*<StaffList/>*/}
    </>
  )
}

export default Staff;
