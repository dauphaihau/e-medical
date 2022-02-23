import { useEffect } from "react";
import Router from "next/router";
import Button from "../components/button";
import {MainProvider} from "../context/main-context";
import Staff from "./school";

export default function App() {

  return (
    <MainProvider>
      <Staff/>
    </MainProvider>
  );
}
