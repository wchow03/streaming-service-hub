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
                className={`flex h-20 bg-slate-900 md:hidden justify-end items-center px-3 `}>
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
                className={`sticky bg-slate-900 py-3 text-md ${visible ? "max-md:fixed max-md:top-0 max-md:h-screen max-md:z-10" : "hidden"} md:block`}>
                <div
                    className={"flex flex-col md:flex-row flex-wrap md:justify-between md:items-center h-full w-screen px-5 max-xl:pt-20 gap-5"}>
                    <Link
                        className={`${visible ? "max-md:top-6  max-md:hidden" : "max-md:-top-14"} max-md:absolute max-md:visible text-white  hover:opacity-70 basis-1/12 `}
                        to={`/home`}>{homeUser && homeUser.username}</Link>

                    <div
                        className={`flex-grow flex flex-col md:flex-row flex-wrap gap-5`}>
                        <Link className={"text-white hover:opacity-70"} to={"/home"} onClick={hide}>Home</Link>
                        <Link className={"text-white hover:opacity-70"} to={"/media"} onClick={hide}>Media</Link>
                        <Link className={"text-white hover:opacity-70"} to={"/watchList"}
                              onClick={hide}>Watch&nbsp;Lists</Link>
                        <Link className={"text-white hover:opacity-70"} to={"/studio"}
                              onClick={hide}>Studios</Link>
                    </div>

                    <Link className={"text-white hover:opacity-70"} to={"/accountSettings"}
                          onClick={hide}>Account&nbsp;Settings</Link>

                    <Link
                        className={"text-white max-md:flex max-md:w-full max-md:text-center uppercase font-bold hover:bg-red-800 basis-1/12  bg-red-500 py-1 md:px-3 rounded-md transition-colors duration-150"}
                        to={"/"} onClick={hide}><p className={`max-md:w-full max-md:m-auto`}>Log&nbsp;out</p></Link>
                </div>
            </nav>
        </>
    );
}