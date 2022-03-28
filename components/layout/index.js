import Head from "next/head";
import _ from "lodash";

import Header from "../header";
import Sidebar from "../sidebar";
import Content from "./content";

import {useAuth} from "../../context/auth";
import {useUtil} from "../../context/util";

const Layout = ({children}) => {
  const {stateSideBar} = useUtil()
  const {user} = useAuth();

  const renderLayout = (children) => {
    if (user === -1) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
        </div>
      );
    } else if (user && !_.isEmpty(user)) {
      return (
        <>
          <Sidebar stateSidebar={stateSideBar}/>
          <Header/>
          <Content>
            {children}
          </Content>
        </>
      );
    } else {
      return (<>{children}</>);
    }
  }

  return (
    <>
      <Head>
        <title>Y Tế Học Đường - eDoctor</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      {renderLayout(children)}
    </>
  );
}

export default Layout;
