import {Navigate, Outlet, useLocation} from "react-router-dom";
import MainNavbar from "../components/MainNavbar.tsx";

export default function ProtectedRoutes() {
    const user = window.localStorage.getItem("User");
    const email = window.localStorage.getItem("Email");
    const location = useLocation();

    return (user && email)
        ?
        <>
            <MainNavbar/>
            <div className={`pt-10`}>
                <Outlet/>
            </div>
        </>
        :
        <Navigate to={"/"} state={{from: location}} replace/>;
}