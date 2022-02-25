import Header from "../header";
import Sidebar from "../sidebar";
import {useState} from "react";
import TitleContent from "./title-content";

const Layout = ({children}) => {
  const [stateSideBar, setStateSideBar] = useState(false)
  return (
    <>
      <Header stateSidebar={stateSideBar} setStateSidebar={setStateSideBar}/>
      <Sidebar stateSidebar={stateSideBar}/>
      <TitleContent stateSidebar={stateSideBar}>
        {children}
      </TitleContent>
    </>
  );
}

export default Layout;