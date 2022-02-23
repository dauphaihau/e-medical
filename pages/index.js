import { useEffect } from "react";
import Router from "next/router";
import Button from "../components/button";
import {MainProvider} from "../context/main-context";
import Staff from "./staff";
import Card from '@components/card'

export default function App() {
  const cards = [
    {
    id:1,
    title: 'Tống số lớp học',
    content: 48,    
    },
    {
    id:2,
    title: 'Tổng số Giáo viên, Cán bộ, Nhân viên ',
    content: 100
    },
    {
    id:3,
    title: 'Tổng số Học sinh',
    content: 1178
    }
  ]

  return (
    <>
    <MainProvider>
      <Staff/>
      {/*<Doctor/>*/}
    </MainProvider>
    <div className="homepage">
      <main>
        <h1 className="text-primary-light">ACME Login</h1>
        <p>Build Something Brilliant</p>
        <Button type="button" className="mb-5 mx-5" variant="success" >primary</Button>
        <Button type="button" className="mb-5 mx-5" variant="info" >info</Button>
        <Button type="button" className="mb-5 mx-5" variant="warning" >warning</Button>
        <p>Build Something Brilliant</p>
        <div className="grid grid-cols-1 lg:grid-cols-4 px-5 md:px-2 lg:gap-8 ">
          <Card card={cards}></Card>         
        </div>
        <br />
      </main>
    </div>
    </>
  );
}
