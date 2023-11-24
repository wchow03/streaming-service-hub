import {useEffect, useState} from "react";
import {HomeUser} from "./HomePage.tsx";

export default function WatchList() {
    const [homeUser, setHomeUser] = useState<HomeUser>();

    useEffect(() => {
        const user = window.localStorage.getItem("User")!;
        const email = window.localStorage.getItem("Email")!;
        setHomeUser({"username": JSON.parse(user), "email": JSON.parse(email)});
    }, []);

    return (
        <>
            <nav className={"navbar bg-neutral-800"}>
                <div className={"container-fluid"}>
                    <span className={"navbar-text navbar-brand text-white"}>Hello {homeUser && homeUser.username}</span>
                    <a className={"navbar-brand text-white"} href={"/home"}>Home</a>
                    <a className={"navbar-brand text-white"} href={"/watchList"}>Watch Later</a>
                    <a className={"navbar-brand text-white"} href={"/watchHistory"}>Watch History</a>
                    <a className={"navbar-brand text-white"} href={"/"}>Log out</a>
                </div>
            </nav>
            <h1 className={"h1 text-white text-center"}>Watch Later Page</h1>
        </>
    );
}