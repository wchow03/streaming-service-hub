import {useEffect, useState} from "react";
import {HomeUser} from "./home-page/HomePage.tsx";
import {Link} from "react-router-dom";

export default function MainNavbar() {
    const [homeUser, setHomeUser] = useState<HomeUser>();

    useEffect(() => {
        const user = window.localStorage.getItem("User")!;
        const email = window.localStorage.getItem("Email")!;
        setHomeUser({"username": JSON.parse(user), "email": JSON.parse(email)});
        console.log("Logged in as " + homeUser?.username);
    }, []);

    return (
        <>
            <nav className={"sticky bg-slate-900 py-3 text-lg"}>
                <div className={"flex flex-row flex-wrap justify-between w-screen px-5 content-center gap-5"}>
                    <Link className={"text-white justify-self-start hover:opacity-70 basis-1/12"}
                          to={`/home`}>{homeUser && homeUser.username}</Link>

                    <div className={`place-self-start flex-grow flex flex-row flex-wrap gap-5`}>
                        <Link className={"text-white hover:opacity-70"} to={"/home"}>Home</Link>
                        <Link className={"text-white hover:opacity-70"} to={"/media"}>Media</Link>
                        <Link className={"text-white hover:opacity-70"} to={"/watchList"}>Watch&nbsp;Lists</Link>
                        <Link className={"text-white hover:opacity-70"} to={"/watchHistory"}>Watch&nbsp;History</Link>
                    </div>
                    <Link className={"text-white hover:opacity-70"} to={"/accountSettings"}>Account&nbsp;Settings</Link>
                    <Link className={"text-red-200 uppercase font-bold hover:text-red-600 basis-1/12"}
                          to={"/"}>Log&nbsp;out</Link>
                </div>
            </nav>
        </>
    );
}