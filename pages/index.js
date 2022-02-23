import { useEffect } from "react";
import Router from "next/router";
import Button from "../components/button";
import {MainProvider} from "../context/main-context";
import Staff from "./staff";
import AddStudents from "./students/addStudents";

export default function App() {
  return (
    <MainProvider>
      <AddStudents/>
    </MainProvider>
  );
}
