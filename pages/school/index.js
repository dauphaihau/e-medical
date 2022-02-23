import React, {useState} from 'react'
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Input from "../../components/form/input";
import Select from "../../components/form/select";
import Form from "./school-form";
import SchoolList from "./school-list";
import SchoolForm from "./school-form";

const School = () => {

  return (
    <>
      <Header/>
      <Sidebar/>
      {/*<SchoolForm/>*/}
      <SchoolList/>
    </>
  )
}

export default School;
