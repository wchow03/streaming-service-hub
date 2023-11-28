import {useEffect, useState} from "react";
import {HomeUser} from "./home-page/HomePage.tsx";
import {Link} from "react-router-dom";

export default function MainNavbar() {
    const [homeUser, setHomeUser] = useState<HomeUser>();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const user = window.localStorage.getItem("User")!;
        const email = window.localStorage.getItem("Email")!;
        setHomeUser({"username": JSON.parse(user), "email": JSON.parse(email)});
        console.log("Logged in as " + homeUser?.username);
    }, []);

    useEffect(() => {
        setVisible(false);
    }, []);

    function hide() {
        setVisible(false);
    }

    return (
        <>
            <nav
                className={`flex h-20 bg-slate-900 lg:hidden justify-end items-center px-3 `}>
                <button
                    className={`${visible && "fixed top-4 z-20"}`}
                    onClick={() => {
                        setVisible(!visible);
                    }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={50}
                        height={50}
                        fill="none"
                        viewBox="0 0 24 24"
                        className={``}
                    >
                        <path
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeWidth={2}
                            d="M4 18h16M4 12h16M4 6h16"
                        />
                    </svg>
                </button>
            </nav>

            <nav
                className={`sticky bg-slate-900 py-3 text-lg ${visible ? "max-lg:fixed max-lg:top-0 max-lg:h-screen max-lg:z-10" : "hidden"} lg:block`}>
                <div
                    className={"flex flex-col lg:flex-row flex-wrap lg:justify-between items-center h-full w-screen px-5 max-xl:pt-20 lg:content-center gap-5"}>
                    <Link
                        className={`${visible ? "top-6 hidden" : "-top-14"} max-lg:absolute max-lg:visible text-white justify-self-start hover:opacity-70 basis-1/12 `}
                        to={`/home`}>{homeUser && homeUser.username}</Link>

                    <div className={`place-self-start flex-grow flex flex-col  lg:flex-row flex-wrap gap-5`}>
                        <Link className={"text-white hover:opacity-70"} to={"/home"} onClick={hide}>Home</Link>
                        <Link className={"text-white hover:opacity-70"} to={"/media"} onClick={hide}>Media</Link>
                        <Link className={"text-white hover:opacity-70"} to={"/watchList"}
                              onClick={hide}>Watch&nbsp;Lists</Link>
                        <Link className={"text-white hover:opacity-70"} to={"/watchHistory"}
                              onClick={hide}>Watch&nbsp;History</Link>
                    </div>

                    <Link className={"text-white hover:opacity-70"} to={"/accountSettings"}
                          onClick={hide}>Account&nbsp;Settings</Link>

                    <Link
                        className={"text-white max-lg:flex max-lg:w-full max-lg:text-center uppercase font-bold hover:bg-red-800 basis-1/12  bg-red-500 py-1 lg:px-3 rounded-md transition-colors duration-150"}
                        to={"/"} onClick={hide}><p className={`max-lg:w-full max-lg:m-auto`}>Log&nbsp;out</p></Link>
                </div>
            </nav>
        </>
    );
}