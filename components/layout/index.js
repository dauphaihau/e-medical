import Header from "../header";
import Sidebar from "../sidebar";
import {useState} from "react";
import Content from "./content";
import Modal from "../modal";

const Layout = ({children}) => {
  const [stateSideBar, setStateSideBar] = useState(false)
  return (
    <>
      {/*<Modal/>*/}
      <Header stateSidebar={stateSideBar} setStateSidebar={setStateSideBar}/>
      <Sidebar stateSidebar={stateSideBar}/>
      <Content stateSidebar={stateSideBar}>
        {children}
      </Content>
    </>
  );
}

export default Layout;