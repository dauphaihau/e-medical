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

const Staff = () => {

  return (
    <>
      <Header/>
      <Sidebar/>
      {/*<StaffForm/>*/}
      {/*<StaffDetail/>*/}
      <CbqlList pagination/>
      {/*<StaffList/>*/}
    </>
  )
}

export default Staff;
