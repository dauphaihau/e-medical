import { useEffect } from "react";
import Router from "next/router";
import Button from "../components/button";
import {MainProvider} from "../context/main-context";
import School from "./school";

export default function App() {

  return (
    <MainProvider>
      <School/>
    </MainProvider>
  );
}
