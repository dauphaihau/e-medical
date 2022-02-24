import {useEffect, useState} from "react";
import Router from "next/router";
import Button from "../components/button";
import {MainProvider} from "../context/main-context";
import AddStudents from "./hoc-sinh/addStudents"
import Student from "./hoc-sinh";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import ToChuc from "./to-chuc";
import TitleContent from "../components/title-content";

export default function App() {

  const [stateSideBar, setStateSideBar] = useState(false)
  return (
    <>
      <Header stateSidebar={stateSideBar} setStateSidebar={setStateSideBar}/>
      <Sidebar stateSidebar={stateSideBar}/>
      <TitleContent>
        <ToChuc/>
      </TitleContent>
    </>
  );
}
