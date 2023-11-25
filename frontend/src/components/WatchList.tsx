// import {useEffect, useState} from "react";
// import {HomeUser} from "./HomePage.tsx";
import MainNavbar from "./MainNavbar.tsx";

export default function WatchList() {
    // const [homeUser, setHomeUser] = useState<HomeUser>();
    //
    // useEffect(() => {
    //     const user = window.localStorage.getItem("User")!;
    //     const email = window.localStorage.getItem("Email")!;
    //     setHomeUser({"username": JSON.parse(user), "email": JSON.parse(email)});
    // }, []);

    return (
        <>
            <MainNavbar />
            <h1 className={"h1 text-white text-center"}>Watch Later Page</h1>
        </>
    );
}