import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
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
