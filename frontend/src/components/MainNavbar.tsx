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

                    <Link className={"text-white hover:opacity-70"}
                          title={"Account Settings"}
                          to={"/accountSettings"}
                          onClick={hide}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={35}
                            height={35}
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9.752 12.013c0-.954.657-1.776 1.57-1.962a1.94 1.94 0 0 1 2.181 1.196 2.03 2.03 0 0 1-.717 2.428 1.914 1.914 0 0 1-2.463-.248 2.026 2.026 0 0 1-.571-1.414Z"
                                clipRule="evenodd"
                            />
                            <path
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M10.308 5.468c-.014-.52.249-1.006.686-1.27a1.364 1.364 0 0 1 1.415 0c.437.264.7.75.686 1.27v.717a5.81 5.81 0 0 1 2.785 1.628l.555-.334a1.35 1.35 0 0 1 1.061-.144c.359.1.662.345.843.678a1.49 1.49 0 0 1-.51 1.987l-.517.31a6.187 6.187 0 0 1 0 3.4l.517.312c.67.41.897 1.296.51 1.99-.181.334-.485.577-.843.677-.358.1-.741.049-1.061-.144l-.555-.334a5.808 5.808 0 0 1-2.786 1.63v.717c.014.52-.249 1.006-.686 1.27a1.364 1.364 0 0 1-1.415 0c-.437-.264-.7-.75-.686-1.27v-.717a5.808 5.808 0 0 1-2.785-1.628l-.555.334a1.35 1.35 0 0 1-1.06.143 1.387 1.387 0 0 1-.843-.677 1.49 1.49 0 0 1 .51-1.987l.517-.311a6.187 6.187 0 0 1 0-3.4l-.517-.311a1.49 1.49 0 0 1-.51-1.991c.181-.333.485-.577.843-.677.358-.1.741-.048 1.061.145l.555.334a5.81 5.81 0 0 1 2.785-1.631v-.716Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>

                    <Link
                        className={"text-white max-md:flex max-md:w-full max-md:text-center uppercase font-bold hover:bg-red-800 basis-1/12  bg-red-500 py-1 md:px-3 rounded-md transition-colors duration-150"}
                        to={"/"} onClick={hide}><p
                        className={`max-md:w-full max-md:m-auto text-center`}>Log&nbsp;out</p></Link>
                </div>
            </nav>
        </>
    );
}