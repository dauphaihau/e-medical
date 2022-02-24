import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import NienKhoaList from "./nien-khoa-list";
import NienKhoaForm from "./nien-khoa-form";
import KhoiForm from "./khoi-form";
import KhoiList from "./khoi-list";
import LopList from "./lop-list";
import LopForm from "./lop-form";
import {useState} from "react";

const ToChuc = () => {
  const [stateSideBar, setStateSideBar] = useState(false)
  return (
    <>
      <Header stateSidebar={stateSideBar} setStateSidebar={setStateSideBar}/>
      <Sidebar stateSidebar={stateSideBar}/>
      {/*<NienKhoaList stateSidebar={stateSideBar}/>*/}
      {/*<KhoiList stateSidebar={stateSideBar}/>*/}
      <LopList stateSidebar={stateSideBar} />
      {/*<NienKhoaForm stateSidebar={stateSideBar}/>*/}
      {/*<KhoiForm stateSidebar={stateSideBar}/>*/}
      {/*<LopForm stateSidebar={stateSideBar}/>*/}
    </>
  )
}

export default ToChuc;
