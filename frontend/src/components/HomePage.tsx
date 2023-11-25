// import {useEffect, useState} from "react";
import MainNavbar from "./MainNavbar.tsx";
import StreamingServices from "./StreamingServices.tsx";

export interface HomeUser {
    username: string,
    email: string
}

export default function HomePage() {



    return (
      <>
          <MainNavbar />
          {/*<h1 className={"h1 text-white text-center"}>Home Page</h1>*/}
          <StreamingServices />
      </>
    );
}