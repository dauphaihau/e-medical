import { useEffect } from "react";
import Router from "next/router";
import Button from "../components/button";
import {MainProvider} from "../context/main-context";
import Staff from "./school";
import AddStudents from "../pages/students/addStudents"
import Student from "./students";
import School from "./to-chuc";

export default function App() {

  return (
    <MainProvider>
      {/*<AddStudents/>*/}
      {/*<Student/>*/}
      <School/>
    </MainProvider>
  );
}
