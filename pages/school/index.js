import React, {useState} from 'react'
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Input from "../../components/form/input";
import Select from "../../components/form/select";
import Form from "./school-form";
import SchoolTable from "./school-list/school-table";
import SchoolList from "./school-list/school-list";
import CbqlList from "./cbql-list";
import StaffDetail from "./staff-detail";
import StaffForm from "./school-form";
import SchoolForm from "./school-form";

const School = () => {

  return (
    <>
      <Header/>
      <Sidebar/>
      {/*<SchoolForm/>*/}
      {/*<StaffDetail/>*/}
      {/*<CbqlList pagination/>*/}
      <SchoolList/>
    </>
  )
}

export default School;
