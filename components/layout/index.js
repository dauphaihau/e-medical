import {useState} from "react";
import Head from "next/head";
import _ from "lodash";

import Header from "../header";
import Sidebar from "../sidebar";
import Content from "./content";
import Modal from "../modal";

import {useAuth} from "../../context/auth";

const Layout = ({children}) => {
  const [stateSideBar, setStateSideBar] = useState(false)
  const { user, setUser } = useAuth();
  return (
    <>
      <Head>
        <title>Y Tế Học Đường - eDoctor</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {user && !_.isEmpty(user)? (
        <>
          <Sidebar stateSidebar={stateSideBar}/>
          <Header stateSidebar={stateSideBar} setStateSidebar={setStateSideBar}/>
          <Content stateSidebar={stateSideBar}>
            {children}
          </Content>
        </>
       )
       : (
         <>{children}</>
       )}
    </>
  );
}

export default Layout;