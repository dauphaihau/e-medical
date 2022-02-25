import AddStudents from "./hoc-sinh/addStudents"
import Student from "./hoc-sinh";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import TitleContent from "../components/layout/title-content";
import TongQuan from "./tong-quan";
import Layout from "../components/layout";
import AddKhoi from "./to-chuc/khoi/them-khoi";
import AddLop from "./to-chuc/lop/them-lop";
import HocSinhList from "./to-chuc/lop/danh-sach-hoc-sinh";

export default function App() {

  return (
    <Layout>
      <TongQuan/>
      {/*<AddLop/>*/}
      {/*<HocSinhList/>*/}
    </Layout>
  );
}
