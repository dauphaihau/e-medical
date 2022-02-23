import { useEffect } from "react";
import Router from "next/router";
import Button from "../components/button";

export default function App() {

  return (
    <div className="homepage">
      <main>
        <h1 className="text-primary-light">ACME Login</h1>
        <p>Build Something Brilliant</p>
        
        <Button className="anhquoc" onClick={() => console.log('click ne')}>Anh Quốc</Button>
        <br />
      </main>
    </div>
  );
}
