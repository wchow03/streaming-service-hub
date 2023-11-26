// import {useEffect, useState} from "react";
import MainNavbar from "./MainNavbar.tsx";
import Subscribed from "./HomePage/Subscribed.tsx";
import NotSubscribed from "./HomePage/NotSubscribed.tsx";

export interface HomeUser {
    username: string,
    email: string
}

export default function HomePage() {

    return (
      <>
          <MainNavbar />
          <Subscribed />
          <NotSubscribed />
      </>
    );
}